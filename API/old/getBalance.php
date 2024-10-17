<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection setup
$host = 'localhost';
$db = 'dbcom'; 
$user = 'root'; 
$pass = ''; 
$charset = 'utf8mb4';

// Function to connect to the database
function connectDatabase($host, $db, $user, $pass, $charset) {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        return new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
        exit();
    }
}

$pdo = connectDatabase($host, $db, $user, $pass, $charset);

// Function to update balance
function updateBalance($pdo, $customerID, $transactionType, $amount) {
    $stmtBalance = $pdo->prepare("SELECT CurrentBalance FROM Balance WHERE CustomerID = ?");
    $stmtBalance->execute([$customerID]);
    $balance = $stmtBalance->fetch();

    if ($balance) {
        $currentBalance = $balance['CurrentBalance'];
    } else {
        $currentBalance = 0;
        $pdo->prepare("INSERT INTO Balance (CustomerID, CurrentBalance) VALUES (?, ?)")->execute([$customerID, $currentBalance]);
    }

    $newBalance = $transactionType == 'Credit' ? $currentBalance + $amount : $currentBalance - $amount;

    $stmtUpdate = $pdo->prepare("UPDATE Balance SET CurrentBalance = ? WHERE CustomerID = ?");
    $stmtUpdate->execute([$newBalance, $customerID]);

    return $newBalance;
}

// Function to add a customer
function addCustomer($pdo) {
    if (isset($_POST['CustomerName'], $_POST['Email'], $_POST['ContactDetails'])) {
        $stmt = $pdo->prepare("INSERT INTO Customers (CustomerName, Email, ContactDetails) VALUES (?, ?, ?)");
        $stmt->execute([$_POST['CustomerName'], $_POST['Email'], $_POST['ContactDetails']]);
        echo json_encode(['success' => 'Customer added successfully']);
    } else {
        echo json_encode(['error' => 'Missing parameters']);
    }
}

// Function to add a transaction
function addTransaction($pdo) {
    if (isset($_POST['CustomerID'], $_POST['TransactionType'], $_POST['Amount'], $_POST['Description'])) {
        $customerID = $_POST['CustomerID'];
        $transactionType = $_POST['TransactionType'];
        $amount = $_POST['Amount'];
        $description = $_POST['Description'];

        $stmt = $pdo->prepare("INSERT INTO AccountsReceivable (CustomerID, TransactionType, Amount, TransactionDate, Description) VALUES (?, ?, ?, NOW(), ?)");
        $stmt->execute([$customerID, $transactionType, $amount, $description]);

        $newBalance = updateBalance($pdo, $customerID, $transactionType, $amount);

        $stmtHistory = $pdo->prepare("INSERT INTO AccountsReceivableHistory (CustomerID, TransactionType, Amount, TransactionDate, Description) VALUES (?, ?, ?, NOW(), ?)");
        $stmtHistory->execute([$customerID, $transactionType, $amount, $description]);

        echo json_encode(['success' => 'Transaction added successfully', 'new_balance' => $newBalance]);
    } else {
        echo json_encode(['error' => 'Missing parameters']);
    }
}

// Function to view balance and transaction history
function viewBalance($pdo) {
    if (isset($_GET['CustomerID'])) {
        $customerID = $_GET['CustomerID'];

        $stmtBalance = $pdo->prepare("SELECT CurrentBalance FROM Balance WHERE CustomerID = ?");
        $stmtBalance->execute([$customerID]);
        $balance = $stmtBalance->fetch();

        $stmtHistory = $pdo->prepare("SELECT * FROM AccountsReceivableHistory WHERE CustomerID = ? ORDER BY TransactionDate DESC");
        $stmtHistory->execute([$customerID]);
        $history = $stmtHistory->fetchAll();

        $response = [
            'balance' => $balance['CurrentBalance'] ?? 0,
            'history' => $history
        ];

        echo json_encode($response);
    } else {
        echo json_encode(['error' => 'Missing CustomerID']);
    }
}

// Function to fetch transactions with customer details (INNER JOIN)
function getTransactionsWithCustomerDetails($pdo) {
    $stmt = $pdo->prepare("
        SELECT 
            ar.TransactionID, 
            ar.TransactionType, 
            ar.Amount, 
            ar.TransactionDate, 
            ar.Description, 
            c.CustomerName, 
            c.Email, 
            c.ContactDetails
        FROM 
            AccountsReceivable ar
        INNER JOIN 
            Customers c ON ar.CustomerID = c.CustomerID
        ORDER BY 
            ar.TransactionDate DESC
    ");
    $stmt->execute();
    $transactions = $stmt->fetchAll();
    echo json_encode($transactions);
}

// Main logic to handle different API actions
if (isset($_GET['action'])) {
    $action = $_GET['action'];

    if ($action == 'add_customer') {
        addCustomer($pdo);
    } elseif ($action == 'add_transaction') {
        addTransaction($pdo);
    } elseif ($action == 'view_balance') {
        viewBalance($pdo);
    } elseif ($action == 'get_transactions') {
        getTransactionsWithCustomerDetails($pdo);
    } else {
        echo json_encode(['error' => 'Invalid action']);
    }
} else {
    echo json_encode(['error' => 'No action specified']);
}
?>

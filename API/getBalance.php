<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = 'localhost';
$db = 'dbcom';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

function connectDatabase($host, $db, $user, $pass, $charset)
{
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

function updateBalance($pdo, $customerID, $transactionType, $amount)
{
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

function addCustomer($pdo)
{
    $input = json_decode(file_get_contents('php://input'), true);

    error_log(print_r($input, true));

    if (empty($input['CustomerName'])) {
        echo json_encode(['error' => 'CustomerName is required']);
        return;
    }

    $stmt = $pdo->prepare("INSERT INTO customers (CustomerName, Email, ContactDetails) VALUES (?, ?, ?)");

    $params = [
        $input['CustomerName'],
        $input['Email'] ?? null,
        $input['ContactDetails'] ?? null,
    ];

    $stmt->execute($params);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => 'Customer added successfully']);
    } else {
        echo json_encode(['error' => 'Failed to add customer or no data provided']);
    }
}

include_once 'getBalance.php';


function addTransaction($pdo)
{
    $input = json_decode(file_get_contents('php://input'), true);
    error_log("Raw input: " . print_r($input, true)); // Log the entire input

    // Validate required fields
    if (empty($input['CustomerName']) || empty($input['TransactionType']) || empty($input['Amount']) || empty($input['ProductID']) || empty($input['Quantity'])) {
        echo json_encode(['error' => 'Missing required fields: CustomerName, TransactionType, Amount, ProductID, and Quantity are required']);
        return;
    }

    // Get CustomerID from CustomerName
    $stmtCustomer = $pdo->prepare("SELECT CustomerID FROM customers WHERE CustomerName = ?");
    $stmtCustomer->execute([$input['CustomerName']]);
    $customerID = $stmtCustomer->fetchColumn();

    if (!$customerID) {
        echo json_encode(['error' => 'Customer not found']);
        return;
    }

    // Validate ProductID
    $productID = (int)trim($input['ProductID']);
    error_log("Received ProductID: " . $productID);

    // Check if product exists in the products table and get the price
    $stmtProduct = $pdo->prepare("SELECT ProductID, Price FROM products WHERE ProductID = ?");
    $stmtProduct->execute([$productID]);
    $productData = $stmtProduct->fetch(PDO::FETCH_ASSOC);

    if (!$productData) {
        error_log("Invalid ProductID: " . $productID);
        echo json_encode(['error' => 'Invalid ProductID']);
        return;
    }

    // Calculate TotalAmount based on Quantity and Product Price
    $quantity = (int)$input['Quantity'];
    $totalAmount = $quantity * $productData['Price'];
    
    // Calculate the due date (e.g., 30 days from now)
    $dueDate = date('Y-m-d', strtotime('+30 days'));

    // Insert into transactions table
    $stmtTransaction = $pdo->prepare("INSERT INTO transactions (CustomerID, ProductID, TransactionType, Amount, TransactionDate, Description) VALUES (?, ?, ?, ?, NOW(), ?)");
    $paramsTransaction = [
        $customerID,
        $productID,
        $input['TransactionType'],
        $input['Amount'],
        $input['Description'] ?? null,
    ];

    if (!$stmtTransaction->execute($paramsTransaction)) {
        error_log('Failed to execute transaction insert: ' . implode(", ", $stmtTransaction->errorInfo()));
        echo json_encode(['error' => 'Failed to add transaction']);
        return;
    }

    // Insert into invoices table
    $stmtInvoice = $pdo->prepare("INSERT INTO invoices (CustomerID, ProductID, Quantity, TotalAmount, InvoiceDate, PaymentStatus) VALUES (?, ?, ?, ?, NOW(), ?)");
    $paymentStatus = 'Unpaid'; // Default payment status
    if (!$stmtInvoice->execute([$customerID, $productID, $quantity, $totalAmount, $paymentStatus])) {
        error_log('Failed to execute invoice insert: ' . implode(", ", $stmtInvoice->errorInfo()));
        echo json_encode(['error' => 'Failed to create invoice']);
        return;
    }

    // Respond with success
    echo json_encode(['success' => 'Transaction and invoice added successfully']);
}



function getCustomers($pdo)
{
    $stmt = $pdo->query("SELECT CustomerID AS id, CustomerName AS name FROM customers");
    $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($customers);
}

function getProducts($pdo)
{
    $stmt = $pdo->query("SELECT ProductID AS ProductID, ProductName AS ProductName, Price FROM Products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($products);
}

function getInvoices($pdo)
{
    $stmt = $pdo->prepare("
        SELECT i.InvoiceID, c.CustomerName, p.ProductName, i.Quantity, 
               (i.Quantity * p.Price) AS TotalAmount, i.InvoiceDate, i.PaymentStatus
        FROM invoices i
        JOIN customers c ON i.CustomerID = c.CustomerID
        JOIN products p ON i.ProductID = p.ProductID
        ORDER BY i.InvoiceDate DESC
    ");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}



ini_set('display_errors', 1);
error_reporting(E_ALL);

function viewBalance($pdo)
{
    if (isset($_GET['CustomerName'])) {
        $customerName = $_GET['CustomerName'];

        // Fetch customer data
        $stmtCustomer = $pdo->prepare("SELECT * FROM customers WHERE CustomerName = ?");
        $stmtCustomer->execute([$customerName]);
        $customer = $stmtCustomer->fetch();

        if ($customer) {
            $customerID = $customer['CustomerID'];

            // Fetch current balance
            $stmtBalance = $pdo->prepare("SELECT CurrentBalance FROM Balance WHERE CustomerID = ?");
            $stmtBalance->execute([$customerID]);
            $balance = $stmtBalance->fetch();

            // Fetch transaction history with product names and prices
            $stmtHistory = $pdo->prepare("
                SELECT h.*, p.ProductName, p.Price 
                FROM accountsreceivablehistory h 
                LEFT JOIN products p ON h.ProductID = p.ProductID 
                WHERE h.CustomerID = ? 
                ORDER BY h.TransactionDate DESC
            ");
            $stmtHistory->execute([$customerID]);
            $history = $stmtHistory->fetchAll(PDO::FETCH_ASSOC);

            $response = [
                'balance' => $balance['CurrentBalance'] ?? 0,
                'history' => $history ?: [],
                'customer' => $customer ?? 0
            ];

            echo json_encode($response);
        } else {
            echo json_encode(['error' => 'Customer not found']);
        }
        return;
    } else {
        echo json_encode(['error' => 'Missing CustomerName']);
        return;
    }
}



function getTransactionsWithCustomerDetails($pdo)
{
    if (isset($_GET['CustomerID'])) {
        $customerID = $_GET['CustomerID'];

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
            WHERE 
                ar.CustomerID = ?
            ORDER BY 
                ar.TransactionDate DESC
        ");
        $stmt->execute([$customerID]);
        $transactions = $stmt->fetchAll();

        echo json_encode($transactions);
    } else {
        echo json_encode(['error' => 'Missing CustomerID']);
    }
}


function login($pdo)
{
    error_log(print_r($_POST, true)); // Log incoming POST data

    if (isset($_POST['email'], $_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? AND password = ?");
        $stmt->execute([$email, $password]);
        $user = $stmt->fetch();
        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'Missing parameters']);
    }
}



function getAgingReport($pdo)
{
    $stmt = $pdo->query("
        SELECT c.CustomerName, SUM(i.TotalAmount) AS TotalDue,
        DATEDIFF(CURDATE(), i.InvoiceDate) AS DaysOutstanding
        FROM Invoices i
        JOIN Customers c ON i.CustomerID = c.CustomerID
        WHERE i.PaymentStatus = 'Unpaid'
        GROUP BY c.CustomerName
    ");
    $agingReport = $stmt->fetchAll();

    echo json_encode($agingReport);
}


function markInvoiceAsPaid($pdo)
{
    // Get the input data
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate the input
    if (empty($input['InvoiceID'])) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'InvoiceID is required']);
        return;
    }

    // Prepare the SQL statement
    try {
        $stmt = $pdo->prepare("UPDATE Invoices SET PaymentStatus = 'Paid' WHERE InvoiceID = ?");
        $stmt->execute([$input['InvoiceID']]);

        // Check if any rows were affected
        if ($stmt->rowCount() > 0) {
            http_response_code(200); // OK
            echo json_encode(['success' => 'Invoice marked as paid']);
        } else {
            http_response_code(404); // Not Found
            echo json_encode(['error' => 'Failed to mark invoice as paid or Invoice not found']);
        }
    } catch (PDOException $e) {
        // Handle any database errors
        http_response_code(500); // Internal Server Error
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
}


function sendPaymentReminders($pdo)
{
    $stmt = $pdo->query("
        SELECT c.Email, c.CustomerName, i.InvoiceID, i.TotalAmount 
        FROM Invoices i
        JOIN Customers c ON i.CustomerID = c.CustomerID
        WHERE i.PaymentStatus = 'Unpaid' AND DATEDIFF(CURDATE(), i.InvoiceDate) > 30
    ");
    $reminders = $stmt->fetchAll();

    foreach ($reminders as $reminder) {
        // Implement email sending logic here using mail() or a mail library
        error_log("Sending reminder to: " . $reminder['Email'] . " for InvoiceID: " . $reminder['InvoiceID']);
    }

    echo json_encode(['success' => 'Payment reminders sent']);
}


function addProduct($pdo)
{
    $input = json_decode(file_get_contents('php://input'), true);

    // Check if ProductID, Quantity, and CustomerID are provided
    if (empty($input['ProductID']) || empty($input['Quantity']) || empty($input['CustomerID'])) {
        echo json_encode(['error' => 'ProductID, Quantity, and CustomerID are required']);
        return;
    }

    try {
        // Check if ProductID exists in Inventory
        $stmtCheckProduct = $pdo->prepare("SELECT * FROM inventory WHERE ProductID = ?");
        $stmtCheckProduct->execute([$input['ProductID']]);
        if ($stmtCheckProduct->rowCount() === 0) {
            echo json_encode(['error' => 'ProductID does not exist in Inventory']);
            return;
        }

        // Insert or update the product in the inventory
        $stmtInventory = $pdo->prepare("INSERT INTO inventory (ProductID, Quantity) VALUES (?, ?) ON DUPLICATE KEY UPDATE Quantity = Quantity + ?");
        $stmtInventory->execute([$input['ProductID'], $input['Quantity'], $input['Quantity']]);

        // Update Customer Balance
        $stmtBalance = $pdo->prepare("UPDATE Balance SET CurrentBalance = CurrentBalance + ? WHERE CustomerID = ?");
        $stmtBalance->execute([$input['Quantity'], $input['CustomerID']]);

        // Check if the customer exists
        $stmtCheckCustomer = $pdo->prepare("SELECT * FROM customers WHERE CustomerID = ?");
        $stmtCheckCustomer->execute([$input['CustomerID']]);
        if ($stmtCheckCustomer->rowCount() === 0) {
            echo json_encode(['error' => 'CustomerID does not exist']);
            return;
        }

        // Record transaction in history
        $stmtHistory = $pdo->prepare("INSERT INTO accountsreceivablehistory (CustomerID, ProductID, TransactionType, Amount, TransactionDate, Description) VALUES (?, ?, ?, ?, NOW(), ?)");
        $stmtHistory->execute([$input['CustomerID'], $input['ProductID'], 'Borrow', $input['Quantity'], 'Product borrowed']);

        echo json_encode(['success' => 'Product added successfully']);
    } catch (Exception $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
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
    } elseif ($action == 'get_customers') {
        getCustomers($pdo);
    } elseif ($_GET['action'] === 'get_products') {
        getProducts($pdo);
    } elseif ($action == 'login') {
        login($pdo);
    } elseif ($action == 'add_product') {
        addProduct($pdo);
    } elseif ($action == 'get_invoices') {
        getInvoices($pdo);
    } elseif ($action == 'mark_invoice_paid') {
        markInvoiceAsPaid($pdo);
    } elseif ($action == 'get_aging_report') {
        getAgingReport($pdo);
    } elseif ($action == 'send_payment_reminders') {
        sendPaymentReminders($pdo);
    } else {
        echo json_encode(['error' => 'Invalid action']);
    }
} else {
    echo json_encode(['error' => 'No action specified']);
}
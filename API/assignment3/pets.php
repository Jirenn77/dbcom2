<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';
class SavePets
{

    function addSpecies($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "INSERT INTO tbl_species(species_name) VALUES(:species_name)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":species_name", $json["species_name"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function addOwners($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "INSERT INTO tbl_owners(owner_name,owner_contact_details,owner_address) VALUES(:owner_name,:owner_contact_details,:owner_address)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":owner_name", $json["owner_name"]);
        $stmt->bindParam(":owner_contact_details", $json["owner_contact_details"]);
        $stmt->bindParam(":owner_address", $json["owner_address"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function addBreeds($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "INSERT INTO tbl_breeds(breed_name,species_id) VALUES(:breed_name,:species_id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":breed_name", $json["breed_name"]);
        $stmt->bindParam(":species_id", $json["species_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function addPets($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "INSERT INTO tbl_pets(pet_name,species_id,breed_id,date_of_birth,owner_id) VALUES(:pet_name,:species_id,:breed_id,:date_of_birth,:owner_id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":pet_name", $json["pet_name"]);
        $stmt->bindParam(":species_id", $json["species_id"]);
        $stmt->bindParam(":breed_id", $json["breed_id"]);
        $stmt->bindParam(":date_of_birth", $json["date_of_birth"]);
        $stmt->bindParam(":owner_id", $json["owner_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function updateSpecies($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "UPDATE tbl_species SET species_name = :species_name WHERE species_id = :species_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":species_name", $json["species_name"]);
        $stmt->bindParam(":species_id", $json["species_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function updateOwners($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "UPDATE tbl_owners SET owner_name = :owner_name, owner_contact_details = :owner_contact_details, owner_address = :owner_address WHERE owner_id = :owner_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":owner_name", $json["owner_name"]);
        $stmt->bindParam(":owner_contact_details", $json["owner_contact_details"]);
        $stmt->bindParam(":owner_address", $json["owner_address"]);
        $stmt->bindParam(":owner_id", $json["owner_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function updateBreeds($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "UPDATE tbl_breeds SET breed_name = :breed_name, species_id = :species_id WHERE breed_id = :breed_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":breed_name", $json["breed_name"]);
        $stmt->bindParam(":species_id", $json["species_id"]);
        $stmt->bindParam(":breed_id", $json["breed_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function updatePets($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "UPDATE tbl_pets SET pet_name = :pet_name, species_id = :species_id, breed_id = :breed_id, date_of_birth = :date_of_birth, owner_id = :owner_id WHERE pet_id = :pet_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":pet_name", $json["pet_name"]);
        $stmt->bindParam(":species_id", $json["species_id"]);
        $stmt->bindParam(":breed_id", $json["breed_id"]);
        $stmt->bindParam(":date_of_birth", $json["date_of_birth"]);
        $stmt->bindParam(":owner_id", $json["owner_id"]);
        $stmt->bindParam(":pet_id", $json["pet_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function deleteSpecies($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "DELETE FROM tbl_species WHERE species_id = :species_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":species_id", $json["species_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function deleteOwner($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "DELETE FROM tbl_owners WHERE owner_id = :owner_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":owner_id", $json["owner_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function deleteBreed($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "DELETE FROM tbl_breeds WHERE breed_id = :breed_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":breed_id", $json["breed_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function deletePet($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "DELETE FROM tbl_pets WHERE pet_id = :pet_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":pet_id", $json["pet_id"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function getOwnerDetails()
    {
        include 'db.php';
        $sql = "SELECT * FROM tbl_owners";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $stmt->rowCount() > 0 ? json_encode($result) : 0;
    }

    // function getSpeciesDetails()
    // {
    //     include "connection.php";
    //     $sql = "SELECT * FROM tbl_species";
    //     $stmt = $conn->prepare($sql);
    //     $stmt->execute();
    //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //     return $stmt->rowCount() > 0 ? json_encode($result) : 0;
    // }

    function getSpeciesDetails()
    {
        include 'db.php';
        $sql = "SELECT * FROM tbl_species";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($stmt->rowCount() > 0) {
            echo json_encode($result);  // Echo the JSON result
        } else {
            echo json_encode([]);  // Return an empty array instead of 0 for consistency
        }
    }


    function getBreedDetails()
    {
        include 'db.php';
        $sql = "SELECT * FROM tbl_breeds";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $stmt->rowCount() > 0 ? json_encode($result) : 0;
    }

    function getPetDetails()
    {
        include 'db.php';
    
        $sql = "SELECT 
                    a.owner_name, 
                    b.pet_name, 
                    c.species_name, 
                    d.breed_name, 
                    b.date_of_birth 
                FROM tbl_owners AS a 
                INNER JOIN tbl_pets AS b ON b.owner_id = a.owner_id 
                INNER JOIN tbl_species AS c ON c.species_id = b.species_id 
                INNER JOIN tbl_breeds AS d ON d.breed_id = b.breed_id";
    
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        return $stmt->rowCount() > 0 ? json_encode($result) : json_encode([]);
    }
    

    function getPetDetailsWithFilter($json)
    {
        include 'db.php';
        $json = json_decode($json, true);
        $sql = "SELECT a.owner_name,b.pet_name, c.species_name, d.breed_name, b.date_of_birth 
        FROM tbl_owners AS a 
        INNER JOIN tbl_pets AS b ON b.pet_id = a.owner_id 
        INNER JOIN tbl_species AS c ON c.species_id = b.pet_id 
        INNER JOIN tbl_breeds AS d ON d.breed_id = b.pet_id 
        WHERE a.owner_name = :owner_name OR d.breed_name = :breed_name OR c.species_name = :species_name";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":owner_name", $json["owner_name"]);
        $stmt->bindParam(":breed_name", $json["breed_name"]);
        $stmt->bindParam(":species_name", $json["species_name"]);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $stmt->rowCount() > 0 ? json_encode($result) : 0;
    }
}

$json = isset($_POST["json"]) ? $_POST["json"] : "0";
$operation = isset($_POST["operation"]) ? $_POST["operation"] : "0";
$savePets = new SavePets();

switch ($operation) {
    case "addSpecies":
        echo $savePets->addSpecies($json);
        break;
    case "addOwners":
        echo $savePets->addOwners($json);
        break;
    case "addBreeds":
        echo $savePets->addBreeds($json);
        break;
    case "addPets":
        echo $savePets->addPets($json);
        break;
    case "updateSpecies":
        echo $savePets->updateSpecies($json);
        break;
    case "updateOwners":
        echo $savePets->updateOwners($json);
        break;
    case "updateBreeds":
        echo $savePets->updateBreeds($json);
        break;
    case "updatePets":
        echo $savePets->updatePets($json);
        break;
    case "deleteSpecies":
        echo $savePets->deleteSpecies($json);
        break;
    case "deleteOwner":
        echo $savePets->deleteOwner($json);
        break;
    case "deleteBreed":
        echo $savePets->deleteBreed($json);
        break;
    case "deletePet":
        echo $savePets->deletePet($json);
        break;
    case "getOwnerDetails":
        echo $savePets->getOwnerDetails();
        break;
    case "getSpeciesDetails":
        echo $savePets->getSpeciesDetails();
        break;
    case "getBreedDetails":
        echo $savePets->getBreedDetails();
        break;
    case "getPetDetails":
        echo $savePets->getPetDetails();
        break;
    case "getPetDetailsWithFilter":
        echo $savePets->getPetDetailsWithFilter($json);
        break;
    default:
        break;
}

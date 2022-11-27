<?php

$userId = $_POST["userId"];
$userData = $_POST["userData"];

$decodedJSON = json_decode(base64_decode($userData), true);
$storedJSON = file_get_contents("../data/userLookup.json");
$data = json_decode($storedJSON, true);

foreach($decodedJSON as $key=>$value){
    $data[$userId][$key] = $value;
}

$updatedData = json_encode($data);
print_r($updatedData[$userId]);
file_put_contents("../data/userLookup.json", $updatedData);

echo "Success";

?>
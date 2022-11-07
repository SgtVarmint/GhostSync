<?php

$userId = "";

$name = $_POST["name"];

$jsonString = file_get_contents("../data/userLookup.json");
$data = json_decode($jsonString, true);

foreach($data as $key=>$val){
    if($data[$key]["name"] === $name){
        $userId = $key;
    }
}

echo base64_encode($userId);

?>
<?php

$userId = $_POST["userId"];

$jsonString = file_get_contents("../data/userLookup.json");
$data = json_decode($jsonString, true);

echo base64_encode(json_encode($data[$userId]));

?>
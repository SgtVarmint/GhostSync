<?php

$getGiverStats = $_POST["giver"];
$userId = $_POST["userId"];

$jsonString = file_get_contents("../data/userLookup.json");
$data = json_decode($jsonString, true);

if($getGiverStats === null){
    $returnData = $userId === "-1" ? $data : $data[$userId];
} else {
    $returnData = array(
        "numPackages" => 0,
        "giftsOrdered" => false,
        "giftsShipped" => false,
        "giftsDelivered" => false,
        "giftsRecieved" => false
    );
    foreach($data as $key=>$val) {
        if($val["recipientId"] == $userId){
            $returnData["numPackages"] = $val["numPackages"];
            $returnData["giftsOrdered"] = $val["giftsOrdered"];
            $returnData["giftsShipped"] = $val["giftsShipped"];
            $returnData["giftsDelivered"] = $val["giftsDelivered"];
            $returnData["giftsRecieved"] = $val["giftsRecieved"];
        }
    }
}

echo base64_encode(json_encode($returnData));

?>
<?php

$getGiverStats = $_POST["giver"];
$userId = $_POST["userId"];

$jsonString = file_get_contents("../data/userLookup.json");
$data = json_decode($jsonString, true);

if($getGiverStats === null){
    $returnData = $userId === "-1" ? $data : $data[$userId];
} else {
    foreach($data as $key=>$val) {
        $temp = $data[$key];
        if($temp["recipient"] === $userId){
            $returnData = array(
                "numPackages" => $temp["numPackages"],
                "giftsOrdered" => $temp["giftsOrdered"],
                "giftsShipped" => $temp["giftsShipped"],
                "giftsDelivered" => $temp["giftsDelivered"],
                "giftsRecieved" => $temp["giftsRecieved"]
            );
        }
    }
}

echo base64_encode(json_encode($returnData));

?>
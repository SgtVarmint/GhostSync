<?php

$jsonString = file_get_contents("../data/userLookup.json");
$data = json_decode($jsonString, true);

$returnArray = array(
    "giftsOrdered" => 0,
    "giftsShipped" => 0,
    "giftsDelivered" => 0,
    "giftsRecieved" => 0,
    "total" => 0
);

foreach($data as $key=>$value){
    $tempUser = $data[$key];
    if($tempUser["giftsOrdered"]){ $returnArray["giftsOrdered"]++; }
    if($tempUser["giftsShipped"]){ $returnArray["giftsShipped"]++; }
    if($tempUser["giftsDelivered"]){ $returnArray["giftsDelivered"]++; }
    if($tempUser["giftsRecieved"]){ $returnArray["giftsRecieved"]++; }

    $returnArray["total"]++;
}

echo base64_encode(json_encode($returnArray));

?>
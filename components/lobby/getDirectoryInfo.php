<?php
    $directory = $_POST['rootDir'] . $_POST['subDir'];

    $vidString = "";
    $listing = scandir($directory);

    foreach($listing as $file){
        $vidString .= $file . "|";
    }

    echo $vidString;

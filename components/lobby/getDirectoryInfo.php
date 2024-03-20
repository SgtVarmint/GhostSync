<?php

$availableFiles = '';
$filePath = '/var/www/html/' . $_POST['rootDir'] . $_POST['subDir'];
$files = scandir($filePath);

foreach($files as $file) {
    if ($file !== "." && $file !== "..") {
        $availableFiles .= $file . '|';
    }
}

echo $availableFiles;

?>
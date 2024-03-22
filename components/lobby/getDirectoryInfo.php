<?php

class GetDirectoryInfo {
    private string $workingDirectory = '';

    public function __construct()
    {
        $this->workingDirectory = '/var/www/html/' . $_POST['workingDirectory'];
    }

    public function getDirectoryContents(): array
    {
        $files = scandir($this->workingDirectory);
        $fileArray = [];

        foreach($files as $file)
        {
            if ($file !== '.' && $file !== '..')
            {
                array_push($fileArray, $file);
            }
        }

        return $fileArray;
    }
}

$directoryInfo = new GetDirectoryInfo();
$directoryContents = $directoryInfo->getDirectoryContents();
echo json_encode($directoryContents);

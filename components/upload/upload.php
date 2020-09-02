<?php

$path = '/Videos/Uploads/';
$extensions = ['video/mp4', 'video/mov', 'video/mvk'];

if ($_SERVER["REQUEST_METHOD"] == "POST")
{ 
    // Check if file was uploaded without errors 
    if (isset($_FILES["file"]) && $_FILES["file"]["error"] == 0) { 
        $file_name     = $_FILES["file"]["name"]; 
        $file_type     = $_FILES["file"]["type"]; 
        $file_size     = $_FILES["file"]["size"]; 
        $file_tmp_name = $_FILES["file"]["tmp_name"]; 
        $file_error    = $_FILES["file"]["error"]; 
         
		$file = $_SERVER["DOCUMENT_ROOT"] . $path . $file_name;
		
		if (!in_array($file_type, $extensions))
		{
                echo "File type " . $file_type . " not allowed!\n";
				echo "Video was not moved to Uploads folder";
        }
		else
		{
			move_uploaded_file($file_tmp_name, $file);
			echo "File Uploaded!";
		}
          
    } 
} 

?>
<?php

$path = '/Videos/Uploads/';
$extensions = ['video/mp4', 'video/mov', 'video/mvk'];

if ($_SERVER["REQUEST_METHOD"] == "POST")
{ 
    // Check if file was uploaded without errors 
    if (isset($_FILES["files"]))
	{ 
		$all_files = count($_FILES['files']['tmp_name']);
		
		for ($i = 0; $i < $all_files; $i++)
		{
			$file_name     = $_FILES["files"]["name"][$i]; 
			$file_type     = $_FILES["files"]["type"][$i]; 
			$file_size     = $_FILES["files"]["size"][$i]; 
			$file_tmp_name = $_FILES["files"]["tmp_name"][$i]; 
			$file_error    = $_FILES["files"]["error"][$i]; 
			 
			$file = $_SERVER["DOCUMENT_ROOT"] . $path . $file_name;
			
			echo "Video: " . $file_name . "\n";
			
			if (!in_array($file_type, $extensions))
			{
					echo "File type " . $file_type . " not allowed!\n";
					echo "Video was not moved to Uploads folder\n";
			}
			else
			{
				move_uploaded_file($file_tmp_name, $file);
				echo "File Uploaded!\n";
			}
		}
    } 
} 

?>
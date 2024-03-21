<?php

class Authentication {
	private bool $granted = false;
	private string $accessCode = '';

	public function __construct()
	{
		$this->accessCode = trim($_POST['accessCode']);
	}

	public function openFile(string $fileName): string|false
	{
		$file = fopen($filename, 'r') or die('unable to open file: ' . $fileName);
		$keyFile = fread($file, filesize($fileName));
		fclose($file);
		return $keyFile;
	}

	public function responseValue(string $keyFile): string
	{
		$keys = explode('\n', $keyFile);
		if ($this->validKey($keys))
		{
			return "gs:YrehJb5njkXW1lm39yiF@";
		}

		return "denied";
	}

	public function validKey(array $keys): bool
	{
		foreach($keys as $key)
		{
			if $this->accessCode === $key
			{
				return true;
			}
		}
		
		return false;
	}
}

$auth = new Authentication();
$keyFile = $auth->openFile('/var/www/html/components/authentication/access.txt');

echo $auth->responseValue($keyFile);

?>
<?php
	$inData = getRequestInfo();

	$first_name = $inData["first_name"];
	$last_name = $inData["last_name"];
	$phone = $inData["phone"];
	$username = $inData["username"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "lampy", "P@ssw0rd", "lamp");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into users (first_name, last_name, phone, username, password) VALUES(?,?,?,?,?)");
		$stmt->bind_param("ssiss", $first_name, $last_name, $phone, $username, $password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>

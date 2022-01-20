<?php
	$inData = getRequestInfo();

	$first_name = $inData["first_name"];
	$last_name = $inData["last_name"];
	$phone = $inData["phone"]

	$conn = new mysqli("localhost", "lampy", "password123", "lamp");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into contacts (first_name, last_name, phone) VALUES(?,?,?)");
		$stmt->bind_param("ssi", $first_name, $last_name, $phone);
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

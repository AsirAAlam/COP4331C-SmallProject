<?php
	require_once("LoadEnv.php");
	
	$inData = getRequestInfo();

  	$user_id = $inData["user_id"];
	$first_name = $inData["first_name"];
	$last_name = $inData["last_name"];
	$phone = $inData["phone"];
	$email = $inData["email"];

	$conn = (new LoadEnv(__DIR__.'/../../.env', __DIR__.'/../../.key'))->load();
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into contacts (user_id, first_name, last_name, phone, email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("issss", $user_id, $first_name, $last_name, $phone, $email);
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

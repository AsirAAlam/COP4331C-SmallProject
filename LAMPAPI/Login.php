
<?php

	$inData = getRequestInfo();

	$user_id = 0;
	$first_name = "";
	$last_name = "";
	$phone = 0;

	$conn = new mysqli("localhost", "lampy", "P@ssw0rd", "lamp");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT user_id,first_name,last_name,phone FROM users WHERE username=? AND password =?");
		$stmt->bind_param("ss", $inData["username"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['first_name'], $row['last_name'], $row['phone'], $row['user_id'] );
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
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
		$retValue = '{"user_id":0,"first_name":"","last_name":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $first_name, $last_name, $phone, $user_id )
	{
		$retValue = '{"user_id":' . $user_id . ',"first_name":"' . $first_name . '","last_name":"' . $last_name . '","phone":"' . $phone . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>

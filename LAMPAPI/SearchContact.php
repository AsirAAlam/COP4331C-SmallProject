<?php
	$inData = getRequestInfo();

	$user_id = $inData["user_id"];
	$name = $inData["name"];

	$name_arr = explode(" ", $name);
	$target = $name_arr[0] . "%";

	$conn = new mysqli("localhost", "lampy", "P@ssw0rd", "lamp");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT * FROM contacts WHERE first_name LIKE '$target'");
		// $stmt->bind_param("s", $target);
		$stmt->execute();
		$result = $stmt->get_result();

		$rows = array();

		while ($row = $result->fetch_assoc())
		{
			$rows[] = $row;
		}

		if( $rows[0]  )
		{
			returnWithInfo( $rows[0]['first_name'], $rows[0]['last_name'], $rows[0]['phone'], $rows[0]['user_id']);
			// returnWithError("Found");
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
		// returnWithError("4");
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

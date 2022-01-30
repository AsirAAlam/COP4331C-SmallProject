<?php
	$inData = getRequestInfo();

	$user_id = $inData["user_id"];
	$name = $inData["name"];

	$conn = new mysqli("localhost", "lampy", "P@ssw0rd", "lamp");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("
      SELECT * FROM contacts 
      WHERE user_id=$user_id
      AND (first_name LIKE '%$name%'
      OR last_name LIKE '%$name%'
      OR CONCAT(first_name, ' ', last_name) LIKE '%$name%')
      ORDER BY first_name, last_name, phone, user_id, contact_id;
    ");
		$stmt->execute();
		$result = $stmt->get_result();

		$rows = array();

		while ($row = $result->fetch_assoc())
		{
			$rows[] = $row;
		}

    sendResultInfoAsJson(json_encode( $rows ));

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

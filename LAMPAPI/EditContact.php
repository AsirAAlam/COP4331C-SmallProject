
<?php
	$inData = getRequestInfo();

	$contact_id = $inData['contact_id'];
	$first_name = $inData['first_name'];
	$last_name = $inData['last_name'];
	$phone = $inData['phone'];

	$conn = new mysqli("localhost", "lampy", "P@ssw0rd", "lamp");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("SELECT contact_id FROM contacts WHERE contact_id=$contact_id");
		$stmt->execute();
		$result = $stmt->get_result();

		if( $row = $result->fetch_assoc()  )
		{
			$conn->query("
        UPDATE contacts 
        SET first_name = '$first_name', last_name = '$last_name', phone = '$phone'
        WHERE contact_id = $contact_id 
      ");
			returnWithError("");
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>

<?php
	require_once("LoadEnv.php");
	$inData = getRequestInfo();

	$user_id = $inData["user_id"];
	$name = $inData["name"];

	$conn = (new LoadEnv(__DIR__.'/../../.env', __DIR__.'/../../.key'))->load();
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
      			OR CONCAT(first_name, ' ', last_name) LIKE '%$name%'
      			OR email LIKE '%$name%'
      			OR phone LIKE '%$name%')
      			ORDER BY first_name, last_name, phone, email, user_id, contact_id;
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
?>

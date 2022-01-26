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
    $srch = $conn->prepare("SELECT * FROM users WHERE username=?");
		$srch->bind_param("s", $username);
		$srch->execute();
		$result = $srch->get_result();

    if ($result->fetch_assoc())
    {
      returnWithError("The username already exists.");
    }
    else
    {
      $stmt = $conn->prepare("INSERT into users (first_name, last_name, phone, username, password) VALUES(?,?,?,?,?)");
      $stmt->bind_param("sssss", $first_name, $last_name, $phone, $username, $password);
      $stmt->execute();
      $stmt->close();
      returnWithError("");
    }

    $srch->close();
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

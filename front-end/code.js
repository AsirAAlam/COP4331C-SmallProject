const urlBase = "http://cop4331group8.xyz/php";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let inputUsername = document.getElementById("usernameInput").value;
  let inputPassword = document.getElementById("passwordInput").value;
  //	var hash = md5( password );

  document.getElementById("loginResult").innerHTML = "";

  let tmp = {
    username: inputUsername,
    password: inputPassword,
  };
  //	var tmp = {login:login,password:hash};
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/Login." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      document.getElementById("loginResult").innerHTML = this.status;
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.user_id;

        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }

        firstName = jsonObject.first_name;
        lastName = jsonObject.last_name;
        userId = jsonObject.user_id;
        saveCookie();

        window.location.href = "./contact_manager.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function doRegister() {
  let inputFirstname = document.getElementById("firstNameInputRegister").value;
  let inputLastname = document.getElementById("lastNameInputRegister").value;
  let inputPhone = document.getElementById("phoneInputRegister").value;
  let inputUsername = document.getElementById("usernameInputRegister").value;
  let inputPassword = document.getElementById("passwordInputRegister").value;
  //	var hash = md5( password );

  // document.getElementById("signupResult").innerHTML = "clicked register";

  let tmp = {
    first_name: inputFirstname,
    last_name: inputLastname,
    phone: inputPhone,
    username: inputUsername,
    password: inputPassword,
  };
  //	var tmp = {login:login,password:hash};

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/AddUser." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      // document.getElementById("signupResult").innerHTML = this.status;
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        error = jsonObject.error;

        if (error != "") {
          document.getElementById("signupResult").innerHTML =
            "Username already exists.";
          return;
        }

        saveCookie();

        window.location.href = "./index.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("signupResult").innerHTML = err.message;
  }
}

function doAddContact() {
  let inputFirstname = document.getElementById("addInputFirst").value;
  let inputLastname = document.getElementById("addInputLast").value;
  let inputPhone = document.getElementById("addInputPhone").value;
  //	var hash = md5( password );
  document.getElementById("addInputFirst").value = "";
  document.getElementById("addInputLast").value = "";
  document.getElementById("addInputPhone").value = "";

  readCookie();
  // document.getElementById("addContactResult").innerHTML = "clicked add contact2";
  // document.getElementById("successAlert").style.visibility = "visible";

  let tmp = {
    user_id: userId,
    first_name: inputFirstname,
    last_name: inputLastname,
    phone: inputPhone,
  };
  // //	var tmp = {login:login,password:hash};

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/AddContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        error = jsonObject.error;

        document.getElementById("addContactResult").innerHTML =
          "Contact successfully added.";

        saveCookie();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("addContactResult").innerHTML = err.message;
  }

  document.getElementById("searchKeywordInput").value = "";
  searchContacts();
}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
  console.log(document.cookie);
}

function readCookie() {
  userId = -1;
  let data = document.cookie;
  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  // if ( userId < 0 )
  // {
  // 	window.location.href = "index.html";
  // }
  // else
  // {
  // 	document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
  // }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

let tableHeaders = ["First Name", "Last Name", "Phone", ""];

function createContactsTable(contactListDiv) {
  while (contactListDiv.firstChild) contactListDiv.removeChild(contactListDiv.firstChild); // Remove all children from scoreboard div (if any)

  let contactTable = document.createElement("table"); // Create the table itself
  contactTable.className = "contactTable";

  let tableHead = document.createElement("thead"); // Creates the table header group element
  tableHead.className = "tableHead";

  let headerRow = document.createElement("tr"); // Creates the row that will contain the headers
  headerRow.className = "headerRow";

  // Will iterate over all the strings in the tableHeader array and will append the header cells to the table header row
  tableHeaders.forEach((header) => {
    let contactHeader = document.createElement("th"); // Creates the current header cell during a specific iteration
    contactHeader.innerText = header;
    headerRow.append(contactHeader); // Appends the current header cell to the header row
  });

  tableHead.append(headerRow); // Appends the header row to the table header group element
  contactTable.append(tableHead);

  let tableBody = document.createElement("tbody"); // Creates the table body group element
  tableBody.className = "table-Body";
  contactTable.append(tableBody); // Appends the table body group element to the table
  contactListDiv.append(contactTable); // Appends the table to the scoreboard div
}

function updateContactTable(arrayOfContacts) {
  const appendContact = (contact) => {
    const contactTable = document.querySelector(".contactTable"); // Find the table we created

    let bodyRow = document.createElement("tr"); // Create the current table row
    bodyRow.className = "bodyRow";

    let firstName = document.createElement("td");
    firstName.innerText = contact["first_name"];

    let lastName = document.createElement("td");
    lastName.innerText = contact["last_name"];

    let phone = document.createElement("td");
    phone.innerText = contact["phone"];

    let editCell = document.createElement("td");
    let editButton = document.createElement("a");
    editButton.className = "modifyContact";
    editButton.innerText = "Edit";
    editButton.href = "http://www.google.com";
    editCell.append(editButton);

    bodyRow.append(firstName, lastName, phone, editCell); // Append all 5 cells to the table row
    contactTable.append(bodyRow); // Append the current row to the scoreboard table body
  };

  createContactsTable(document.getElementById("contactList"));

  for (const contact of arrayOfContacts) {
    // let scoreIndex = scores.indexOf(score) + 1; // Index of score in score array for global ranking (these are already sorted in the back-end)
    appendContact(contact); // Creates and appends each row to the table body
  }
}

function searchContacts() {
  let srch = document.getElementById("searchKeywordInput").value;
  document.getElementById("contactList").innerHTML = "";

  readCookie();

  let tmp = {
    user_id: userId,
    name: srch,
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SearchContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("searchResult").innerHTML =
          "Contact(s) has been retrieved";

        let arrayOfContacts = JSON.parse(xhr.responseText);

        updateContactTable(arrayOfContacts);
      }

    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("searchResult").innerHTML = err.message;
  }

  // Bind enter key to search button
  $("#searchKeywordInput").on("keyup", function (event) {
    if (event.keyCode === 13) {
      //  console.log("Enter key pressed!!!!!");
      $("#Search_ContactManager").click();
    }
  });
}

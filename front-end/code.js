const urlBase = "http://cop4331group8.xyz/php";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";
let contactId = 0;

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
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.user_id;

        if (userId < 1) {
          document.getElementById("loginResult");
          loginResult.textContent = "User/Password combination incorrect.";
          loginResult.className = "error";
          return;
        }

        firstName = jsonObject.first_name;
        lastName = jsonObject.last_name;
        userId = jsonObject.user_id;
        saveCookie();

        window.location.href = "./contactManager.html";
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

  if (inputUsername.length < 4)
  {
    usernameError.textContent = "Username must be at least 4 characters.";
    usernameError.className = "error";
    usernameInputRegister.style.borderColor = "red";
    usernameInputRegister.style.borderWidth = "2px";
    return;
  }

  let tmp = {
    first_name: inputFirstname,
    last_name: inputLastname,
    // phone: inputPhone.replace(/^(\d{3})(\d{3})(\d{4})$/g, '($1)-$2-$3'),
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
          usernameError.textContent = "Username already exists.";
          usernameError.className = "error";
          usernameInputRegister.style.borderColor = "red";
          usernameInputRegister.style.borderWidth = "2px";
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
  let inputEmail = document.getElementById("addInputEmail").value;
  //	var hash = md5( password );
  document.getElementById("addInputFirst").value = "";
  document.getElementById("addInputLast").value = "";
  document.getElementById("addInputPhone").value = "";
  document.getElementById("addInputEmail").value = "";

  readCookie();
  // document.getElementById("addContactResult").innerHTML = "clicked add contact2";
  // document.getElementById("successAlert").style.visibility = "visible";

  let tmp = {
    user_id: userId,
    first_name: inputFirstname,
    last_name: inputLastname,
    // phone: inputPhone.replace(/^(\d{3})(\d{3})(\d{4})$/g, '($1)-$2-$3'),
    // email: inputEmail.replace(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    phone: inputPhone,
    email: inputEmail
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

function doEditContact() {
  let inputFirstname = document.getElementById("editInputFirst").value;
  let inputLastname = document.getElementById("editInputLast").value;
  let inputPhone = document.getElementById("editInputPhone").value;
  let inputEmail = document.getElementById("editInputEmail").value;
  //	var hash = md5( password );
  document.getElementById("editInputFirst").value = "";
  document.getElementById("editInputLast").value = "";
  document.getElementById("editInputPhone").value = "";
  document.getElementById("editInputEmail").value = "";

  readCookie();
  // document.getElementById("addContactResult").innerHTML = "clicked add contact2";
  // document.getElementById("successAlert").style.visibility = "visible";

  let tmp = {
    contact_id: contactId,
    first_name: inputFirstname,
    last_name: inputLastname,
    phone: inputPhone,
    email: inputEmail
    // phone: inputPhone.replace(/^(\d{3})(\d{3})(\d{4})$/g, '($1)-$2-$3'),
    // email: inputEmail.replace(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  };
  // //	var tmp = {login:login,password:hash};

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/EditContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        error = jsonObject.error;

        document.getElementById("editContactResult").innerHTML =
          "Contact successfully updated.";

        saveCookie();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("editContactResult").innerHTML = err.message;
  }

  document.getElementById("searchKeywordInput").value = "";
  searchContacts();
}

function doDeleteContact() {
  //	var hash = md5( password );
  document.getElementById("editInputFirst").value = "";
  document.getElementById("editInputLast").value = "";
  document.getElementById("editInputPhone").value = "";
  document.getElementById("editInputEmail").value = "";

  readCookie();
  // document.getElementById("addContactResult").innerHTML = "clicked add contact2";
  // document.getElementById("successAlert").style.visibility = "visible";

  let tmp = {
    contact_id: contactId,
  };
  // //	var tmp = {login:login,password:hash};

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/DeleteContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        error = jsonObject.error;

        document.getElementById("deleteContactResult").innerHTML =
          "Contact successfully deleted.";

        saveCookie();
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("deleteContactResult").innerHTML = err.message;
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

let tableHeaders = ["First Name", "Last Name", "Phone", "Email", ""];

function createContactsTable(contactListDiv) {
  while (contactListDiv.firstChild) contactListDiv.removeChild(contactListDiv.firstChild); // Remove all children from scoreboard div (if any)

  let contactTable = document.createElement("table"); // Create the table itself
  contactTable.className = "contactTable";

  let tableHead = document.createElement("thead"); // Creates the table header group element
  tableHead.className = "tableHead marcellus";

  let headerRow = document.createElement("tr"); // Creates the row that will contain the headers
  headerRow.className = "headerRow marcellus";

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
  contactTable.append(tableBody);
  contactListDiv.append(contactTable);
}

function updateContactTable(arrayOfContacts) {
  const appendContact = (contact) => {
    const contactTable = document.querySelector(".contactTable");

    let bodyRow = document.createElement("tr");
    bodyRow.className = "bodyRow";

    let firstName = document.createElement("td");
    firstName.innerText = contact["first_name"];

    let lastName = document.createElement("td");
    lastName.innerText = contact["last_name"];

    let phone = document.createElement("td");
    phone.innerText = contact["phone"];

    let email = document.createElement("td");
    email.innerText = contact["email"];

    let editCell = document.createElement("td");
    let editButton = document.createElement("button");
    editButton.className = "modifyContact";
    editButton.innerText = "Edit";

    editButton.addEventListener("click", function(event) {
      event.preventDefault();
      contactId = contact["contact_id"];
      saveCookie();
      document.getElementById("editInputFirst").value = contact["first_name"];
      document.getElementById("editInputLast").value = contact["last_name"];
      document.getElementById("editInputPhone").value = contact["phone"];
      document.getElementById("editInputEmail").value = contact["email"];
      document.getElementById("Edit_Contact").click();
    });
    editCell.append(editButton);

    bodyRow.append(firstName, lastName, phone, email, editCell);
    contactTable.append(bodyRow);
  };

  createContactsTable(document.getElementById("contactList"));

  for (const contact of arrayOfContacts) {
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
        let arrayOfContacts = JSON.parse(xhr.responseText);

        updateContactTable(arrayOfContacts);
      }

    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("searchResult").innerHTML = err.message;
  }
}

function loadIndex() {
  document.getElementById("usernameInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("loginButton").click();
    }
  });
  
  document.getElementById("passwordInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("loginButton").click();
    }
  });
}

function loadContactManager() {
  searchContacts();

  // Enter to search
  document.getElementById("searchKeywordInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("Search_ContactManager").click();
    }
  });

  // Enter to add contact
  let addInput = [
    "addInputFirst", 
    "addInputLast", 
    "addInputPhone",
    "addInputEmail"
  ]
  for (const id of addInput) {
    document.getElementById(id)
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("saveAddContactBtn").click();
      }
    });
  }
  
  // Enter edit add contact
  let editInput = [
    "editInputFirst", 
    "editInputLast", 
    "editInputPhone",
    "editInputEmail"
  ]

  for (const id of editInput) {
    document.getElementById(id)
    .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("saveEditContactBtn").click();
      }
    });
  }
}

function togglePasswordVisibility() {
  var x = document.getElementById("passwordInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

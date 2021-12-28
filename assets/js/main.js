window.isAuthenticated = false;
window.identity = {};
window.token = '';

function handleCredentialResponse(response) {
    window.token = response.credential;
    window.identity = parseJwt(response.credential);
    window.isAuthenticated = true;
    showAuthInfo();
}

function populateTable() {
    var table = document.getElementById("token-table");
    var keys = Object.keys(window.identity);
    var j = 0;
    for (var i = 1; i < keys.length; i++) {
        var row = table.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = keys[j];
        cell2.innerHTML = window.identity[keys[j]];
        j++;
    }
}

function destroyTable() {
    var table = document.getElementById("token-table");
    var rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(i);
    }
}

function showAuthInfo() {
    if (window.isAuthenticated) { 
        document.getElementById("authenticated").style.removeProperty('display');
        document.getElementById("welcome").innerHTML = `Hello <b>${window.identity.name}!</b><img src="${window.identity.picture}" alt="Avatar" style="padding: 0 2rem 0 2rem; border-radius: 50%;">`;
        document.getElementById("alternative-login").style.setProperty('display', 'none');
        document.getElementById("raw-token").innerText = window.token;
        populateTable();
    } else {
        document.getElementById("authenticated").style.setProperty('display', 'none');
        document.getElementById("welcome").innerText = 'Hello there!';
        document.getElementById("alternative-login").style.removeProperty('display');
        destroyTable();
    }
}

window.onload = function () {
    window.isAuthenticated = false;
    showAuthInfo();
    google.accounts.id.initialize({
        client_id: "1083651747097-11rdqe2avi66tgoldsatp8p8l2pdq6tj.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: true,
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
}
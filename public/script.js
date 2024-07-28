// Simulated database to store user information
var users = [];

function registerUser() {
    var username = document.getElementById('regUsername').value;
    var password = document.getElementById('regPassword').value;
    
    // Check if the username is already taken
    if (isUsernameTaken(username)) {
        alert('Username is already taken. Please choose another one.');
        return false;
    }

    // Add the new user to the database
    users.push({ username: username, password: password });
    
    alert('User registered successfully!');
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
    return false;
}

function isUsernameTaken(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return true;
        }
    }
    return false;
}

function loginUser() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    
    // Check if the user exists and the password matches
    var user = getUser(username);
    if (user && user.password === password) {
        alert('User logged in successfully!');
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('itemSelection').style.display = 'block';
    } else {
        alert('Invalid username or password. Please try again.');
    }
    return false;
}

function getUser(username) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            return users[i];
        }
    }
    return null;
}

function selectItems() {
    var selectedItems = [];
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(function(checkbox) {
        selectedItems.push(checkbox.id);
    });
    alert('Selected items: ' + selectedItems.join(', '));
    
    // Redirect to the payment transaction page
    redirectToPaymentPage();

    return false;
}

function redirectToPaymentPage() {
    // Simulated payment page URL
    var paymentPageURL = 'https://www.phonepe.com/payment';

    // Open a new window or tab for the payment page
    window.open(paymentPageURL, '_blank');
}

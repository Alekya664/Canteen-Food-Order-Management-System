document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    function validateForm() {
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm_password').value.trim();

        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');

        // Reset error messages
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        // Username validation (only alphanumeric characters)
        const usernamePattern = /^[a-zA-Z0-9]+$/;
        if (!username.match(usernamePattern)) {
            usernameError.textContent = 'Username must contain only letters and numbers.';
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailPattern)) {
            emailError.textContent = 'Invalid email address.';
        }

        // Password validation (at least 8 characters)
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
            return false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match.';
        }

        // If no errors, submit the form
        if (!usernameError.textContent && !emailError.textContent && !passwordError.textContent && !confirmPasswordError.textContent) {
            form.submit();
        }
    }
});

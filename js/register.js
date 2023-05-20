// This file allows users to register in the app. It makes a POST request to the backend server with the user data.

document.addEventListener('DOMContentLoaded', function() {
  var registerForm = document.getElementById('register-form');
  var organizationCheckbox = document.getElementById('register-organization');
  var organizationInfo = document.getElementById('organization-info');

  organizationCheckbox.addEventListener('change', function() {
    if (organizationCheckbox.checked) {
      organizationInfo.style.display = 'block';
    } else {
      organizationInfo.style.display = 'none';
    }
  });

  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('register-username').value;
    var password = document.getElementById('register-password').value;
    var confirmPassword = document.getElementById('register-confirm-password').value;
    var email = document.getElementById('register-email').value;
    var isOrganization = organizationCheckbox.checked;
    var organizationName = document.getElementById('organization-name').value;
    var organizationURL = document.getElementById('organization-url').value;
    var organizationRegistrationCode = document.getElementById('organization-registration-code').value;

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Create a user object
    var user = {
      username: username,
      password: password,
      email: email,
      isOrganization: isOrganization,
      organizationName: organizationName,
      organizationURL: organizationURL,
      organizationRegistrationCode: organizationRegistrationCode
    };

    // Make an HTTP POST request to the server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:2565', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        // Clear the form inputs
        registerForm.reset();
        organizationCheckbox.checked = false;
        organizationInfo.style.display = 'none';

        alert('User registered successfully!');
      } else if (xhr.readyState === XMLHttpRequest.DONE) {
        alert('An error occurred while registering the user.');
      }
    };
    xhr.send(JSON.stringify(user));
  });
});

// class Controller {

//     constructor() {
//         this.observeAppElement();
//         this.showLoginScreen();
//     }

//     observeAppElement() {
//         const appElement = document.getElementById('app');
//         const observer = new MutationObserver((mutations) => {
//             for (const mutation of mutations) {
//                 if (mutation.type === 'childList') {
//                     const loginScreen = document.getElementById('login');
//                     const registerScreen = document.getElementById('register');

//                     if (loginScreen) {
//                         this.initializeLogin();
//                     } else if (registerScreen) {
//                         this.initializeRegistration();
//                     }
//                 }
//             }
//         });

//         observer.observe(appElement, { childList: true });
//     }

//     initializeLogin() {
//         const loginForm = document.getElementById('login-form');
//         loginForm.addEventListener('submit', (event) => {
//             event.preventDefault();
//             this.handleLogin();
//         });

//         // Handle the "Register" link click
//         document.getElementById('register-link').addEventListener('click', (event) => {
//             event.preventDefault();
//             this.showRegisterScreen();
//         });
//     }

//     async loadUsers() {
//         const response = await fetch('data/users.csv');
//         const text = await response.text();
//         const lines = text.split('\n');
//         const users = [];
//         for (const line of lines) {
//           const [username, password] = line.split(',');
//           if (username && password) {
//             users.push({ username, password });
//           }
//         }
//         return users;
//     }

//     async handleLogin() {
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         // Load the users from the CSV file
//         const users = await this.loadUsers();

//         // Check the credentials
//         const authenticatedUser = users.find((user) => user.username === username && user.password === password);

//          if (/*authenticatedUser */true) {
//             console.log('Login successful:', username);
//             await this.showHomeScreen();
//         } else {
//             console.log('Login failed:', username);
//             alert('Invalid username or password.');
//         }
//     }

//     initializeRegistration() {
//         // Handle the "Back" link click
//         document.getElementById('back-to-login-link').addEventListener('click', (event) => {
//             event.preventDefault();
//             this.showLoginScreen();
//         });

//         // Handle the organization checkbox change
//         document.getElementById('register-organization').addEventListener('change', (event) => {
//             this.toggleOrganizationInfo(event.target.checked);
//         });

//         // Handle the registration form submission
//         document.getElementById('register-form').addEventListener('submit', (event) => {
//             event.preventDefault();
//             this.handleRegistration();
//         });
//     }

//     toggleOrganizationInfo(checked) {
//         document.getElementById('organization-info').style.display = checked ? 'block' : 'none';
//     }

//     async loadScreen(screenName) {
//         console.log('Loading screen:', screenName);
//         const response = await fetch(`./screens/${screenName}.html`);
//         const screenHtml = await response.text();
//         document.getElementById('app').innerHTML = screenHtml;
//     }

//     async showLoginScreen() {
//         await this.loadScreen('login');
//     }

//     async showRegisterScreen() {
//         await this.loadScreen('register');
//         this.initializeRegistration();
//     }

//     async showHomeScreen() {
//         await this.loadScreen('home');
//     }

//     handleRegistration() {
//         const username = document.getElementById('register-username').value;
//         const password = document.getElementById('register-password').value;
//         const confirmPassword = document.getElementById('register-confirm-password').value;
//         const email = document.getElementById('register-email').value;
//         const isOrganization = document.getElementById('register-organization').checked;
//         const organizationName = document.getElementById('organization-name').value;
//         const organizationRegistrationCode = document.getElementById('organization-registration-code').value;

//         // Perform validation checks like matching passwords, valid email format, etc.
//         if (password !== confirmPassword) {
//             alert("Passwords do not match.");
//             return;
//         }

//         // Perform the registration logic (e.g., validate the input, store user data, etc.)
//         console.log('Registration attempt:', {
//             username,
//             password,
//             email,
//             isOrganization,
//             organizationName,
//             organizationRegistrationCode
//         });

//         // After successful registration, navigate back to the login screen
//         this.showLoginScreen();
//     }
// }

// export default Controller;

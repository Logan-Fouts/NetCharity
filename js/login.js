function initializeLogin(){
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.handleLogin();
    });
}

async function loadUsers() {
    const response = await fetch('data/users.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const users = [];
    for (const line of lines) {
        const [username, password] = line.split(',');
        if (username && password) {
        users.push({ username, password });
        }
    }
    return users;
}
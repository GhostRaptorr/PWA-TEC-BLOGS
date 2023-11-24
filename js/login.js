document.addEventListener("DOMContentLoaded", function () {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginButton = document.getElementById('button');

    document.addEventListener("DOMContentLoaded", function () {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
            window.location.href = "../views/blogs.html";
        }
    });

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();

        const enteredUsername = username.value.trim();
        if (!enteredUsername) {
            alert("Por favor, ingresa un nombre de usuario.");
            return;
        }

        const enteredPassword = password.value.trim();
        if (!enteredPassword) {
            alert("Por favor, ingresa una contraseña.");
            return;
        }

        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert("Por favor, completa el reCAPTCHA.");
            return;
        }

        const storedUsersJSON = localStorage.getItem("userData");
        const storedUsers = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];

        const user = storedUsers.find(u => u.username === enteredUsername);

        if (user) {
            if (user.password === enteredPassword) {
                alert("Inicio de sesión exitoso");
                localStorage.setItem("loggedInUser", enteredUsername);
                window.location.href = "../views/blogs.html";
            } else {
                alert("La contraseña es incorrecta. Inténtalo de nuevo.");
            }
        } else {
            alert("Usuario no reconocido. Por favor, registrate.");
        }
    });
});

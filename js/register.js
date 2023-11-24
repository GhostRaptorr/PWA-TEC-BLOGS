document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const button = document.getElementById("button");

    /*Para quitar el inspecionar */
    /*
    document.addEventListener("contextmenu", (e)=>{
        e.preventDefault();
    });
    document.addEventListener("keydown", (e)=>{
        console.log(e)
    })*/

    /************************** */

    form.addEventListener("submit", function (event) {
        try {
            let isValid = true;

            const emailValue = email.value;
            if (emailValue === "") {
                isValid = false;
                showError(email, "Por favor, ingresa tu email");
            } else if (!isValidEmail(emailValue)) {
                isValid = false;
                showError(email, "Ingresa una dirección de correo electrónico válida");
            } else {
                hideError(email);
            }

            const usernameValue = username.value; 
            if (usernameValue === "") {
                isValid = false;
                showError(username, "Por favor, ingresa tu nombre de usuario");
            } else {
                hideError(username);
            }

            if (password.value === "") {
                isValid = false;
                showError(password, "Por favor, ingresa una contraseña");
            } else if (password.value.length < 6) {
                isValid = false;
                showError(password, "La contraseña debe tener al menos 6 caracteres");
            } else {
                hideError(password);
            }

            if (password2.value === "") {
                isValid = false;
                showError(password2, "Por favor, confirma tu contraseña");
            } else if (password2.value !== password.value) {
                isValid = false;
                showError(password2, "Las contraseñas no coinciden");
            } else {
                hideError(password2);
            }

            if (!isValid) {
                event.preventDefault();
            }


            if (isValid) {
                const userData = {
                    email: email.value,
                    username: username.value,
                    password: password.value,
                    password2: password2.value,
                };

                try {
                    const storedUsersJSON = localStorage.getItem("userData");
                    const storedUsers = storedUsersJSON ? JSON.parse(storedUsersJSON) : [];
                    const isDuplicateUser = storedUsers.some(u => u.email === userData.email);

                    if (isDuplicateUser) {
                        alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
                        return;
                    }
                    storedUsers.push(userData);
                    const jsonData = JSON.stringify(storedUsers);
                    localStorage.setItem("userData", jsonData);
                    alert("Registro exitoso");
                    window.location.href = "../index.html";

                } catch (error) {
                    console.error("Error al almacenar datos en localStorage:", error);
                }
            }

        } catch (error) {
            console.error("Se ha producido un error:", error);
        }

    });


    function showError(input, message) {
        const parent = input.parentElement;
        const errorMessage = parent.querySelector(".error-message");
        if (!errorMessage) {
            const errorElement = document.createElement("span");
            errorElement.className = "error-message";
            errorElement.textContent = message;
            parent.appendChild(errorElement);
        } else {
            errorMessage.textContent = message;
        }
        input.classList.add("error");
    }

    function hideError(input) {
        const parent = input.parentElement;
        const errorMessage = parent.querySelector(".error-message");
        if (errorMessage) {
            parent.removeChild(errorMessage);
        }
        input.classList.remove("error");
    }

    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }
});

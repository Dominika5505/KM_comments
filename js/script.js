const registerPopupBtn = document.querySelector('.register-popup-btn');
const loginPopupBtn = document.querySelector('.login-popup-btn');
const LogoutBtn = document.querySelector('.log-out');

let isLoggedIn = localStorage.getItem('loggedIn');

if (isLoggedIn != null) {
    loginPopupBtn.style.display = "none";
    registerPopupBtn.style.display = "none";
    LogoutBtn.style.display = "inline-block";
} else {
    loginPopupBtn.style.display = "block";
    registerPopupBtn.style.display = "inline-block";
    LogoutBtn.style.display = "none";
}


// Login animations

const loginWrapper = document.querySelector('.login-wrapper');
const loginContainer = document.querySelector('.login-container');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginCloseBtn = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    loginWrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    loginWrapper.classList.remove('active');
});

loginPopupBtn.addEventListener('click', () => {
    loginWrapper.classList.add('active-popup');
    loginContainer.classList.add('active-popup');
});

registerPopupBtn.addEventListener('click', () => {
    loginWrapper.classList.add('active-popup');
    loginContainer.classList.add('active-popup');
    loginWrapper.classList.add('active');
});

loginCloseBtn.addEventListener('click', () => {
    loginWrapper.classList.remove('active-popup');
    loginContainer.classList.remove('active-popup');
});


// Register
const registerForm = document.querySelector('#register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isError = false;

    let errorMsgRegister = document.querySelector('.register .auth-error-msg');

    let username = document.querySelector('.register #username').value;
    let email = document.querySelector('.register #register-email').value;
    let password1 = document.querySelector('.register #password1').value;
    let password2 = document.querySelector('.register #password2').value;

    if (password1 !== password2) {
        errorMsgRegister.classList.add('error');
        errorMsgRegister.textContent = "Passwords don't match.";
        isError = true;
    }

    if (!isError) {
        let user = {
            email: email,
            username: username,
            password: password1,
        };
        let errorMsgLogin = document.querySelector('.login .auth-error-msg');


        localStorage.setItem(email, JSON.stringify(user));

        errorMsgLogin.classList.add('success');
        errorMsgLogin.textContent = "Registration was succesful.";

        registerForm.reset();

        loginWrapper.classList.remove('active');

        let loginEmail = document.querySelector('.login #login-email');
        loginEmail.value = email;
    }

    console.log(password1);
    console.log(password2);
});


// Login
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    
    let email = document.querySelector('.login #login-email').value;
    let password = document.querySelector('.login #password').value;
    
    let userStorage = JSON.parse(localStorage.getItem(email));
    

    let isError = false;

    if (!userStorage) {
        // User doesn't exist
        console.log("User doesn't exist.");
        isError = true;
    } else if (password !== userStorage.password) {
        console.log("Wrong password.");
        isError = true;
    }

    if (!isError) {
        localStorage.removeItem('loggedIn');

        let errorMsgLogin = document.querySelector('.login .auth-error-msg');
        errorMsgLogin.classList.add('success');
        errorMsgLogin.textContent = "Registration was succesful.";

        localStorage.setItem('loggedIn', email);

        window.location.reload();


    }
});

// Log out
LogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    window.location.reload();
})


fetch("./data/comments.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
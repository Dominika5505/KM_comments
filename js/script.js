// Init

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
const loginPopupLink = document.querySelector('.login-popup-link');
const registerLink = document.querySelector('.register-link');
const registerPopupLink = document.querySelector('.register-popup-link');
const loginCloseBtn = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
    loginWrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    loginWrapper.classList.remove('active');
});

loginPopupLink.addEventListener('click', () => {
    loginWrapper.classList.add('active-popup');
    loginContainer.classList.add('active-popup');
    loginWrapper.classList.remove('active');
});

loginPopupBtn.addEventListener('click', () => {
    loginWrapper.classList.add('active-popup');
    loginContainer.classList.add('active-popup');
    loginWrapper.classList.remove('active');
});

registerPopupBtn.addEventListener('click', () => {
    loginWrapper.classList.add('active-popup');
    loginContainer.classList.add('active-popup');
    loginWrapper.classList.add('active');
});

registerPopupLink.addEventListener('click', () => {
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

        localStorage.setItem('loggedIn', userStorage.username);

        window.location.reload();
    }
});

// Log out
LogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    window.location.reload();
});

// Comments

class Comment {
    constructor(id, parentId, content, timestamp, username) {
      this.id = id;
      this.parentId = parentId;
      this.content = content;
      this.timestamp = timestamp;
      this.username = username;

      this.appendToParent();
    }

    createCommentElement() {

        // Comment card wrap
        let newCardWrap = document.createElement('div');
        newCardWrap.classList.add('comment-card-wrap');
        newCardWrap.setAttribute('id', `comment-card-wrap-${this.id}`);

        // Comment card
        let newCard = document.createElement('div');
        newCard.classList.add('comment-card');
        newCard.setAttribute('id', `comment-card-${this.id}`);

        // Username/Timestamp wrap
        let newUserTimeWrap = document.createElement('div');
        newUserTimeWrap.classList.add('username-time-wrap');

        // Username
        let newUsername = document.createElement('p');
        newUsername.classList.add('username');
        newUsername.innerText = this.username;

        // Timestamp
        let newTimestamp = document.createElement('p');
        newTimestamp.classList.add('timestamp');
        newTimestamp.innerText = this.timestamp;

        newUserTimeWrap.appendChild(newUsername);
        newUserTimeWrap.appendChild(newTimestamp);

        newCard.appendChild(newUserTimeWrap);

        // Comment Content
        let newContent = document.createElement('p');
        newContent.classList.add('comment-content')
        newContent.innerText = this.content;
        newCard.appendChild(newContent);

        // Reply Button
        let replyBtn = document.createElement('button');
        replyBtn.classList.add('reply-btn', 'btn');
        replyBtn.setAttribute('id', `reply-btn-${this.id}`);
        replyBtn.setAttribute('onclick', `showReplyForm("reply-form-${this.id}")`);
        replyBtn.textContent = 'Reply';

        // If user is logged in shows Reply Button
        if (localStorage.getItem('loggedIn')) replyBtn.classList.add('active');

        newCard.appendChild(replyBtn);
        newCardWrap.appendChild(newCard);

        // Reply Form
        let replyForm = document.createElement('form');
        replyForm.classList.add('reply-form');
        replyForm.setAttribute('id', `reply-form-${this.id}`);
        replyForm.setAttribute('onsubmit', `addNewComment(event, "${this.id}")`);
        
        // Reply form textarea
        let replyTextarea = document.createElement('textarea');
        replyTextarea.classList.add('textarea-comment');
        replyTextarea.setAttribute('placeholder', 'Say something smart...');
        
        replyForm.appendChild(replyTextarea);

        // Add Comment Button/Error Message wrap
        let addCommentErrorMsgWrap = document.createElement('div');
        addCommentErrorMsgWrap.classList.add('add-comment-msg-wrap');

        // Error Message
        let errorMsg = document.createElement('p');
        errorMsg.classList.add('error-msg');

        addCommentErrorMsgWrap.appendChild(errorMsg);

        // Add Comment Button
        let addCommentBtn = document.createElement('button');
        addCommentBtn.classList.add('btn', 'add-comment-btn');
        addCommentBtn.setAttribute('type', 'submit');
        addCommentBtn.textContent = 'Add Comment';

        addCommentErrorMsgWrap.appendChild(addCommentBtn);

        replyForm.appendChild(addCommentErrorMsgWrap);

        newCardWrap.appendChild(replyForm);

        return newCardWrap;
    }

    appendToParent() {
        if (this.parentId == 0) {
            var parent = document.querySelector(`.comments-wrap`);
            parent.insertBefore(this.createCommentElement(), parent.firstChild);
        } else {
            var parent = document.querySelector(`#comment-card-${this.parentId}`);
            // parent.appendChild(this.createCommentElement());
            insertAfter(parent, this.createCommentElement());
        }

    }

    storeComment() {
        let newComment = {
            "id": this.id,
            "parentId": this.parentId,
            "content": this.content,
            "timestamp": this.timestamp,
            "username": this.username,
            "replies": []
        }

        let storedComments = new StoredComments();
        storedComments.storeNewComment(newComment)
    }
}

class StoredComments {
    constructor() {
        let comments = localStorage.getItem('comments');
        if(comments == null) {
            this.comments = null;
        }
        this.comments = JSON.parse(comments);
    }

    loadComments() {
        let comments = localStorage.getItem('comments');
        if (comments == null) return;

        comments = JSON.parse(comments);
        DFSCreateComments(comments);
    }

    storeNewComment(newComment) {
        if (this.comments == null) { // Creeates new object of comments
            this.comments = [];
            this.comments.push(newComment);
        } else { // Updates currently stored comments
            this.appendComment(this.comments, newComment);
            console.log(this.comments);
    
            localStorage.removeItem('comments');
        }

        localStorage.setItem('comments', JSON.stringify(this.comments));
    }

    appendComment(currComment, newComment) {
        if (newComment.parentId != 0) {
            currComment.forEach(child => {
                let repeats = false;
                if (child.id == currComment.id) repeats = true;
                if (repeats) return;

                let found = false;
                
                if (child.id == newComment.parentId) {
                    child.replies.push(newComment);
                    found = true;
                }    
    
                if (found) {
                    return;
                }
        
                if (child.replies != 0){
                    this.appendComment(child.replies, newComment);
                }
            });
        } else {
            if (this.comments.id == newComment.id) return;
            this.comments.push(newComment);
        } 
        
    }
}

function checkIfLoggedIn() {
    if (localStorage.getItem('loggedIn')) {
        let replyBtns = document.querySelectorAll('.reply-btn');
        replyBtns.forEach(btn => btn.classList.add('active'));
        
        let replyForm = document.querySelector('#reply-form-0');
        replyForm.classList.add('active');

        let notLoggedMsg = document.querySelector('.not-logged-in');
        notLoggedMsg.classList.remove('active');
    }
}


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling.nextSibling);
}

function showReplyForm(formId) {
    let form = document.getElementById(formId);
    form.classList.toggle('active');
}

function addNewComment(e, parentId) {
    e.preventDefault();
    
    let content = document.querySelector(`#reply-form-${parentId} textarea`).value;
    
    if (content == '') return;
    
    checkInapprWords(content).then(found => { 
        if (found != undefined) {
            let errorMsg = document.querySelector(`#reply-form-${parentId} .error-msg`);
            errorMsg.innerText = `Your comment cannot contain the word ${found}.`;
        } else {
            let errorMsgs = document.querySelectorAll('.error-msg');
            errorMsgs.forEach(msg => msg.innerText = '');


            let username = localStorage.getItem('loggedIn');

            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            
            let newComment = new Comment(generateNewId(), parentId, content, time, username);
            newComment.storeComment();
            
            let replyForm = document.querySelector(`#reply-form-${parentId}`);
            if (parentId != 0) replyForm.classList.remove('active');
            replyForm.reset();
        }
    });
    
    
}

function generateNewId() {
   return Date.now().toString(36) + Math.random().toString(36).substring(2);
    
}

async function checkInapprWords(content) {
    const res = await fetch('./data/inappropriate_words.json')
  
    let inappropriateWords = await res.json();

    let foundWord = inappropriateWords.find(word => content.toLowerCase().includes(word.toLowerCase()))
    console.log(foundWord);


    return foundWord;
}

function DFSCreateComments(comments) {
    comments.forEach(child => {
        new Comment(child.id, child.parentId, child.content, child.timestamp, child.username)

        if (child.replies != 0){
            DFSCreateComments(child.replies);
        }
    });
}


new StoredComments().loadComments();
checkIfLoggedIn();
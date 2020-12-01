import {getProject} from './logic.js';
import {createNewProjectForm} from './forms.js';
import {renderProjects, showProject} from './render.js';
import {signIn, signOut} from './firebase.js';

let currentUser = {
    name: '',
    email: '',
};

let userProjects;

const signInOutButton = document.querySelector('.top-bar__sign-in');
const userNameDisplay = document.querySelector('.top-bar__name');
signInOutButton.addEventListener('click', () => {
    let textContent = signInOutButton.innerHTML;
    if (textContent === 'Sign-In with Google') {
        signIn().then(result => {
            currentUser.name = result.user.displayName;
            currentUser.email = result.user.email;
            getUserProjects(currentUser);
            userNameDisplay.innerHTML = `Welcome! ${currentUser.name}`;
            signInOutButton.innerHTML = 'Sign-Out';
        });
    }
    else {
        userProjects.setStorage(currentUser.email);
        signOut();
        currentUser.name = '';
        currentUser.email = '';
        signInOutButton.innerHTML = 'Sign-In with Google';
        getUserProjects(currentUser);
        userNameDisplay.innerHTML = 'Welcome!';
    }
});

const getUserProjects = (user) => {
    let userEmail;
    if (user.email === '') {
        userEmail = 'anonymous';
    } else {
        userEmail = user.email;
    }
    getProject(userEmail).then(projects => {
        userProjects = projects;
        renderProjects(userProjects);
        showProject(userProjects.projectsList[0], projects);
        const newProjectButton = document.querySelector('#new-project');
        newProjectButton.addEventListener('click', () => createNewProjectForm(userProjects));
    });
};

getUserProjects(currentUser);


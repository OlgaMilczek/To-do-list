import {getStoredProject, getNewProject} from './logic.js';
import {createNewProjectForm} from './forms.js';
import {renderProjects, showProject} from './render.js';
import {signIn, signOut} from './firebase.js';

let currentUser = {
    name: '',
    email: '',
};
let userProjects;


// DOM Manipulators 
const newProjectButton = document.querySelector('#new-project');
const signInOutButton = document.querySelector('.top-bar__sign-in');
const userNameDisplay = document.querySelector('.top-bar__name');

// Function for event listener (removing and adding)
const onClick = () => {
    createNewProjectForm(userProjects);
};
const onClose = (e) => {
    e.preventDefault();
    e.returnValue = '';
    userProjects.setStorage(currentUser.email);
};


signInOutButton.addEventListener('click', () => {
    let textContent = signInOutButton.innerHTML;
    if (textContent === 'Sign-In with Google') {
        signIn().then(result => {
            currentUser.name = result.user.displayName;
            currentUser.email = result.user.email;
            getUserProjects(currentUser);
            userNameDisplay.innerHTML = `Welcome! ${currentUser.name}`;
            signInOutButton.innerHTML = 'Sign-Out';
            window.addEventListener('beforeunload', onClose, true);
        });
    }
    else {
        const storage = userProjects.setStorage(currentUser.email);
        console.log(currentUser.email);
        console.log(storage);
        storage.then(() => {
            signOut();
            signInOutButton.innerHTML = 'Sign-In with Google';
            userNameDisplay.innerHTML = 'Welcome!';
            currentUser.name = '';
            currentUser.email = '';
            getUserProjects(currentUser);
        });
    }
    newProjectButton.removeEventListener('click', onClick, true);
});

const getUserProjects = (user) => {
    if (user.email === '') {
        userProjects = getNewProject();
        renderProjects(userProjects);
        showProject(userProjects.projectsList[0], userProjects);
        newProjectButton.addEventListener('click', onClick, true);
    } else {
        userProjects = getStoredProject(user.email).then(projects => {
            console.log(projects);
            userProjects = projects;
            renderProjects(userProjects);
            showProject(userProjects.projectsList[0], userProjects);
            newProjectButton.addEventListener('click', onClick, true);
        });
    }
};

getUserProjects(currentUser);


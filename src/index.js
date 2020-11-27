import {myProjects} from './logic.js';
import {createNewProjectForm} from './forms.js';
import {renderProjects, showProject} from './render.js';

myProjects().then(projects => {
    renderProjects(projects);
    showProject(projects.projectsList[0], projects);
    const newProjectButton = document.querySelector('#new-project');
    newProjectButton.addEventListener('click', () => createNewProjectForm(projects));
});

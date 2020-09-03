import {myProjects} from './logic.js';
import {createNewProjectForm} from './forms.js';
import {renderProjects, showProject} from './render.js'


renderProjects();
showProject(myProjects.projectsList[0]);

const newProjectButton = document.querySelector('#new-project');
newProjectButton.addEventListener('click', createNewProjectForm);

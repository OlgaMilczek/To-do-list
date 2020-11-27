import {TodoItem, Project} from './logic.js';
import {renderProjects, showProject} from './render.js';
import {cancelForm, creatSmallForm, createLargeForm} from './forms-overall.js';
import {appendToContainer} from './DOMmanipulator.js';

function createNewProjectForm(projects) {
    const projectForm = creatSmallForm();
    
    projectForm.addProjectButton.addEventListener('click', () => {
        const projectTitle = projectForm.projectTitleInput.value;
        const projectDescription = projectForm.projectDescriptionInput.value;
        if (projectTitle === '') {
            alert('Enter a project name');
        }
        else {
            const newProject = new Project(projectTitle, projectDescription);
            projects.addProject(newProject);
            console.log(projects);
            renderProjects(projects);
            cancelForm(projectForm.form);
        }
    });

    appendToContainer(projectForm.form, [projectForm.projectTitleLabel, projectForm.projectTitleInput, 
        projectForm.projectDescriptionLabel, projectForm.projectDescriptionInput, 
        projectForm.buttonContainer]);
}

function createToDoForm(project, projects) {
    const toDoForm = createLargeForm();
    
    toDoForm.addToDoButton.addEventListener('click', () => {
        const toDoTitle = toDoForm.toDoTitleInput.value;
        const toDoDescription = toDoForm.toDoDescriptionInput.value;
        const toDoDate = toDoForm.toDoDateInput.value;
        const toDoPriority = toDoForm.priorityInput.value; 
        if (toDoTitle === '') {
            alert ('Enter to do title!');
        }
        else if (toDoDate === '') {
            alert ('Enter to do due date!');
        }
        else {
            const newToDoes = new TodoItem(toDoTitle, toDoDescription, toDoDate, toDoPriority);
            project.addItem(newToDoes);
            cancelForm(toDoForm.form);
            showProject(project, projects);
        }
    });

    appendToContainer(toDoForm.form, [toDoForm.toDoTitleLabel, toDoForm.toDoTitleInput, toDoForm.toDoDescriptionLabel, toDoForm.toDoDescriptionInput, 
        toDoForm.toDoDateLabel, toDoForm.toDoDateInput, toDoForm.priorityLabel, toDoForm.priorityInput, toDoForm.buttonContainer]);  
}

export {createNewProjectForm, createToDoForm}; 
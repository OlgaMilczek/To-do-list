import {cancelForm, creatSmallForm, createLargeForm} from './forms-overall.js'
import {appendToContainer} from './DOMmanipulator.js'

function editProject(project, aftermath) {
    const projectForm = creatSmallForm();

    projectForm.projectTitleInput.value = project.title;
    projectForm.projectDescriptionLabel.textContent = " Project description:";
    projectForm.projectDescriptionInput.textContent = project.description;
    
    projectForm.addProjectButton.textContent = 'Edit project'
    projectForm.addProjectButton.addEventListener('click', () => {
        const projectTitle = projectForm.projectTitleInput.value;
        const projectDescription = projectForm.projectDescriptionInput.value;
        if (projectTitle === '') {
            alert('Enter a project name')
        }
        else {
            project.edit(projectTitle, projectDescription);
            cancelForm(form);
            aftermath();
        }
    });

    appendToContainer(projectForm.form, [projectForm.projectTitleLabel, projectForm.projectTitleInput, 
        projectForm.projectDescriptionLabel, projectForm.projectDescriptionInput, 
        projectForm.buttonContainer]);
}


function editToDo(toDo, aftermath) {
    const toDoForm = createLargeForm();

    toDoForm.toDoTitleInput.value = toDo.title;
    toDoForm.toDoDescriptionInput.textContent = toDo.description;
    toDoForm.toDoDateInput.value = toDo.dueDate;
    toDoForm.priorityInput.value = toDo.priority;

    toDoForm.addToDoButton.textContent = 'Edit to do'
    toDoForm.addToDoButton.addEventListener('click', () => {
        const toDoTitle = toDoForm.toDoTitleInput.value;
        const toDoDescription = toDoForm.toDoDescriptionInput.value;
        const toDoDate = toDoForm.toDoDateInput.value;
        const toDoPriority = toDoForm.priorityInput.value; 
        if (toDoTitle === '') {
            alert ('Enter to do title!');
        }
        else if (toDoDate === '') {
            alert ('Enter to do due date!')
        }
        else {
            toDo.edit(toDoTitle, toDoDescription, toDoDate, toDoPriority);
            cancelForm(form);
            aftermath();
        }
    });
    appendToContainer(toDoForm.form, [toDoForm.toDoTitleLabel, toDoForm.toDoTitleInput, toDoForm.toDoDescriptionLabel, toDoForm.toDoDescriptionInput, 
        toDoForm.toDoDateLabel, toDoForm.toDoDateInput, toDoForm.priorityLabel, toDoForm.priorityInput, toDoForm.buttonContainer]);  
}

export {editProject, editToDo};
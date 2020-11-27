import {createElementWithClasses, createElementWithAttributes, createButton, appendToContainer, creatLabel} from './DOMmanipulator.js';

function toggleOverlay() {
    const overlay = document.querySelector('#overlay');
    overlay.classList.toggle('active');
}

function cancelForm(form) {
    toggleOverlay();
    form.innerHTML = '';
    console.log(form);
    form.classList.toggle('inactive');
}

function activeForm() {
    toggleOverlay();
    const form = document.querySelector('#form');
    form.classList.toggle('inactive');
    return form;
}

function createPriorityInput(){
    const priorityInput = createElementWithAttributes('select', [['name', 'priority-date']]);

    const priorityLow = document.createElement('option');
    priorityLow.textContent = 'Low';
    const priorityNormal = document.createElement('option');
    priorityNormal.textContent = 'Normal';
    const priorityHigh = document.createElement('option');
    priorityHigh.textContent = 'High';

    appendToContainer(priorityInput, [priorityLow, priorityNormal, priorityHigh]);

    return priorityInput;
}

function createCancelButton(form) {
    const cancelButton = createButton(['cancel-button'],'cancel', 'Cancel');
    cancelButton.addEventListener('click', ()=> {
        cancelForm(form);
    });

    return cancelButton;
}

function creatSmallForm() {
    const form = activeForm();

    const projectTitleLabel = creatLabel(['project-form'], 'Project title:');
    const projectTitleInput = createElementWithAttributes('input', [['name', 'Project-title'],
        ['placeholder', 'Enter project title.']]);

    const projectDescriptionLabel = creatLabel(['project-form'], 'Project description:');
    const projectDescriptionInput = createElementWithAttributes('textarea', [['name', 'Project-description'],
        ['placeholder', 'Enter project description.'],
        ['rows', '4'],
        ['cols', '50']]);

    const addProjectButton = createButton(['add-button'],'add-new-project', '+ Add project');

    const cancelProjectButton = createCancelButton(form);

    const buttonAdds = createElementWithClasses('div', ['project-form']);
    const buttonContainer = appendToContainer(buttonAdds,[addProjectButton, cancelProjectButton]);

    return {form, projectTitleLabel, projectTitleInput, projectDescriptionLabel,
        projectDescriptionInput, addProjectButton, cancelProjectButton, buttonContainer};
}

function createLargeForm() {
    const form = activeForm();

    const toDoTitleLabel =  creatLabel(['project-form'], 'To-do title:');
    const toDoTitleInput = createElementWithAttributes('input', [['name', 'To-do-title'],
        ['placeholder', 'Enter to-do title.']]);

    const toDoDescriptionLabel = creatLabel(['project-form'], 'To-do description:');
    const toDoDescriptionInput = createElementWithAttributes('textarea', [['name', 'To-do-description'],
        ['placeholder', 'Enter to-do description.'],
        ['rows', '4'],
        ['cols', '50']]);

    const toDoDateLabel = creatLabel(['project-form'], 'Due date:');
    const toDoDateInput = createElementWithAttributes('input', [['name', 'To-do-date'],
        ['type', 'date']]);

    const priorityLabel = creatLabel(['project-form'], 'Priority:');
    const priorityInput = createPriorityInput();

    const addToDoButton = createButton(['add-button'],'add-new-to-does', '+ Add to does');

    const cancelToDoButton = createCancelButton(form);
    
    const buttonAdds = createElementWithClasses('div', ['project-form']);
    const buttonContainer = appendToContainer(buttonAdds,[addToDoButton, cancelToDoButton]);

    return {form, toDoTitleLabel, toDoTitleInput, toDoDescriptionLabel, 
        toDoDescriptionInput, toDoDateLabel, toDoDateInput, priorityLabel,
        priorityInput, addToDoButton, cancelToDoButton, buttonContainer};

}

export {cancelForm, creatSmallForm, createLargeForm};

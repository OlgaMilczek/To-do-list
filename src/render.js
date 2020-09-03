import {myProjects} from './logic.js';
import {createToDoForm} from './forms.js';
import {editProject, editToDo} from './edit.js';
import {createElementWithClasses, createElementWithAttributes, createButton, appendToContainer} from './DOMmanipulator.js'
import moment from 'moment';

function renderProjects() {
    const container = document.querySelector('.all-projects');
    container.innerHTML = '';
    for (let i in myProjects.projectsList) {
        const currProject = myProjects.projectsList[i];
        const project = createElementWithClasses('div', ['project']);

        const projectName = document.createElement('p');
        projectName.textContent = myProjects.projectsList[i].title;
        projectName.style.cursor = 'pointer';
        projectName.addEventListener('click', () => {
            showProject(currProject);
        })
        const dellButton = createButton(['dellButton'], 'dell-project-button', '✕')
        dellButton.addEventListener('click', () => {
            myProjects.deleteProject(currProject.title);
            renderProjects();
        });
        project.appendChild(projectName);
        project.appendChild(dellButton);
        container.appendChild(project);
    }
}

function showProject(project) {
    const projectInfo = document.querySelector('.projectInfo');
    projectInfo.innerHTML = '';
    const projectTitle = document.createElement('h3');
    projectTitle.textContent = project.title;
    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;
    const editButton = createButton(['Edit-button'], 'edit-project-button', 'Edit')
    editButton.addEventListener('click', ()=> {
        editProject(project, () => {renderProjects(); showProject(project)});
    });
    appendToContainer(projectInfo,[projectTitle, projectDescription, editButton]);

    const newToDoesButton = createButton(['add-button'],'add-new-to-do', '+ Add new to-does')
    newToDoesButton.addEventListener('click', ()=> {
        createToDoForm(project);
    });

    const buttonContainer =  document.querySelector('#add-new-item');
    buttonContainer.innerHTML ='';
    buttonContainer.appendChild(newToDoesButton);

    renderToDoes(project);
}

function renderToDoes(project) {
    const toDoesContainer = document.querySelector('.to-does');
    toDoesContainer.innerHTML = '';
    for (let item in project.taskList){
        const thisToDo = project.taskList[item]
        const itemContainer = createElementWithClasses('div', ['to-do-item', thisToDo.priority]);
        const details = createElementWithClasses('div', ['inline-start']);
        const detailsText = document.createElement('p')
        detailsText.textContent = 'details: ' + thisToDo.description;
        details.appendChild(detailsText);
        const priority = createElementWithClasses('div', ['inline-end']);
        const priorityText = document.createElement('p')
        priorityText.textContent = thisToDo.priority;
        priority.appendChild(priorityText);
        itemContainer.addEventListener('mouseenter', ()=>{
            showDetails(details, priority, itemContainer)
        })
        itemContainer.addEventListener('mouseleave', ()=>{
            hideDetails(details, priority, itemContainer);
        })

        const titleAdds =  createElementWithClasses('div', ['inline-start']);

        const checkbox = createElementWithAttributes('input', [['type', 'checkbox'],]);
        document.createElement('input');
        const title = document.createElement('p');
        title.textContent = thisToDo.title;
        if (thisToDo.done === true) {
            checkbox.checked = true;
            itemContainer.classList.add('done');
            title.style.textDecoration = 'line-through'
        }
        checkbox.addEventListener('click', () => {
            if (checkbox.checked === true) {
                thisToDo.done = true;
                title.style.textDecoration = 'line-through';
            }
            else {
                thisToDo.done = false;
                title.style.textDecoration = 'none';
            }
        });
        const titleContainer = appendToContainer(titleAdds, [checkbox, title]);

        const dateAdd = createElementWithClasses('div', ['inline-end']);

        const date = document.createElement('p');
        const dateText = moment(thisToDo.dueDate).calendar().split(' ')[0];
        date.textContent = dateText;
        const editButton = createButton(['Edit-button'], 'edit-to-do-button', 'Edit')
        editButton.addEventListener('click', ()=> {
            editToDo(thisToDo, () => {
                renderToDoes(project);
            });
        });

        const dellButton = createButton(['dellButton'], 'dell-to-do-button', '✕')
        dellButton.addEventListener('click', () => {
            project.deleteItem(thisToDo.title);
            renderToDoes(project);
        });
        
        const dateContainer = appendToContainer(dateAdd,[date, editButton, dellButton]);

        itemContainer.appendChild(titleContainer);
        itemContainer.appendChild(dateContainer);
        toDoesContainer.appendChild(itemContainer);
    }
}

function showDetails(details, priority, itemContainer) {
    appendToContainer(itemContainer,[details, priority]);
}

function hideDetails(details, priority, itemContainer) {
    itemContainer.removeChild(details);
    itemContainer.removeChild(priority);
}

export {renderProjects, showProject};
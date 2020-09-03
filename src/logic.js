class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
    }

    checkAsDone() {
        this.done = true;
    }

    checkAsUnfinished() {
        this.done = false;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

    edit(newTitle, newDescription, newDueDate, newPriority) {
        this.title = newTitle;
        this.description = newDescription;
        this.dueDate = newDueDate;
        this.priority = newPriority;
    }

};

class Project {
    constructor(title, description) {
        this.title = title;
        this.taskList = [];
        this.description = description;
    }

    addItem(task) {
        this.taskList.push(task);
    }

    deleteItem(taskTitle) {
        this.taskList = this.taskList.filter(task => task.title !== taskTitle);
    }
    edit (newTitle, newDescription) {
        this.title = newTitle;
        this.description = newDescription;
    }
}

class Projects {
    constructor() {
        if (this.checkStorage()) {
            this.projectsList = this.getStorage();
            for (let i in this.projectsList) {
                let project = this.projectsList[i];
                Object.setPrototypeOf(project, Project.prototype);
                for (let j in project.taskList) {
                    let task = project.taskList[j];
                    Object.setPrototypeOf(task, TodoItem.prototype);
                }
            }
        }
        else {
            this.projectsList = [];
            const exampleProject = new Project('Example project', 'This is a project based to-do list created for The Odin Project');
            this.projectsList.push(exampleProject)
        }
    }

    addProject(project) {
        this.projectsList.push(project);
    }

    deleteProject(projectTitle) {
        if (this.projectsList.length === 1) {
            return alert('You can\'t remove only project')
        }
        else {
        this.projectsList = this.projectsList.filter(project => project.title !== projectTitle);
        }
    }

    checkStorage() {
        return !!localStorage.getItem('myProjects');
    }

    setStorage() {
        const oldStorage = localStorage.getItem('myProjects');
        const newStorage = JSON.stringify(this.projectsList);
        if (oldStorage === newStorage)
            return false;
        localStorage.setItem('myProjects', JSON.stringify(this.projectsList));
        return true;
    }

    getStorage() {
        const storedProjects = JSON.parse(localStorage.getItem('myProjects'));
        return storedProjects;
    }
}

const myProjects = new Projects();
window.addEventListener('beforeunload', (e) => {if (myProjects.setStorage()) e.returnValue = '';})

export {TodoItem, Project, myProjects};


import 'firebase/firestore';
import {db, timeStamp} from './firebase';

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
}

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
        this.projectsList = [];
    }

    addProject(project) {
        this.projectsList.push(project);
    }

    deleteProject(projectTitle) {
        if (this.projectsList.length === 1) {
            return alert('You can\'t remove only project');
        } else {
            this.projectsList = this.projectsList.filter(project => project.title !== projectTitle);
        }
    }

    setProjectList(data) {
        this.projectsList = data;
        for (let i in this.projectsList) {
            let project = this.projectsList[i];
            Object.setPrototypeOf(project, Project.prototype);
            for (let j in project.taskList) {
                let task = project.taskList[j];
                Object.setPrototypeOf(task, TodoItem.prototype);
            }
        }
    }

    setStorage(user) {
        if (user === 'anonymous' || user === '') {
            return false;
        } else {
            const newStorage = JSON.stringify(this.projectsList);
            const storage = db.collection('to-does').doc(user).set({
                projectsList: newStorage,
                user: user,
                time: timeStamp(),
            });
            return storage;
        }
    }

    doExampleProject() {
        const exampleProject = new Project('Example project', 'This TO-DO-app is created as a part of The Odin Project curriculum');
        const task = new TodoItem('Sign in to save your progress!', 'If you wish to save your progress Sign-In with Google', new Date(), 'High');
        exampleProject.addItem(task);
        this.projectsList.push(exampleProject);
    }

    async getStorage(user) {
        let document = db.collection('to-does').doc(user);
        const storedData = await document.get();
        return storedData;
    }
}

const getStoredProject = async (user) => {
    let projects = new Projects();
    let stored = await projects.getStorage(user);
    let projectsList = [];
    if (stored.exists) {
        const jsonData = stored.data().projectsList;
        projectsList = JSON.parse(jsonData);
        projects.setProjectList(projectsList);
    } else {
        projects.doExampleProject();
        projects.projectsList[0].taskList[0].checkAsDone();
        const task1 = new TodoItem('Add yours to does', 'Your successfully Sign-In with Google now you can add to does and save your progress', new Date(), 'Normal');
        projects.projectsList[0].addItem(task1);
    }
    return projects;
};

const getNewProject = () => {
    let projects = new Projects();
    projects.doExampleProject();
    return projects;
};

export {TodoItem, Project, getStoredProject, getNewProject};


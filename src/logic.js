import firebase from 'firebase';
import firestore from 'firebase/firestore';

firebase.initializeApp({
    apiKey:  'AIzaSyA2ADHF5WNXej_CP28hu1RX18rd8ZV4ceE',
    authDomain: 'to-do-app-5d572.firebaseapp.com',
    projectId: 'to-do-app-5d572'
});  

var db = firebase.firestore();

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
        }
        else {
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

    checkStorage() {
        //The user need to be add, then check storage should check that user exist and then fetch his data.
        return true;
    }

    setStorage() {
        const newStorage = JSON.stringify(this.projectsList);
        console.log('adding storage');
        db.collection('to-does').add({
            projectsList: newStorage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    }

    getStorage() {
        let stored = db.collection('to-does')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get();
        return stored;
    }
}


const myProjects = async () => {
    let projects = new Projects();
    try {
        let storage = await projects.getStorage();
        storage.forEach((doc) => {
            const jsonData = JSON.parse(doc.data().projectsList);
            projects.setProjectList(jsonData);
        });
    } catch {
        const exampleProject = new Project('Example project', 'This project TO-DO-app is created as a part of The Odin Project curriculum');
        projects.projectsList.push(exampleProject);
    }
    return projects;
};



export {TodoItem, Project, myProjects};


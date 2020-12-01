import 'firebase/firestore';
import {db} from './firebase';

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

    setStorage(user) {
        if (user === 'anonymous') {
            return false;
        } else {
            const newStorage = JSON.stringify(this.projectsList);
            db.collection('to-does').doc(user).set({
                projectsList: newStorage,
                user: user
            }).then(function() {
                console.log('Document successfully written!');
            })
                .catch(function(error) {
                    console.error('Error writing document: ', error);
                });
            return true;
        }
    }

    async getStorage(user) {
        let projectsList = [];
        try {
            let stored = await db.collection('to-does').doc(user).get();
            stored.forEach((doc) => {
                const jsonData = JSON.parse(doc.data().projectsList);
                projectsList = jsonData;
            });
        }
        catch(err) {
            const exampleProject = new Project('Example project', 'This TO-DO-app is created as a part of The Odin Project curriculum');
            const task = new TodoItem('Sign in to save your progress!', 'If you wish to save your progress Sign-In with Google', new Date(), 'High');
            exampleProject.addItem(task);
            if (user !== 'anonymous') {
                task.checkAsDone();
                const task1 = new TodoItem('Add yours to does', 'Your successfully Sign-In with Google now you can add to does and save your progress', new Date(), 'Normal');
                exampleProject.addItem(task1);
            }
            projectsList.push(exampleProject);
        }
        return projectsList;
    }
}


const getProject = async (user) => {
    let projects = new Projects();
    let storedProjectList = await projects.getStorage(user);
    projects.setProjectList(storedProjectList);
    return projects;
};


export {TodoItem, Project, getProject};


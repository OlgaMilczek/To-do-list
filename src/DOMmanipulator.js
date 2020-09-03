function createElementWithClasses(type, classArray) {
    const element = document.createElement(type);
    
    for(let i in classArray){
        
        element.classList.add(classArray[i]);
    }
    return element;
}

function createElementWithAttributes(type, attributesArray) {
    const element = document.createElement(type);
    for (let i in attributesArray) {
        element.setAttribute(attributesArray[i][0], attributesArray[i][1]);
    }
    return element;
}

function createButton(classArray, id, textContent) {
    const button = createElementWithClasses('button', classArray);
    button.setAttribute('id', id);
    button.textContent = textContent;

    return button;

}

function appendToContainer(container, elementsArray) {
    for(let i in elementsArray) {
        container.appendChild(elementsArray[i]);
    }
    return container;
}

function creatLabel(classArray, textContent) {
    const label = createElementWithClasses('label', classArray);
    label.textContent = textContent;

    return label;
}

export {createElementWithClasses, createElementWithAttributes, createButton, appendToContainer, creatLabel};
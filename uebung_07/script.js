function dragstartHandler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.dropEffect = "move";
}

function drophander(ev){
    let zone = searchDropzone(ev.target);
    if(zone != null){
        ev.preventDefault();
        target = document.getElementById(ev.dataTransfer.getData("text/plain"));
        zone.appendChild(target);
        highlightoff(zone);
        styleElement(target, zone);
    }
}

function searchDropzone(element){
    if(element.classList.contains("dropzone")){
        return element;
    }
    if(element === document.body){
        return null;
    }
    return searchDropzone(element.parentElement);
}

function highlighton(element){
    let zone = searchDropzone(element);
    if(zone != null){
        setTimeout(() => zone.classList.add("dragover"), 0);
    }
}

function highlightoff(element){
    let zone = searchDropzone(element);
    if(zone != null){
        zone.classList.remove("dragover");
    }
    if(element.classList.contains("dropzone")){
        element.classList.remove("dragover");
    }
    if(element.classList.contains("draggable") && element.parentElement.classList.contains("dropzone")){
        element.parentElement.classList.remove("dragover");
    }
}

function addListeners(element){
    element.addEventListener("dragstart", dragstartHandler);
    element.addEventListener("dragover",(ev) => ev.preventDefault());
    element.addEventListener("drop",drophander); 
    element.addEventListener("dragenter", (ev) => highlighton(ev.target));
    element.addEventListener("dragleave",(ev) => highlightoff(ev.target)); 
}

function deleteTrash(){
    let trash = document.getElementById("trash");
    while (trash.firstChild) {
        trash.removeChild(trash.lastChild);
    }
}

function styleElement(element, parent){
    switch(parent.id){
        case "done": case "trash":
            element.style.textDecoration =  "line-through";
            break;
        default:
            element.style.textDecoration = "none";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const dragelements = document.getElementsByClassName("draggable");
    console.log(dragelements);
    for(let i = 0; i < dragelements.length; i++){
        addListeners(dragelements[i]);
    }

    const dropzones = document.getElementsByClassName("dropzone");
    for(let i = 0; i < dropzones.length; i++){
        dropzones[i].addEventListener("dragover",(ev) => ev.preventDefault());
        dropzones[i].addEventListener("drop",drophander); 
        dropzones[i].addEventListener("dragenter", (ev) => highlighton(ev.target));
        dropzones[i].addEventListener("dragleave",(ev) => highlightoff(ev.target));
    }

    document.getElementById("addtask").onclick = genTask;
    document.getElementById("newtask").addEventListener("keypress", (ev) => {if(ev.key==="Enter"){genTask();}})
    document.getElementById("delete").onclick = deleteTrash;
});

function editAufgabe(element){
    let task = prompt("Aufgabe:", element.firstChild.innerHTML);
    element.firstChild.innerHTML = task;
}

let counter = 0;

function createAufgabe(task, color){
    let newElement = document.createElement("div");
    newElement.draggable = true;
    newElement.classList.add("draggable");
    newElement.classList.add("task");
    newElement.id = "aufg" + counter++;
    newElement.style.backgroundColor = color.value;
    addListeners(newElement);

    let p = document.createElement("p");
    p.innerHTML = task;
    newElement.appendChild(p);

    let editButton = document.createElement("button");
    editButton.innerHTML = "bearbeiten";
    editButton.onclick = () => editAufgabe(newElement);
    newElement.appendChild(editButton);

    let colorButton = document.createElement("input");
    colorButton.type = "color";
    colorButton.value = color.value;
    colorButton.onchange = () => newElement.style.backgroundColor = colorButton.value;
    newElement.appendChild(colorButton);
    return newElement;
}

function genTask(){
    let input = document.getElementById("newtask");
    let color = document.getElementById("color");
    let task = input.value;
    if(input.value === null || input.value == ""){
        return;
    }
    input.value = "";
    
    let todo = document.getElementById("todo");
    todo.appendChild(createAufgabe(task, color));
}
const webworker = new Worker("berechnung.js");
webworker.onmessage = (e) => {
    document.getElementById("out").value = e.data;
    console.log("message recieved");
}


let selectionButton = document.getElementById("selection");
let selectionOut = document.getElementById("selectionout");

function afterstop(e){
    selectionButton.value = "Sortiert in " + e.data + "ms!";
    selectionButton.disabled = false;
}

const selectionworker = new Worker("selectionsort.js");
selectionworker.onmessage = afterstop;

selectionButton.onclick = () => {
    selectionworker.postMessage(selectionOut.value);
    selectionButton.disabled = true;
}


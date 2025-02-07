let form = document.getElementById("form");
let inputs = form.getElementsByTagName("input");

document.getElementById("submit").onclick = (event) => {
    event.preventDefault();
    const map = new Map();
    let starttime = Date.now();

    for(let i = 0; i < inputs.length; i++){
        removeHighlight(inputs[i]);
        if(inputs[i].type == "checkbox"){
            map.set(inputs[i].id, inputs[i].checked);
        }else{
            map.set(inputs[i].id, inputs[i].value);   
        }
    }

    let ck = !checkValues(map)

    let time = Date.now() - starttime;
    console.log(time + "ms");

    if(ck){
        let msg = "Werte: \n";
        map.keys().forEach(element => {
            msg += element + ": " + map.get(element) + "\n";
        });
        alert(msg);
    }
}

function removeHighlight(el){
    el.style.borderColor = "";
}

function highlightProblem(id, nachricht){
    let el = document.getElementById(id);
    el.style.borderColor = "red";
    el.value = "";
    el.placeholder = nachricht;
}

function checkValues(map){
    let problem = false;
    if(map.get("name") == ""){
        highlightProblem("name", "Plichtfeld");
        problem = true;
    }
    let regex = /[\w\-\.]+@([\w-]+\.)+[\w-]{2,}/;
    if(!regex.test(map.get("email"))){
        highlightProblem("email", "Falsches Format");
        problem = true;
    }

    if(map.get("pw1").length < 8){
        highlightProblem("pw1", "Passwort zu Kurz");
        problem = true;
    }

    if(map.get("pw1") != map.get("pw2")){
        highlightProblem("pw2", "Passwörter stimmen nicht überein");
        problem = true;
    }

    if(map.get("bdate") == ""){
        highlightProblem("bdate", "Plichtfeld");
        problem = true;
    }

    if(map.get("land") == ""){
        highlightProblem("land", "Plichtfeld");
        problem = true;
    }

    if(map.get("condition") === false){
        highlightProblem("condition", "");
        problem = true;
    }
    return problem;
}

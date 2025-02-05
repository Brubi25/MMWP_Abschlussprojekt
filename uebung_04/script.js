//Aufgabe 1
let feld = document.getElementById("textfeld");
feld.onclick = changeText;

async function changeText(){
    const url = "https://dinoipsum.com/api/?format=text";
    try{
        const response = await fetch(url);
        if(!response.ok){
            console.log(response.status)
        }

        let string = await response.text();
        let wordarray = string.split(" ");
        feld.value = wordarray.at(Math.floor(Math.random * wordarray.length));
        feld.select();
    }catch(e){
        console.log(e.messagge);
    }
}

//Aufgabe 2
class Person{
    #age;
    #name;

    constructor(age, name){
        this.#age = age;
        this.#name = name;
    }
        
    static genPerson(){
        let name = document.getElementById("name").value;
        let alter = document.getElementById("alter").value;
        return new Person(alter, name);
    }

    getName(){
        return this.#name;
    }

    getAlter(){
        return this.#age;
    }
}

function logPerson(){
    let person = Person.genPerson();
    let p = document.getElementById("output");
    p.innerHTML += person.getName() + " (" + person.getAlter() + ")<br>";
}

document.getElementById("button").onclick = logPerson;

//Aufgabe 3
function toggelPic(){
    let pic = document.getElementById("img");
    pic.style.display = (pic.style.display == "none") ? "inline" : "none";
}

document.getElementById("picbutton").onclick = toggelPic;


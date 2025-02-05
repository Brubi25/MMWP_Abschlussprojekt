let xhttp = new XMLHttpRequest();
xhttp.open("GET", "ajax_info.txt", true);
xhttp.onloadend = () => {
    document.body.innerHTML += xhttp.responseText;
};
xhttp.send();
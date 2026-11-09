document.addEventListener("keydown", function(e) {
    if(e.keyCode == 27) {
        window.history.back();
    }
});

var lang = navigator.userAgent.split("-")[1];

switch(lang) {
    case "bg":
    case "ru":
        document.body.style.fontFamily = "ArialCyrillic";
        if(typeof updates != "undefined") updates.style.fontFamily = "ArialCyrillic";
        if(typeof footer != "undefined") footer.style.fontSize = "120%";
        break;
    case "el":
        document.body.style.fontFamily = "Arial";
}

function quoicouSend(lol) {
    window.chrome.webview.postMessage(lol);
}

if(location.href.endsWith("settings.html")) {
    fetch("https://dindegdps.localhost/get/settings")
        .then(response => response.json())
        .then(settings => {
            document.getElementById("cupdates").checked = settings.cupdates;
            document.getElementById("clauncher").checked = settings.clauncher;
            document.getElementById("uchannel").value = settings.uchannel;
            document.getElementById("lang").value = settings.lang;
            document.getElementById("sync").checked = settings.sync;
            document.getElementById("mbpos").value = settings.barPos;
            document.body.style.color = settings.color;
        });
} else {
    fetch("https://dindegdps.localhost/get/color")
        .then(response => response.text())
        .then(color => {
            document.body.style.color = color;
        });
}

document.getElementById("gdps").style.display = "none";
document.getElementById("launcher").style.display = "none";
let last = "updates";

function language() {
    var go = document.getElementById('lang').value;
    quoicouSend(`lang://${go}`);
}

function setpos() {
    var rot = document.getElementById('mbpos').value;
    quoicouSend(`rot://${rot}`);
}

function applyupdcheck() {
    var upd = document.getElementById('cupdates').checked;
    var channel = document.getElementById('uchannel').value;
    quoicouSend(`updates://${channel}||${!upd}`);
}

function applycloselauncher() {
    var choice = document.getElementById('clauncher').checked;
    quoicouSend(`cl://${choice}`);
}

function load(page) {
    document.getElementById(last).style.display = "none";
    last = page;
    document.getElementById(page).style.display = "";
}

function music(url = document.getElementById("mlurl").value) {
    var wokisme = prompt(phr.destText);
    if(!wokisme) return;
    if(tesla.files[0]) {
        return processFile(wokisme);
    }
    if(url == "" || !url.startsWith("https://")) return;
    url = url.replace("https://", "music://");
    url = url + "||" + wokisme;
    quoicouSend(url);
}

var sreset = () => { if(confirm(phr.srResetText)) quoicouSend("reset") }
var cgdps = () => { if(confirm(phr.cgdpsText)) quoicouSend("cgdps") }

if(window.location.search) {
    var url = window.location.search.replace("?", "");
    history.pushState({}, null, location.href.split("&")[0]);
    if(confirm(phr.musicConfirm)) music(url);
}
    
function processFile(gdps) {
            const reader = new FileReader();
            reader.onload = () => {
                chrome.webview.postMessage(reader.result + '||' + gdps);
            };
            reader.readAsDataURL(tesla.files[0]);
}
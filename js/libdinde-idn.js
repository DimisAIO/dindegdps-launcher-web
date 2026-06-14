function quoicouSend(lol) {
    window.chrome.webview.postMessage(lol);
}

// Does anyone know a better way of handling this?
// i don't
quoicouSend("uquery");
quoicouSend("SetColor");
document.getElementById("gdps").style.display = "none";
document.getElementById("launcher").style.display = "none";
let last = "updates";

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
    if(page == "updates") quoicouSend("uquery");
}

function music() {
    var url = document.getElementById("mlurl").value;
    if(url == "" || !url.startsWith("https://")) return;
    var wokisme = prompt("Pilih destinasi folder GDPS (gd20, gd21, gd22, ...)");
    if(!wokisme) return;
    url = url.replace("https://", "music://");
    url = url + "||" + wokisme;
    quoicouSend(url);
}

var sreset = () => { if(confirm("Apakah kamu YAKIN mau mengembalikan semua pengaturan ke semula? Aksi ini TIDAK BISA DIUBAH KEMBALI!\nDimisAIO tidak akan bertanggung jawab atas hal tersebut.")) quoicouSend("reset") }
var cgdps = () => { if(confirm("Dengan menyalakan opsi ini, protokol dgdps:// akan dinyalakan. DimisAIO tidak akan bertanggung jawab atas segala kerusakan yang mungkin terjadi dari pilihan tersebut.\nApakah kamu mau mengaktifkannya?")) quoicouSend("cgdps") }
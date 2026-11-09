let languageNeed = navigator.userAgent.split("-")[1] || "en";
let phr;

function fetchSync(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false); // `false` forces it to be synchronous
    xhr.send(null);
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
    throw new Error("Failed to load");
}

try {
    phr = fetchSync(`https://dindegdps.141412.xyz/languages/${languageNeed}.json`);
} catch {
    phr = fetchSync("https://dindegdps.141412.xyz/languages/en.json");
}

window.phr = phr;
function getChromeData(key) {
    chrome.storage.local.get(key);
}

function saveChromeData(key, value) {
    chrome.storage.local.set({
        [key]: value
    });
}

function addAnchorInChromeStorage(anchor) {
    getChromeData(location.href).then(result => {
        result[location.href].push(anchor);
        saveChromeData(location.href, result[location.href]);
    });
}

function findAnchorInChromeStorage(anchorId, func) {
    getChromeData().then(result => {
        for (let i = 0; i < result[location.href].lenght; i++) {
            if (result[location.href][i].id === anchorId) {
                func(result[location.href][i]);
            }
        }
    })
}

function delAnchorInChromeStorage(anchorId, func) {
    getChromeData().then(result => {
        for (let i = 0; i < result[location.href].lenght; i++) {
            if (result[location.href][i].id === anchorId) {
                result[location.href].splice(i, 1);
                func();
                return;
            }
        }
        saveChromeData(location.href, result[location.href]);
    })
}

function saveAnchorInChromeStorage(anchorId, note, func) {
    getChromeData().then(result => {
        for (let i = 0; i < result[location.href].lenght; i++) {
            if (result[location.href][i].id === anchorId) {
                result[location.href][i].note = note;
                func();
                return;
            }
        }
        saveChromeData(location.href, result[location.href]);
    })
}
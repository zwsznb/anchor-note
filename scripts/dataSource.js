function getChromeData(key) {
    return chrome.storage.local.get(key);
}

function saveChromeData(key, value) {
    chrome.storage.local.set({
        [key]: value
    }).then(result => console.log('save data', value));
}

function addAnchorInChromeStorage(anchor) {
    getChromeData(location.href).then(result => {
        result[location.href].push(anchor);
        saveChromeData(location.href, result[location.href]);
    });
}

function getAnchorCountInChromeStorage(func) {
    getChromeData(location.href).then(result => {
        func(result[location.href].length);
    });
}

function findAnchorInChromeStorage(anchorId, func) {
    getChromeData(location.href).then(result => {
        for (let i = 0; i < result[location.href].length; i++) {
            if (result[location.href][i].id === anchorId) {
                func(result[location.href][i]);
                break;
            }
        }
    })
}

function delAnchorInChromeStorage(anchorId, func) {
    getChromeData(location.href).then(result => {
        for (let i = 0; i < result[location.href].length; i++) {
            if (result[location.href][i].id === anchorId) {
                result[location.href].splice(i, 1);
                func();
                break;
            }
        }
        saveChromeData(location.href, result[location.href]);
    })
}

function saveAnchorInChromeStorage(anchorId, note, func) {
    getChromeData(location.href).then(result => {
        console.log(result[location.href], anchorId);
        for (let i = 0; i < result[location.href].length; i++) {
            if (result[location.href][i].id === anchorId) {
                result[location.href][i].note = note;
                func();
                break;
            }
        }
        saveChromeData(location.href, result[location.href]);
    })
}
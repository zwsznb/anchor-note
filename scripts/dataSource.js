function getChromeData(key) {
    return chrome.storage.local.get(key);
}

function saveChromeData(key, value) {
    chrome.storage.local.set({
        [key]: value
    }).then(result => console.log('save data', value));
}

function addAnchorInChromeStorage(anchor) {
    getChromeData(getUrl()).then(result => {
        result[getUrl()].push(anchor);
        saveChromeData(getUrl(), result[getUrl()]);
    });
}

function getAnchorCountInChromeStorage(func) {
    getChromeData(getUrl()).then(result => {
        func(result[getUrl()].length);
    });
}

function findAnchorInChromeStorage(anchorId, func) {
    getChromeData(getUrl()).then(result => {
        for (let i = 0; i < result[getUrl()].length; i++) {
            if (result[getUrl()][i].id === anchorId) {
                func(result[getUrl()][i]);
                break;
            }
        }
    })
}

function delAnchorInChromeStorage(anchorId, func) {
    getChromeData(getUrl()).then(result => {
        for (let i = 0; i < result[getUrl()].length; i++) {
            if (result[getUrl()][i].id === anchorId) {
                result[getUrl()].splice(i, 1);
                func();
                break;
            }
        }
        saveChromeData(getUrl(), result[getUrl()]);
    })
}

function saveAnchorInChromeStorage(anchorId, note, func) {
    getChromeData(getUrl()).then(result => {
        for (let i = 0; i < result[getUrl()].length; i++) {
            if (result[getUrl()][i].id === anchorId) {
                result[getUrl()][i].note = note;
                func();
                break;
            }
        }
        saveChromeData(getUrl(), result[getUrl()]);
    })
}

function getUrl() {
    return location.origin + location.pathname;
}
function saveData(value) {
    getChromeData().then(result => {
        result.anchorData.push(value);
        saveChromeData(result.anchorData);
    });
}

function getChromeData() {
    return chrome.storage.local.get("anchorData");
}

function saveChromeData(value) {
    chrome.storage.local.set({ anchorData: value }).then(() => {
        console.log(value);
    });
}
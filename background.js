chrome.action.onClicked.addListener(async(tab) => {
    chrome.storage.local.get([tab.url]).then(result => {
        if (!result[tab.url]) {
            chrome.storage.local.set({
                [tab.url]: []
            }).then(() => {
                console.log("init data");
            });
        }
    });

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/scripts/dataSource.js", "/scripts/anchor.js", "/scripts/note.js"]
    }, () => {})
    await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["/css/common.css"]
    });

})
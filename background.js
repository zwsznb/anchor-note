chrome.action.onClicked.addListener(async(tab) => {
    chrome.storage.local.get([tab.url]).then(result => {
        if (!result[tab.url]) {
            chrome.storage.local.set({
                [tab.url]: []
            }).then(() => {
                console.log("init data");
            });
        } else {
            //TODO 初始化所有的锚点

        }
    });

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/scripts/anchor.js", "/scripts/dataSource.js", "/scripts/note.js"]
    }, () => {})
    await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["/css/common.css"]
    });

})
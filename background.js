chrome.action.onClicked.addListener(async (tab) => {
    let url = '';
    if (tab.url.includes('#')) {
        url = tab.url.split('#')[0];
    } else {
        url = tab.url;
    }
    chrome.storage.local.get([url]).then(result => {
        if (!result[url]) {
            chrome.storage.local.set({
                [url]: []
            }).then(() => {
                console.log("init data");
            });
        }
    });

    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/scripts/dataSource.js", "/scripts/anchor.js", "/scripts/note.js"]
    }, () => { })
    await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["/css/common.css"]
    });

})
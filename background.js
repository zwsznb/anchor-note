let active_url = [];
chrome.action.onClicked.addListener(async (tab) => {
    let url = getUrl(tab);
    if (active_url.includes(url)) {
        return;
    } else {
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
        active_url.push(url);
    }
})

function getUrl(tab) {
    let url = '';
    if (tab.url.includes('#')) {
        url = tab.url.split('#')[0];
    } else {
        url = tab.url;
    }
    return url;
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    for (let i = 0; i < active_url.length; i++) {
        if (getUrl(tab) === active_url[i]) {
            active_url.splice(i, 1);
        }
    }
})
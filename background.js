async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.action.onClicked.addListener(async(tab) => {
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/scripts/anchor.js"]
    }, () => {})
    await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["/css/common.css"]
    });

})
async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
chrome.runtime.onInstalled.addListener((details) => {
    chrome.storage.local.set({ anchorData: [] }).then(() => {
        console.log("init data");
    });
})
chrome.action.onClicked.addListener(async(tab) => {
    await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/scripts/anchor.js", "/scripts/dataSource.js"]
    }, () => {})
    await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ["/css/common.css"]
    });

})
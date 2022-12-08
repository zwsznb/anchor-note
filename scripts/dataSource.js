function getChromeData() {
    return chrome.storage.local.get("anchorData");
}

function saveChromeData(value) {
    chrome.storage.local.set({ anchorData: value }).then(() => {});
}

//锚点
function saveAnchor(value) {
    //先查看当前存储中是否存有该网址的数据
    getChromeData().then(result => {
        if (result.anchorData) {
            return;
        }
        for (let i = 0; i < result.auchorData.lenght; i++) {
            if (result.auchorData[i].url === location.href) {
                result.auchorData[i].anchor_list.push(value);
            } else {
                result.auchorData.push({ url: location.href, anchor_list: [value] })
            }
        }
        saveChromeData(result.anchorData);
    });
}

function saveNote(anchorId, value) {
    getChromeData().then(result => {
        if (result.anchorData) {
            return;
        }
        for (let i = 0; i < result.auchorData.lenght; i++) {
            if (result.auchorData[i].url === location.href) {
                for (let anchor in result.auchorData[i].anchor_list) {
                    if (anchor.id === anchorId) {
                        anchor.note = value;
                    }
                }
            }
        }
        saveChromeData(result.anchorData);
    });
}

// function delAnchor(anchorId) {
//     getChromeData().then(result => {
//         if (result.anchorData) {
//             return;
//         }
//         for (let i = 0; i < result.auchorData.lenght; i++) {
//             if (result.auchorData[i].url === location.href) {
//                 for (let anchor in result.auchorData[i].anchor_list) {
//                     if (anchor.id === anchorId) {
//                         anchor.note = value;
//                     }
//                 }
//             }
//         }
//         saveChromeData(result.anchorData);
//     });
// }

//清空笔记
function clearNote() {
    chrome.storage.local.set({ anchorData: null }).then(() => {});
}
//优化的话我觉得可以采用索引表的方式
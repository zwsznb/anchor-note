console.log("插件启动");
let body = document.getElementsByTagName('body')[0];
let add_button = document.createElement('div');
let symbol = document.createElement('span');
let anchor_list = [];
symbol.innerText = '+';
add_button.appendChild(symbol);
add_button.className += ' anchor_add_button';
body.appendChild(add_button);
add_button.onclick = () => {
    console.log("添加锚点");
    //添加锚点或者连带笔记，还是先添加锚点后添加笔记？
    add_anchor();
    getCurrentTab().then(result => console.log(result));
};


//暂时未算滚动条的宽度
function add_anchor() {
    //获取当前滚动条位置
    let scroll_height = document.body.scrollTop || document.documentElement.scrollTop;
    let { anchor, anchor_node } = createAnchor(scroll_height);
    body.append(anchor);
    anchor_list.push(anchor_node);
}

function createAnchor(height) {
    let anchor = document.createElement("div");
    //持久化存储,存取锚点用百分比,body.offsetHeight
    let ratio = height / getPageHeight();
    anchor.className += ' anchor';
    anchor.id = `anchor${anchor_list.length}`;
    anchor.style.top = `${window.innerHeight*ratio}px`;
    anchor.onclick = function() {
        let anchor_tmp = findAnchor(this.id);
        scrollToAnchor(anchor_tmp);
    }
    return {
        anchor: anchor,
        anchor_node: {
            id: anchor.id,
            top_percent: ratio,
            note: ""
        }
    }
}


function findAnchor(id) {
    let anchor_tmp = null;
    for (let i = 0; i < anchor_list.length; i++) {
        if (anchor_list[i].id === id) {
            anchor_tmp = anchor_list[i];
            break;
        }
    }
    return anchor_tmp;
}

function getPageHeight() {
    let page = (document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
    return page.offsetHeight;
}

//滚动条滚动
function scrollToAnchor(anchor) {
    scrollTo(0, anchor.top_percent * getPageHeight());
}

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
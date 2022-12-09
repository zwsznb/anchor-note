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
};
body.onclick = () => {
    note.style.display = 'none';
};

//暂时未算滚动条的宽度
function add_anchor() {
    //获取当前滚动条位置
    let scroll_height = document.body.scrollTop || document.documentElement.scrollTop;
    let { anchor, anchor_node } = createAnchor(scroll_height);
    body.append(anchor);
    addAnchorInChromeStorage(anchor_node);
}

function createAnchor(height) {
    let anchor = document.createElement("div");
    //持久化存储,存取锚点用百分比,body.offsetHeight
    let ratio = height / getPageHeight();
    anchor.className += ' anchor';
    //TODO 这是个bug，待修复
    anchor.id = `anchor${getAllAnchorCount()}`;
    anchor.style.top = `${window.innerHeight*ratio}px`;
    anchor.onclick = function(e) {
        stopProp(e);
        scrollToAnchor(this);
    }
    anchor.onmouseover = function() {
        note.style.display = 'block';
        note.setAttribute('data-id', this.id);
        findAnchorInChromeStorage(this.id, (anchor) => {
            note_content_block.innerText = anchor.note === '' ? "添加笔记" : anchor.note;
        })
    };
    anchor.setAttribute('data-ratio', ratio);


    return {
        anchor: anchor,
        anchor_node: {
            id: anchor.id,
            top_percent: ratio,
            note: ""
        }
    }
}


function getAllAnchorCount() {
    return document.getElementsByClassName('anchor').length;
}


function getPageHeight() {
    let page = (document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
    return page.offsetHeight;
}

//滚动条滚动
function scrollToAnchor(anchor) {
    scrollTo(0, anchor.getAttribute('data-ratio') * getPageHeight());
}
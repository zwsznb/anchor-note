console.log("插件启动");
let body = document.getElementsByTagName('body')[0];
let add_button = document.createElement('div');
let symbol = document.createElement('span');
let anchor_list = [];
getChromeData(result => {
    console.log(result);
});
getAnchorCountInChromeStorage((count) => {
    if (count === 0) {
        symbol.innerText = '+';
        return;
    }
    symbol.innerText = 'Re';
});

add_button.appendChild(symbol);
add_button.className += ' anchor_add_button';
body.appendChild(add_button);
add_button.onclick = () => {
    if (symbol.textContent === '+') {
        console.log("添加锚点");
        //添加锚点
        addAnchor();
    } else {
        //载入之前的数据
        initAnchor();
        symbol.innerText = '+';
    }
};
body.onclick = () => {
    note.style.display = 'none';
};

//暂时未算滚动条的宽度
function addAnchor() {
    //获取当前滚动条位置
    let scroll_height = document.body.scrollTop || document.documentElement.scrollTop;
    let { anchor, anchor_node } = createAnchor(scroll_height);
    body.appendChild(anchor);
    addAnchorInChromeStorage(anchor_node);
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


function initAnchor() {
    getChromeData(location.href).then(result => {
        for (let i = 0; i < result[location.href].length; i++) {
            let anchor = document.createElement("div");
            let anchor_data = result[location.href][i];
            //持久化存储,存取锚点用百分比,body.offsetHeight
            anchor.className += ' anchor';
            anchor.id = anchor_data.id;
            anchor.style.top = `${window.innerHeight * anchor_data.top_percent}px`;
            addEventForAnchor(anchor);
            anchor.setAttribute('data-ratio', anchor_data.top_percent);
            body.appendChild(anchor);
        }

    });
}

function addEventForAnchor(anchor) {
    anchor.onclick = function (e) {
        stopProp(e);
        scrollToAnchor(this);
    }
    anchor.onmouseover = function () {
        note.style.display = 'block';
        note.setAttribute('data-id', this.id);
        findAnchorInChromeStorage(this.id, (anchor) => {
            note_content_block.innerText = anchor.note === '' ? "add something..." : anchor.note;
        })
    };
}

function createAnchor(height) {
    let anchor = document.createElement("div");
    //持久化存储,存取锚点用百分比,body.offsetHeight
    let ratio = height / getPageHeight();
    anchor.className += ' anchor';
    anchor.id = `anchor${guid()}`;
    anchor.style.top = `${window.innerHeight * ratio}px`;
    addEventForAnchor(anchor);
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



function getPageHeight() {
    let page = (document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
    return page.offsetHeight;
}

//滚动条滚动
function scrollToAnchor(anchor) {
    scrollTo(0, anchor.getAttribute('data-ratio') * getPageHeight());
}
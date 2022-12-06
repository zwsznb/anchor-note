console.log("插件启动");
let body = document.getElementsByTagName('body')[0];
let add_button = document.createElement('div');
let symbol = document.createElement('span');
symbol.innerText = '+';
add_button.appendChild(symbol);
add_button.className += ' anchor_add_button';
body.appendChild(add_button);
add_button.onclick = () => {
    console.log("添加锚点");
    //获取当前滚动条位置
    let scroll_height = document.body.scrollTop || document.documentElement.scrollTop;
    add_anchor(scroll_height)
        //添加锚点或者连带笔记，还是先添加锚点后添加笔记？
        //持久化存储,存取锚点用百分比,body.offsetHeight
};


//暂时未算滚动条的宽度
function add_anchor(height) {
    let anchor = document.createElement("div");
    let page = (document.compatMode && document.compatMode == 'CSS1Compat') ? document.documentElement : document.body;
    let ratio = height / page.offsetHeight;
    anchor.className += ' anchor'
    anchor.style.top = `${window.innerHeight*ratio}px`;
    body.append(anchor);
}
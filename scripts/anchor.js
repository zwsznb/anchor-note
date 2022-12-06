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



function add_anchor(height) {
    console.log(height);
    let anchor = document.createElement("div");
    anchor.className += ' anchor'
    anchor.style.top = `${height}px`;
    body.append(anchor);
}
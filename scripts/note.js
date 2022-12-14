let note = document.createElement("div");
let note_content_block = document.createElement("div");
let box = document.createElement("div");
box.className += 'button_box';


note_content_block.className += 'note_content';
note.appendChild(note_content_block);
note.className += 'note';
note.style.height = `${window.innerHeight * 0.3}px`;
note.onclick = (e) => {
    stopProp(e);
}
let edit = createButton('edit_color', 'edit');
let del = createButton('delete_color', 'del');
let save = createButton('save_color', 'save');
edit.onclick = function () {
    if (note_content_block.textContent === 'add something...') {
        note_content_block.innerText = '';
    }
    note_content_block.contentEditable = true;
};
del.onclick = function () {
    console.log("删除");
    //删除锚点数据
    delAnchorInChromeStorage(note.getAttribute('data-id'), () => {
        //移除锚点
        body.removeChild(document.getElementById(note.getAttribute('data-id')));
        //关闭笔记弹窗
        note.style.display = 'none';
    });

};
save.onclick = function () {
    note_content_block.contentEditable = false;
    saveAnchorInChromeStorage(note.getAttribute('data-id'), note_content_block.innerHTML, () => { });
};


box.appendChild(edit);
box.appendChild(del);
box.appendChild(save);
note.appendChild(box);

body.appendChild(note);


//阻止冒泡
function stopProp(e) {
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
}

function createButton(className, text) {
    let button = document.createElement("div");
    let span = document.createElement('span');
    span.innerText = text;
    button.className += `common_button ${className}`;
    button.appendChild(span);
    return button;
}
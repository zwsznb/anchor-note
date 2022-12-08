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
edit.onclick = function() {
    if (note_content_block.textContent === '添加笔记') {
        note_content_block.innerText = '';
    }
    note_content_block.contentEditable = true;
};
del.onclick = function() {
    console.log("删除");
    //删除锚点数据
    //移除锚点
    //关闭笔记弹窗
};
save.onclick = function() {
    note_content_block.contentEditable = false;
    for (let i in anchor_list) {
        if (anchor_list[i].id === note.getAttribute('data-id')) {
            anchor_list[i].note = note_content_block.textContent;
        }
    }
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
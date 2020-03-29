const column = require('../src/column.js')
const task = require('../src/task.js')
const save = require('../stub/index.js')
const expect = require('chai').expect
const assert = require('chai').assert

const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

const newColumn = `<div class="column" data-column-id="193" draggable="true"><div class="column-header"><div class="title edit">Done</div><span class="list-actions"><span>...</span></span></div><div class="list-tasks"></div><button class="add-task">Добавить задачу</button></div>`

const dom = new JSDOM(`<!DOCTYPE html><div class="column" data-column-id="12" draggable="true">
<div class="column-header"><div class="title edit">hard skills</div><span class="list-actions">
<span>...</span></span></div><div class="list-tasks"><div class="task" data-task-id="1" draggable="true">
<div class="task-text edit" contenteditable="true">release strategy</div><div></div>
</div><div class="task" data-task-id="3" draggable="true">
<div class="task-text edit" contenteditable="true">logging</div><div></div></div><div class="task" data-task-id="5" draggable="true">
<div class="task-text edit" contenteditable="true">scrum/agile</div><div></div></div><div class="task" data-task-id="7" draggable="true">
<div class="task-text edit" contenteditable="true">code standards</div><div></div></div></div>
<button class="add-task">Добавить задачу</button></div>
<div class="column" data-column-id="13" draggable="true">
<div class="column-header"><div class="title edit">soft skills</div><span class="list-actions"><span>...</span>
</span></div><div class="list-tasks"><div class="task" data-task-id="21" draggable="true">
<div class="task-text edit" contenteditable="true">negotiation skills</div><div></div>
</div><div class="task" data-task-id="413" draggable="true">
<div class="task-text edit" contenteditable="true">team work</div><div></div>
</div><div class="task" data-task-id="55" draggable="true">
<div class="task-text edit" contenteditable="true">stress tolerance</div><div></div></div>
</div><button class="add-task">Добавить задачу</button></div>`);

const domForEdit = new JSDOM(`<!DOCTYPE html><div class="column" 
data-column-id="193" draggable="true"><div class="column-header">
<div class="title edit" tabindex="1000">Done</div><span class="list-actions">
<span>...</span></span></div><div class="list-tasks">
</div><button class="add-task">Добавить задачу</button></div>`);

const domForEditBlur = new JSDOM(`<!DOCTYPE html><div class="column" 
data-column-id="193" draggable="true"><div class="column-header">
<div class="title edit" tabindex="1000">Done</div><span class="list-actions">
<span>...</span></span></div><div class="list-tasks">
</div><button class="add-task">Добавить задачу</button></div>`);

const domColumn = new JSDOM(`<!DOCTYPE html><div class="column" data-column-id="192" draggable="true">
<div class="column-header"><div class="title edit">english</div>
<span class="list-actions"><span>...</span></span></div><div class="list-tasks">
<div class="task" data-task-id="213" draggable="true">
<div class="task-text edit" contenteditable="true">english writing</div>
<div></div></div><div class="task" data-task-id="6" draggable="true">
<div class="task-text edit" contenteditable="true">english speaking</div>
<div></div></div></div><button class="add-task">Добавить задачу</button></div>`)

let idTasks = dom.window.document.querySelectorAll('.column')

suite('Testing module column', function () {
    test('findIdColumn находит все элементы и выдаст наибольший эл-т +1', function () {
        assert(column.Column.findIdColumn(idTasks) == 14)
    })
})

let some = column.Column.create(193)

suite('Testing module column', function () {
    test('create создает колонку и назначает ей data-column-id', function () {
        assert(some.outerHTML === newColumn)
    })
})

// EditValue
let edit = domForEdit.window.document.querySelector('.edit')
column.Column.editValue(edit)

let event = new MouseEvent('dblclick', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});

edit.dispatchEvent(event)

suite('Testing module column', function () {
    test('editValue вешает обработчик на двойной клик, при дблклике добавляет атрибут"contenteditable" и вешает фокус', function () {
        assert(domForEdit.window.document.querySelector('[contenteditable = true]') && domForEdit.window.document.activeElement)
    })
})

let editBlur = domForEditBlur.window.document.querySelector('.edit')
column.Column.editValue(editBlur)

editBlur.dispatchEvent(event)

editBlur.blur() 

suite('Testing module column', function () {
    test('При потере фокуса атрибут "contenteditable" должен удалиться ', function () {
        assert(!domForEditBlur.window.document.querySelector('[contenteditable = true]'))
    })
})

//////////////////////////////////////////////////////
//SvaeColumn 
//////////////////////////////////////////////////////
//eventAddTask
const output = `
<div class="column-header"><div class="title edit">english</div>
<span class="list-actions"><span>...</span></span></div><div class="list-tasks">
<div class="task" data-task-id="213" draggable="true">
<div class="task-text edit" contenteditable="true">english writing</div>
<div></div></div><div class="task" data-task-id="6" draggable="true">
<div class="task-text edit" contenteditable="true">english speaking</div>
<div></div></div><div class="task" data-task-id="2" draggable="true"><div class="task-text edit" contenteditable="true"></div><div></div></div></div><button class="add-task">Добавить задачу</button>`

let columnElement = domColumn.window.document.querySelector('.column')
column.Column.eventAddTask(columnElement)
columnElement.querySelector(".add-task").click()

suite('Testing module column', function () {
    test('Добавляет задачу', function () {
        assert(JSON.stringify(columnElement.innerHTML) === JSON.stringify(output))
    })
})
/////////////////////////////////////////////////////
//addDragnDropEventColums
column.Column.addDragnDropEventColums(columnElement)

suite('Testing module column', function () {
    test('Добавляет аттрибут draggable', function () {
        assert(columnElement.getAttribute('draggable'))
    })
})
/////////////////////////////////////////////////////
//  evenDragStartColumn
let evenDragStartColumn = new MouseEvent('dragstart', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});
columnElement.dispatchEvent(evenDragStartColumn)
let darggbleColumn = column.Column.darggbleColumn
let checkStart = Boolean(domColumn.window.document.querySelector('.dragElement') && column.Column.darggbleColumn)
console.log(checkStart)


let evenDragEndColumn = new MouseEvent('dragend', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});
columnElement.dispatchEvent(evenDragEndColumn)
let checkEnd = Boolean(!domColumn.window.document.querySelector('.dragElement') && !column.Column.darggbleColumn)
console.log(checkEnd)


let evenDragDropColumn = new MouseEvent('drop', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});
//first if
column.Column.darggbleColumn = darggbleColumn
columnElement.dispatchEvent(evenDragDropColumn)
//////////////////////////////////////////////////////
//Не получается пройти if-ы, также ругается на indexOf
//////////////////////////////////////////////////////

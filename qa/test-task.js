const task = require('../src/task.js')
const expect = require('chai').expect
const assert = require('chai').assert

const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;

const domForFindId = new JSDOM(`<!DOCTYPE html><div class="column" data-column-id="12" draggable="true">
<div class="column-header"><div class="title edit">hard skills</div>
<span class="list-actions"><span>...</span></span></div><div class="list-tasks">
<div class="task" data-task-id="1" draggable="true">
<div class="task-text edit" contenteditable="true">release strategy</div><div></div>
</div><div class="task" data-task-id="3" draggable="true">
<div class="task-text edit" contenteditable="true">logging</div><div></div></div>
<div class="task" data-task-id="5" draggable="true">
<div class="task-text edit" contenteditable="true">scrum/agile</div><div>
</div></div><div class="task" data-task-id="7" draggable="true">
<div class="task-text edit" contenteditable="true">code standards</div>
<div></div></div></div><button class="add-task">Добавить задачу</button></div>`)

////////////////////////////////////////////////
//findIdTask
let idTasks = domForFindId.window.document.querySelectorAll('.task')
let id = task.Task.findIdTask(idTasks)

suite('Testing module task', function () {
    test('findIdTask находит все элементы и выдаст наибольший эл-т +1', function () {
        assert(task.Task.findIdTask(idTasks) == 8)
    })
})

////////////////////////////////////////////////
//Create
let taskCompare = `<div class="task" data-task-id="8" draggable="true"><div tabindex="0" class="task-text edit"></div><div></div></div>`

suite('Testing module task', function () {
    test('Create создает task', function () {
        assert(task.Task.create(id).outerHTML === taskCompare)
    })
})

////////////////////////////////////////////////
//addTask
const domForAdd = new JSDOM(`<!DOCTYPE html><div class="task" data-task-id="8" draggable="true"></div>`)
let TaskOnFocus = `<div tabindex="0" class="task-text edit" contenteditable="true"></div>`
let parent = domForAdd.window.document.querySelector('.task')
const createTask = task.Task.create(id)
parent.append(createTask)
let newTask = task.Task.addTask(createTask)

suite('Testing module task', function () {
    test('addTask давляет создаваему элемену аттрибут contenteditable, вешает фокус и обработчик событий', function () {
        assert(newTask.getAttribute('contenteditable') && domForAdd.window.document.activeElement.outerHTML === TaskOnFocus)
    })
})

////////////////////////////////////////////////
//editValue
const domForEdit = new JSDOM(`<!DOCTYPE html><div class="task-text edit" tabindex="1">english writing</div>`)
let taskEdit = domForEdit.window.document.querySelector('.edit')

task.Task.editValue(taskEdit)

let event = new MouseEvent('dblclick', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});
taskEdit.dispatchEvent(event)

suite('Testing module task', function () {
    test('editValue по двойному клику добавляет аттрибут contenteditable', function () {
        assert(taskEdit.getAttribute("contenteditable") )
    })
})

////////////////////////////////////////////////
//saveTask

////////////////////////////////////////////////
//addDragnDropEvent
let domForDrag = new JSDOM(`<!DOCTYPE html><div class="some"><div class="task" data-task-id="6"><div tabindex="1" class="task-text edit">english speaking</div><div></div></div></div>`)
let chooseTask = domForDrag.window.document.querySelector('.task')
task.Task.addDragnDropEvent(chooseTask)
chooseTask.getAttribute('draggable')
///////////
//evenDragStartTask
let dragStart = new MouseEvent('dragstart', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});
chooseTask.dispatchEvent(dragStart)

let checkStart = Boolean(domForDrag.window.document.querySelector('.dragElement'))
///////////
//evenDragEndTask
let dragEnd = new MouseEvent('dragend', {
    'view': window,
    'bubbles': true,
    'cancelable': true
});
chooseTask.dispatchEvent(dragEnd)

let checkEnd = Boolean(!domForDrag.window.document.querySelector('.dragElement'))

suite('Testing module task', function () {
    test('Обработчики событий работают, классы создаются/удаляются', function () {
        assert(checkStart && checkEnd)
    })
})

////////////////////////////////////////////////
//evenDragDropTask
// let drop = new MouseEvent('drop', {
//     'view': window,
//     'bubbles': true,
//     'cancelable': true
// });
// chooseTask.dispatchEvent(dragStart)

// let domForDrop = new JSDOM(`<!DOCTYPE html><div class="some"><div class="task dragElement" data-task-id="6"><div tabindex="1" class="task-text edit">english speaking</div><div></div></div></div>`)
// let nextTask = domForDrop.window.document.querySelector('.task')
// task.Task.addDragnDropEvent(nextTask)
// chooseTask.dispatchEvent(dragStart)
// nextTask.dispatchEvent(drop)

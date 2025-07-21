// puxando os elementos do html
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const select = document.querySelector('#select')
const btnTask = document.querySelector('#btn-create')
const cardInitial = document.querySelector('#task-initial')
const cardMid = document.querySelector('#task-mid')
const cardEnd = document.querySelector('#task-end')

class Task {
    constructor(title, description, priority) {
        this.title = title
        this.description = description
        this.priority = priority
    }
}

function sendValue() {
    const valueTitle = titleInput.value
    const valueDescription = descriptionInput.value
    const valueSelect = select.value
    const newTask = new Task(valueTitle, valueDescription, valueSelect)
    const getTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    getTasks.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(getTasks))

}

function domTask() {
    const getResult = JSON.parse(localStorage.getItem('tasks'))
    const taskObject = getResult[getResult.length - 1]

    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task')

    const titleTask = document.createElement('h3')
    titleTask.textContent = `${taskObject.title}`
    taskDiv.appendChild(titleTask)

    const descriptionTask = document.createElement('p')
    descriptionTask.classList.add('description')
    descriptionTask.textContent = `${taskObject.description}`
    taskDiv.appendChild(descriptionTask)

    const priorityTask = document.createElement('p')
    priorityTask.classList.add('priority-name')
    priorityTask.textContent = `${taskObject.priority}`
    taskDiv.appendChild(priorityTask)

    const buttonMake = document.createElement('button')
    buttonMake.classList.add('btn-make')
    buttonMake.textContent = 'A fazer'
    taskDiv.appendChild(buttonMake)

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete')
    deleteButton.textContent = 'Deletar'
    taskDiv.appendChild(deleteButton)

    cardInitial.appendChild(taskDiv)

    // estilização options
    const prioridade = taskDiv.querySelector('.priority-name')
    if (prioridade.textContent.trim() === 'Leve') {
        prioridade.style.backgroundColor = '#15ff34'
    }
    if (prioridade.textContent.trim() === 'Moderado') {
        prioridade.style.backgroundColor = '#ffad15'
    }
    if (prioridade.textContent.trim() === 'Dificil') {
        prioridade.style.backgroundColor = '#ff1f1f'

    }

}
function moveElementsMid() {
    const taskBox = document.querySelector('.task')
    const deleteButton = taskBox.querySelector('.delete')
    const buttonFinish = document.createElement('button')
    buttonFinish.classList.add('finish')
    buttonFinish.textContent = 'Finalizar'

    const buttonReturn = document.createElement('button')
    buttonReturn.classList.add('back-button')
    buttonReturn.textContent = 'Voltar'

    const oldButton = taskBox.querySelector('.btn-make')
    oldButton.remove()

    taskBox.insertBefore(buttonFinish, deleteButton)
    taskBox.appendChild(buttonReturn)
    cardMid.appendChild(taskBox)
}
function finishElements() {
    const taskBox = document.querySelector('.task')

    const newButtonReturn = document.createElement('button')
    newButtonReturn.classList.add('back-button-mid')
    newButtonReturn.textContent = 'Voltar'
    // elementos do antigo card removidos 
    const getButtonFinish = taskBox.querySelector('.finish')
    getButtonFinish.style.display = 'none'
    const oldButtonReturn = taskBox.querySelector('.back-button')
    oldButtonReturn.style.display = 'none'
    // novos elementos
    taskBox.appendChild(newButtonReturn)
    cardEnd.appendChild(taskBox)
}
function backInitial() {
    const taskBox = document.querySelector('.task')
    const buttonBack = taskBox.querySelector('.back-button')
    buttonBack.remove()
    const buttonMakeReturn = taskBox.querySelector('.finish')
    buttonMakeReturn.classList.add('btn-make')
    buttonMakeReturn.classList.remove('finish')
    buttonMakeReturn.textContent = 'A fazer'
    cardInitial.appendChild(taskBox)
}
function backMid(){
    const taskBox = document.querySelector('.task')
    const buttonFinnishReturn = taskBox.querySelector('.finish')
    const oldButtonReturn = taskBox.querySelector('.back-button')
    const newButtonBackDelete = taskBox.querySelector('.back-button-mid')
    buttonFinnishReturn.style.display = ''
    oldButtonReturn.style.display = ''
    newButtonBackDelete.remove()

    cardMid.appendChild(taskBox)
}

function cleanInputs() {
    titleInput.value = ''
    descriptionInput.value = ''
}

/*Eventos */
btnTask.addEventListener('click', (e) => {
    e.preventDefault()
    sendValue()
    domTask()
    cleanInputs()

})
document.addEventListener('click', (e) => {
    const eventTarget = e.target
    const myParent = eventTarget.closest('div')
    const parentTitle = myParent.querySelector('h3')

    if (eventTarget.classList.contains('delete')) {
        myParent.remove()
        deleteLocalStorage(parentTitle.textContent)

    }
    if (eventTarget.classList.contains('btn-make')) {
        console.log('teste')
        moveElementsMid()
    }
    if (eventTarget.classList.contains('finish')) {
        finishElements()
    }
    if (eventTarget.classList.contains('back-button')) {
        backInitial()
    }
    if(eventTarget.classList.contains('back-button-mid')){
        backMid()
    }

})
// Manipulação local storage
function deleteLocalStorage(titleTask) {
    const taskResult = JSON.parse(localStorage.getItem('tasks'))
    const deleteTask = taskResult.filter((task) => task.title !== titleTask)
    localStorage.setItem('tasks', JSON.stringify(deleteTask))
}

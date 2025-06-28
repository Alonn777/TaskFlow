// puxando os elementos do html
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const select = document.querySelector('#select')
const btnTask = document.querySelector('#btn-create')
const cardInitial = document.querySelector('.card-initial')
const cardMid = document.querySelector('.card-mid')
const cardEnd = document.querySelector('.card-end')

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
// eventos
function domTask() {
    const getResult = JSON.parse(localStorage.getItem('tasks'))
    getResult.forEach(taskObject => {
        console.log(taskObject.title)
    });
}

function cleanInputs() {
    titleInput.value = ''
    descriptionInput.value = ''
    select.value = ''
}
btnTask.addEventListener('click', (e) => {
    e.preventDefault()
    sendValue()
    cleanInputs()
})

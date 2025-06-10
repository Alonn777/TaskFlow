// puxando os elementos do html
const inputTask = document.querySelector('#text-task')
const btnTask = document.querySelector('#btn-create')
const card = document.querySelectorAll('.card')


function sendValue() {
    const valueTask = inputTask.value
    const acessCard = document.querySelector('.card.active')
    // Dom
    const templateString = `
    <div class="task-card">
    <span class="text-task"> ${valueTask} </span>
    <div class="button-space">
    <button class="check"><img src="./src/img/checkV.png" alt="check"></button>
    <button class="bad"><img src="./src/img/cancelar.png" alt="no-complete"></button> </div>
    </div>
    `
    const parser = new DOMParser()
    const htmlTemplate = parser.parseFromString(templateString, "text/html")
    const taskCard = htmlTemplate.querySelector('.task-card')
    // const button = document.createElement('button')
    // button.className = ''
    // button.setAttribute('src', './delete.png')

    // botões dos task-card
    const buttonCheck = taskCard.querySelector('.check')
    const buttonBad = taskCard.querySelector('.bad')
    const textTask = taskCard.querySelector('.text-task')
    buttonCheck.addEventListener('click', () => {
        textTask.style.color = '#01e93b'
    })
    buttonBad.addEventListener('click', ()=>{
        textTask.style.color = '#f10000'
    })
    acessCard.appendChild(taskCard);
}
// eventos
card.forEach(cardClick => {
    cardClick.addEventListener('click', () => {
        cardClick.classList.add('active')

    })
    cardClick.addEventListener('dblclick', () => {
        cardClick.classList.remove('active')
    })

});

btnTask.addEventListener('click', (e) => {
    e.preventDefault()
    sendValue()
})
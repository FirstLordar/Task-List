const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const notes = [{
    title:'Выучить блок промассивы',
    comleted: false
},
{
    title:'Выучить Теорию Обьектов',
    comleted: true
} 
]


createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        return
    }
    const newNote = {
        title: inputElement.value, 
        comleted: false
    }
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(newNote))
    notes.push(newNote)
    render()
inputElement.value = '';
}

listElement.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type

        if (type === 'toggle') {
            notes[index].comleted = !notes[index].comleted
        }
        else if (type === 'remove') {
            notes.splice(index, 1)
        }
        
        render()
    }
}

function getNoteTemplate(note, index) {
   return `
    <li
        class="list-group-item d-flex justify-content-between align-items-center"
    >
        <span  class= "${note.comleted ? 'text-decoration-line-through' : ''}">${note.title}</span>
        <span>
        <span class="btn btn-small btn-${note.comleted ? 'warning' : 'success'}" data-index="${index}" data-type= "toggle">&check;</span>
        <span class="btn btn-small btn-danger" data-index="${index}" data-type= "remove">&times;</span>
        </span>
    </li>`
}
function render () {
    listElement.innerHTML = ''
    if (notes.length === 0) {
        listElement.innerHTML = '<p style= "text-align: center;">Нет Задач</p>'
    }
    for(i = 0; i < notes.length; i++) {
        listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
    }
}

render()
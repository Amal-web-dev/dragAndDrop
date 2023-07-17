import axios from "axios";
import { useHttp } from "./http.request";
const {request} = useHttp()
export let allTodoCards = []
let allTodoBlock = document.querySelector('.all-todo-block')
let usersIconBlock = document.querySelector('.users-icon-block')
let select = document.querySelector('.select-user');
let selectedUsers = []
let userArray = []
let temp_id 
let temp = []



export async function createTask(arr) {

    for (const item of arr) {
      let todoCard = document.createElement('div');
      let input = document.createElement('input');
      let pencil = document.createElement('div');
      let timeBlock = document.createElement('div');
      let timeIcon = document.createElement('img');
      let timeSpan = document.createElement('p');
      let descriptionP = document.createElement('p');
      let userDiv = document.createElement('div')
      for (const avatar of item.member) {
        let userIcon = document.createElement('img');
        userIcon.style.width = '25px'

        
    userDiv.append(userIcon)
     await request("/members", "get")
        .then(res => {
            res.forEach(mem => {
                if (avatar === mem.fullName) {
                    userIcon.src = '/public/avatars/' + mem.avatar
                  }
            });
            
          })
    
    }
      todoCard.classList.add('todo-card');
      input.classList.add('todo-input');
      timeBlock.classList.add('time-block')
      descriptionP.classList.add('description')
      userDiv.classList.add('user-div')
  
      input.type = 'text';
      input.value = item.task;
      pencil.classList.add('pencil-block');
      timeSpan.innerHTML = item.date
      timeIcon.src = './public/icon/time-icon.svg'
      descriptionP.innerHTML = item.discription

      
    todoCard.setAttribute('id', item.id)
    // todoCard.setAttribute('class', 'fill')
    todoCard.setAttribute('draggable', true)
  
      todoCard.append(input, descriptionP, pencil, timeBlock, userDiv);
      timeBlock.append(timeIcon, timeSpan)
    
      if (item.status == 'Нужно сделать') {
        allTodoCards[0].append(todoCard)
      } else if (item.status == 'В процессе') {
        allTodoCards[1].append(todoCard)
      } else if (item.status == 'Выполнено') {
        allTodoCards[2].append(todoCard)
      }
    
      input.onkeydown = (event) => {
        if (event.key === 'Enter' || event.target !== input) {
          if (input.value.trim() === '') {
            alert('Введите текст задачи');
      };
    
      input.focus();
       input.selectionEnd = input.value.length;
  
    }
    }
    todoCard.ondragstart = () => {
        temp_id = item.id
        todoCard.classList.add('hold')
        setTimeout(() => (todoCard.className = 'invisible'), 0)
    }
    todoCard.ondragend = () => {
        todoCard.className = 'todo-card'
    }
   }

  
  }

  export async function createTodoBlock(arr) {

        for (const item of arr) {
    let todoBlock = document.createElement('div')
      let dotsBlock = document.createElement('div')
      let dotsIcon = document.createElement('img')
      let input = document.createElement('input')
      let allTodoCard = document.createElement('div')
      let addCard = document.createElement('div')
      let p = document.createElement('p')
  
      input.classList.add('title-input')
      todoBlock.classList.add('todo-block')
      dotsBlock.classList.add('dots-block')
      dotsIcon.classList.add('dots-in-todo')
      input.classList.add('title-input"')
      allTodoCard.classList.add('all-todo-card')
      addCard.classList.add('add-card')
  
      input.type = 'text'
      p.innerHTML = '+'
      addCard.innerHTML = 'Добавить карточку'
      dotsIcon.src = './public/icon/dots.svg'
      input.value = item.title
  
     

      allTodoBlock.append(todoBlock)
      todoBlock.append(dotsBlock, input, allTodoCard, addCard)
      dotsBlock.append(dotsIcon)
      addCard.prepend(p)
  
    
  
      input.focus();
      input.selectionEnd = input.value.length;
    
        allTodoCards.push(allTodoCard);
  
    
    }
  }
  
export function createUserIcon(arr) {
    for (const item of arr) {
      let userIcon = document.createElement('div')
      let img  =  document.createElement('img')
  
      userIcon.classList.add('user-block-icon')
      if(item.id <= 3) {
        img.src = '/public/avatars/' + item.avatar
      } else {
        userIcon.innerHTML = '+' + (arr.length - 3)
        usersIconBlock.append(userIcon)
        userIcon.append(img)
        userIcon.style.zIndex = '9'
        return
      }
  
      usersIconBlock.append(userIcon)
      userIcon.append(img)
    }
  }

  
export function reloadUser(arr) {
	for (const item of arr) {
		let option = document.createElement('option');
		option.innerHTML = item.fullName;
    option.value = item.fullName
		select.append(option);
	}
}

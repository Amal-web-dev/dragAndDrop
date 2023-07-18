import axios from "axios";
import { useHttp } from "./http.request";
const {request} = useHttp()
import { openModal, closeModal } from "./func";
export let allTodoCards = []
let allTodoBlock = document.querySelector('.all-todo-block')
let usersIconBlock = document.querySelector('.users-icon-block')
let select = document.querySelector('.select-user');
let selectedUsers = []
let userArray = []
let temp_id 
let temp = []
let titleNew = []
export let statusToCardMap = {}
let statusCounter = 1
let remakeTitle = document.querySelector('.remake-title')
let remakeTitleInp = document.querySelector('.remake-title-inp')
let createTaskBlock = document.querySelector('.create-task-block')
let filterDosk = document.querySelector('.filter-dosk')

async function createTask(arr, place) {
  place.innerHTML = ''

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
    todoCard.setAttribute('draggable', true)
  
      todoCard.append(input, descriptionP, pencil, timeBlock, userDiv);
      timeBlock.append(timeIcon, timeSpan)
    
       
if (place.id === item.status) {
  place.append(todoCard)
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
    statusCounter++
   }

  }

  export async function createTodoBlock(arr) {

        for (const item of arr) {
    let todoBlock = document.createElement('div')
      let dotsBlock = document.createElement('div')
      let dotsIcon = document.createElement('img')
      let button = document.createElement('button')
      let allTodoCard = document.createElement('div')
      
      let addCard = document.createElement('div')
      let p = document.createElement('p')
  
      button.classList.add('title-input')
      todoBlock.classList.add('todo-block')
      dotsBlock.classList.add('dots-block')
      dotsIcon.classList.add('dots-in-todo')
      button.classList.add('title-input')
      allTodoCard.classList.add('all-todo-card')
      addCard.classList.add('add-card')
  
      button.id = item.id
      p.innerHTML = '+'
      addCard.innerHTML = 'Добавить карточку'
      dotsIcon.src = './public/icon/dots.svg'
      button.innerHTML = item.title
      allTodoCard.id = item.title


      allTodoBlock.append(todoBlock)
      todoBlock.append(dotsBlock, button, allTodoCard, addCard)
      dotsBlock.append(dotsIcon)
      addCard.prepend(p)
  
        allTodoCards.push(allTodoCard);
        request("/todos", "get")
        .then(res => {
            createTask(res, allTodoCard)
        })

        addCard.onclick = () => {
          openModal(createTaskBlock)
        }

        // let savedTitle = localStorage.getItem('newTitle');
        // button.onclick = (e) => {
        //   openModal(remakeTitle);
        //   remakeTitleInp.value = button.innerHTML;
        //   remakeTitleInp.onkeyup = () => {
        //     savedTitle = remakeTitleInp.value;
        //     localStorage.setItem('newTitle', savedTitle);
        //   };
        //   remakeTitleInp.id = button.id
        //   if(button.id == remakeTitleInp.id) {
        //     button.innerHTML = savedTitle
        //   }
        
        //   console.log(remakeTitleInp.id);
        // };

        

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


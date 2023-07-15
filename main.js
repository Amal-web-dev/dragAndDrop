import { post } from "jquery";
import { useHttp } from "./modules/http.request";
import axios  from 'axios'

let arrowBlock = document.querySelector('.arrow-block')
let arrowIcon = document.querySelector('.img-arrow')
let leftBlind = document.querySelector('.left-blind')
let elements = document.querySelectorAll('*');
let inpSearch = document.querySelector('.inp-search')
let searchImg = document.querySelector('.search-img')
let titleInput = document.querySelector('.title-input')
let todoInput = document.querySelectorAll('.todo-input');
let pencilButton = document.querySelectorAll('.pencil-block');
let addCard = document.querySelectorAll('.add-card')
let addTodoBlock = document.querySelector('.add-todo-block')
let allTodoBlock = document.querySelector('.all-todo-block')
let starIcon = document.querySelector('.star-icon')
let avaBlock = document.querySelector('.choose-ava')
let backModal = document.querySelector('.back-modal')
let userIcon = document.querySelectorAll('.user-img')
let userIconTwo = document.querySelector('.user-img-2')
let userBlock = document.querySelector('.user-icon')
let closeIcon = document.querySelector('.close-icon')
let userFace = document.querySelectorAll('.user-face')
let createTodo = document.querySelector('.create-todo')
let closeBtn = document.querySelector('.close-btn')
let createTaskBlock = document.querySelector('.create-task-block')
let closeTodo = document.querySelector('.close')
let select = document.querySelector('.select-user');
let imgBlock = document.querySelector('.img-block');
let usersBlock = document.querySelector('.users-block')
let todoCard = document.querySelectorAll('.todo-card')

let selectedUsers = []
let userArray = []
let isStarred = false;
let arrowToggle = false
let temp_id

const {request} = useHttp()

if (localStorage.getItem('titleValue')) {
	let savedValue = localStorage.getItem('titleValue');

	titleInput.value = savedValue;
}

// ui effects
arrowBlock.onclick = () => {
	if (arrowToggle) {
		leftBlind.style.marginLeft = '-17%'
		arrowIcon.src = './public/icon/arrow-right.svg'
		arrowToggle = false
	} else {
		leftBlind.style.marginLeft = '0px'
		arrowIcon.src = './public/icon/arrow-left.svg'
		arrowToggle = true
	}

}

document.onclick = (event) => {
	if (!inpSearch.contains(event.target)) {
		inpSearch.className = 'inp-search'
		searchImg.classList.remove('black-img')
		inpSearch.placeholder = 'Serach'
	}

	if (!titleInput.contains(event.target)) {
		titleInput.className = 'title-input'
	}
};

inpSearch.onclick = function () {
	inpSearch.className = 'inp-search-2-version'
	searchImg.classList.add('black-img')
	inpSearch.placeholder = 'Serach in Trello'
};
starIcon.onclick = function () {
	if (isStarred) {
		starIcon.src = './public/icon/star-icon-full.svg';
	} else {
		starIcon.src = './public/icon/star-icon.svg';
	}

	isStarred = !isStarred;
};
// ui effects

// user
userBlock.onclick = () => {
	avaBlock.style.display = 'block';
	backModal.style.display = 'block';

	setTimeout(function () {
		avaBlock.style.scale = 1;
	}, 0);
};
// user

// modal 

closeIcon.onclick = () => {
	avaBlock.style.scale = 0;

	setTimeout(function () {
		avaBlock.style.display = 'none';
		backModal.style.display = 'none'
	}, 300);
};
// modal 


userFace.forEach(img => {
	img.onclick = () => {
		userIcon.forEach(icon => {
			localStorage.setItem('selectedImage', img.src)

			let src = localStorage.getItem('selectedImage')
			icon.src = src
		})
		avaBlock.style.scale = 0;

		setTimeout(function () {
			avaBlock.style.display = 'none';
			backModal.style.display = 'none'
		}, 300);
	}
})



// block

// titleInput.onclick = function () {
// 	titleInput.className = 'title-input-2'
// 	titleInput.selectionStart = titleInput.value.length;
// };

// titleInput.onkeyup = () => {
// 	let inputValue = titleInput.value;

// 	localStorage.setItem('titleValue', inputValue);
// };





request('/blocks', 'get')
.then(res => createTodoBlock(res))

function createTodoBlock(arr) {

  for (const item of arr) {
  let todoBlock = document.createElement('div')
	let dotsBlock = document.createElement('div')
	let dotsIcon = document.createElement('img')
	let input = document.createElement('input')
	let allTodoCard = document.createElement('div')
	let todoCard = document.createElement('div')
	let addCard = document.createElement('div')
	let p = document.createElement('p')

	todoCard.classList.add('todo-card')
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
  }
}

createTodo.onclick = () => {
	createTaskBlock.style.display = 'block';
	backModal.style.display = 'block';

	setTimeout(function () {
		createTaskBlock.style.scale = 1;
	}, 0);
};

closeBtn.onclick = closeModal
closeTodo.onclick = closeModal

function closeModal() {
	createTaskBlock.style.scale = 0;

	setTimeout(function () {
		createTaskBlock.style.display = 'none';
		backModal.style.display = 'none'
	}, 300);
}

let formTodo = document.forms.formTodo

async function getUserIdByName(name) {
  try {
    const res = await request('/member/' + name);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
let allTodoCard = document.querySelectorAll('.all-todo-card');

// addTodoBlock.onclick = () => {

// }

formTodo.onsubmit = (e) => {
  e.preventDefault();

  let fm = new FormData(formTodo);

  let pValue
  let todo = {
    member: [],
    id: Math.random()
  }
  let userBlocks = usersBlock.querySelectorAll('.user-block');
let members = [];
userBlocks.forEach(userBlock => {
  let pElements = userBlock.querySelectorAll('p');
  pElements.forEach(pElement => {
    pValue = pElement.textContent;
    members.push(pValue);
  });
});
 


request('/members', 'get')
.then(res => {
  reloadUser(res)
  userArray = res
})

todo.member = members;

  fm.forEach((value, key) => {
    todo[key] = value
  });

  closeModal()

  formTodo.reset()
  usersBlock.innerHTML = ''
  for (let i = select.options.length - 1; i > 0; i--) {
    select.remove(i);
  }

  request('/todos', 'post', todo)


  let names = todo.member; 
let fullNameParam = names.join(',');

request('/members?fullName=' + fullNameParam, 'get')
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });

console.log(todo.member);
};
function fetchTasks() {
  request('/todos', 'get')
    .then(res => {
      createTask(res);
    })
    .catch(error => {
      console.error(error);
    });
}

fetchTasks();


select.onchange = () => {
	createUser(selectedUsers);
}


function reloadUser(arr) {
	for (const item of arr) {
		let option = document.createElement('option');
		option.innerHTML = item.fullName;
    option.value = item.fullName
		select.append(option);
	}
}

request("/members/", "get")
	.then(res => {
		reloadUser(res)
		userArray = res
	})

function createUser(arr) {
	let selectedOption = select.options[select.selectedIndex];
	let selectedName = selectedOption.text;

	let selectedUser = userArray.find(item => item.fullName === selectedName);

	let icon = document.createElement('img');
	let closeIcon = document.createElement('img');
	let name = document.createElement('p');
	icon.src = `/avatars/${selectedUser.avatar}`;
	name.innerHTML = selectedName;
	icon.style.width = '40px';
	closeIcon.src = './public/icon/cancel.svg';
	closeIcon.classList.add('user-close');

	let div = document.createElement('div');
	div.classList.add('user-block');
	div.append(icon, name, closeIcon);
	usersBlock.append(div);

	closeIcon.onclick = () => {
		div.remove();
		select.appendChild(selectedOption);
		selectedUsers = selectedUsers.filter(user => user !== selectedUser);
	};


	select.removeChild(selectedOption);
	selectedUsers.push(selectedUser);
}

todoCard.forEach(todo => {
	todo.setAttribute('draggable', true)
	todo.ondragstart = () => {
		todo.classList.add('hold')
		setTimeout(() => (todo.className = 'invisible'), 0)
	}

	todo.ondragend = () => {
		todo.className = 'todo-card'
	}
})

function createTask(arr) {

  for (const item of arr) {
    console.log(item);
    let todoCard = document.createElement('div');
    let input = document.createElement('input');
    let pencil = document.createElement('div');
    let timeBlock = document.createElement('div');
    let timeIcon = document.createElement('img');
    let timeSpan = document.createElement('p');
    let descriptionP = document.createElement('p');

    todoCard.classList.add('todo-card');
    input.classList.add('todo-input');
    timeBlock.classList.add('time-block')
    descriptionP.classList.add('description')

    input.type = 'text';
    input.value = item.task;
    pencil.classList.add('pencil-block');
    timeSpan.innerHTML = item.date
    timeIcon.src = './public/icon/time-icon.svg'
    descriptionP.innerHTML = item.discription

allTodoCard.forEach(card => {
  // request('/blocks', 'get')
  // .then(res => {
  //  for (const item of res) {
  //   if(item.title == input.value)  {
  //     card.prepend(todoCard);
  //   }
  //  }
  // })
  card.append(todoCard)
});
    todoCard.append(input, descriptionP, pencil, timeBlock);
    timeBlock.append(timeIcon, timeSpan)
  
  
    input.onkeydown = (event) => {
      if (event.key === 'Enter' || event.target !== input) {
        if (input.value.trim() === '') {
          alert('Введите текст задачи');
    };
  
    input.focus();
    input.selectionEnd = input.value.length;

  }
  }
 
}
}


let usersIconBlock = document.querySelector('.users-icon-block')

request('/members', 'get') 
.then(res => createUserIcon(res))

function createUserIcon(arr) {
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
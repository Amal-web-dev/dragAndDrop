import { post } from "jquery";
import { useHttp } from "./modules/http.request";
import axios  from 'axios'
import { allTodoCards, createTask, createTodoBlock, createUserIcon, reloadUser } from "./modules/ui.js";
let arrowBlock = document.querySelector('.arrow-block')

let arrowIcon = document.querySelector('.img-arrow')
let leftBlind = document.querySelector('.left-blind')
let elements = document.querySelectorAll('*');
let inpSearch = document.querySelector('.inp-search')
let searchImg = document.querySelector('.search-img')
let titleInput = document.querySelectorAll('.title-input')
let todoInput = document.querySelectorAll('.todo-input');
let pencilButton = document.querySelectorAll('.pencil-block');
let addCard = document.querySelectorAll('.add-card')
let addTodoBlock = document.querySelector('.add-todo-block')
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
let allTodoCard = document.querySelectorAll('.all-todo-card');


let selectedUsers = []
let userArray = []
let isStarred = false;
let arrowToggle = false
let temp_id

const {request} = useHttp()






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
			icon.src = src

		})
		avaBlock.style.scale = 0;

		setTimeout(function () {
			avaBlock.style.display = 'none';
			backModal.style.display = 'none'
		}, 300);
	}
})


let src = localStorage.getItem('selectedImage')
userIcon.forEach(icon => {
	icon.src = src
})


request('/blocks', 'get')
.then(res => createTodoBlock(res))



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



select.onchange = () => {
	createUser(selectedUsers);
}


request('/todos', 'get')
.then(res => {
	createTask(res)
})

export function createUser(arr) {
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




request('/members', 'get') 
.then(res => createUserIcon(res))


request("/members/", "get")
	.then(res => {
		reloadUser(res)
		userArray = res
	})

	if (localStorage.getItem('titleValue')) {
		let savedValue = localStorage.getItem('titleValue');
	
		titleInput.forEach(inp => {
			inp.value = savedValue;
	})
	}

	titleInput.forEach(inp => {
		inp.onclick = () => {
			inp.className = 'title-input-2'
			inp.selectionStart = titleInput.value.length;
		};
		})
	

	document.onclick = (event) => {
		if (!inpSearch.contains(event.target)) {
			inpSearch.className = 'inp-search'
			searchImg.classList.remove('black-img')
			inpSearch.placeholder = 'Serach'
		}
	
	};

// DragAndDrop
console.log(allTodoCards);
	for(let allCard of allTodoCards) {
		console.log(temp);
		console.log(allCard);
	
		allCard.ondragover = (event) => {
			event.preventDefault()
		}
		allCard.ondragenter = function(event) {
			event.preventDefault()
			this.className += ' hovered'
		}
		allCard.ondragleave = function() {
			this.className = 'all-todo-card'
		}
		allCard.ondrop = function() {
			this.className = 'all-todo-card'
			temp.forEach((item, index) => {
				if(item.id === temp_id) {
					this.append(item)
				}
			})
		}
	}

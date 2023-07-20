import {
	post
} from "jquery";
import {
	useHttp
} from "./modules/http.request";
const {
	request
} = useHttp()
import axios from 'axios'
import {
	calendar
} from "./modules/calendar";
import {
	openModal,
	closeModal
} from "./modules/func";
import {
	createTask,
	allTodoCards,
	createTodoBlock,
	createUserIcon,
	reloadUser
} from "./modules/ui.js";
let arrowBlock = document.querySelector('.arrow-block')

let arrowIcon = document.querySelector('.img-arrow')
let leftBlind = document.querySelector('.left-blind')
let elements = document.querySelectorAll('*');
let inpSearch = document.querySelector('.inp-search')
let searchImg = document.querySelector('.search-img')
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
let userAvatar = document.querySelectorAll('.user-avatar')
let closeUserIcon = document.querySelector('.close-user-add-icon')
let addUserModal = document.querySelector('.add-user-modal')
let addUser = document.querySelector('.add-user')
let addBlock = document.querySelector('.add-block')
let closeUserAdd = document.querySelector('.close-user-add')
let closeAddBlock = document.querySelector('.close-add-block')
let remakeTitleInp = document.querySelector('.remake-title-inp')
let addTaskBlock = document.querySelector('.add-task-block')
let btnInvite = document.querySelector('.btn-invite')
let filterDosk = document.querySelector('.filter-dosk')
let search_inp = document.querySelector('#search')
let search_canvas = document.querySelector('.canvas-for-search')
let allTodoBlock = document.querySelector('.all-todo-block')
let allBlock = document.querySelector('.all-block')
let main = document.querySelector('main')
let formUser = document.forms.formUser
let addBlockForm = document.forms.add_block_form

let selectedUsers = []
let userArray = []
let isStarred = false;
let arrowToggle = false
let temp_id
let selectedAvatar = null;
let todos_for_search = []
let todos_for_dosk = []



calendar("#input-date")

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
// user

// modal 


closeIcon.onclick = () => {
	closeModal(avaBlock)
};

userBlock.onclick = () => {
	openModal(avaBlock)
};

createTodo.onclick = () => {
	openModal(createTaskBlock)
};

closeBtn.onclick = () => {
	closeModal(createTaskBlock)
}
closeTodo.onclick = () => {
	closeModal(createTaskBlock)
}

closeUserIcon.onclick = () => {
	closeModal(addUserModal)
}

addUser.onclick = () => {
	openModal(addUserModal)
}

closeUserAdd.onclick = () => {
	closeModal(addUserModal)
}

addTodoBlock.onclick = () => {
	openModal(addBlock)
}

closeAddBlock.onclick = () => {
	closeModal(addBlock)
}

btnInvite.onclick = () => {
	filterDosk.classList.add('filter-active')

	setTimeout(function () {
		filterDosk.style.scale = 1;
	}, 0);
}

// modal 


userFace.forEach(img => {
	img.onclick = () => {
		userIcon.forEach(icon => {
			localStorage.setItem('selectedImage', img.src)
			icon.src = src
		})
		closeModal(avaBlock)
	}
})

userAvatar.forEach(ava => {
	ava.onclick = () => {
		if (selectedAvatar) {
			selectedAvatar.classList.remove('selected-ava')
		}
		ava.classList.add('selected-ava')
		selectedAvatar = ava;
	}
});

let src = localStorage.getItem('selectedImage')
userIcon.forEach(icon => {
	icon.src = src
})


let formTodo = document.forms.formTodo

// forms

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



	todo.member = members;

	fm.forEach((value, key) => {
		todo[key] = value
	});

	closeModal(createTaskBlock)

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


formUser.onsubmit = (e) => {
	e.preventDefault();

	let member = {}

	let fm = new FormData(formUser)

	fm.forEach((value, key) => {
		member[key] = value
	});

	userAvatar.forEach(ava => {
		if (ava.classList.contains('selected-ava')) {
			member.icon = ava.getAttribute('data-avatar')
		}
	})
	userAvatar.forEach(ava => {
		ava.classList.remove('selected-ava')
	})
	formUser.reset()
	request("/members", "post", member)


	closeModal(addUserModal)
}

addBlockForm.onsubmit = (e) => {
	e.preventDefault();

	let blocks = {}

	let fm = new FormData(addBlockForm)

	fm.forEach((value, key) => {
		blocks[key] = value
	});

	console.log(blocks);

	closeModal(addBlock)
	request('/blocks', 'post', blocks)
		.then(res => console.log(res))
}
//forms

select.onchange = () => {
	createUser(selectedUsers);
}

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

// request
request("/todos", "get")
	.then(res => todos_for_search = res)

request('/members', 'get')
	.then(res => {
		createUserIcon(res)
		reloadUser(res)
	})


request("/blocks", "get")
	.then(res => {
		createTodoBlock(res, allTodoBlock)
		reloadContainers(res)
		todos_for_dosk = res
	})
	.then(() => {
		request("/todos", "get")
			.then(res => {
				createTask(res)
			})
	})

setTimeout(() => {
	let pDosk = document.querySelectorAll('.p-dosk')
	pDosk.forEach(p => {
		p.onclick = () => {
			let title = p.id
			request("/blocks?title=" + title, "get")
				.then(res => createTodoBlock(res, allTodoBlock))
				.then(() => {
					request("/todos?status=" + title, "get")
						.then(res => {
							createTask(res)
						})
				})
			filterDosk.classList.remove('filter-active')

			setTimeout(function () {
				filterDosk.style.scale = 0;
			}, 0);
		}
	})
}, 1000);

allBlock.onclick = () => {
	request('/blocks', "get")
		.then(res => createTodoBlock(res, allTodoBlock))
		.then(() => {
			request("/todos", "get")
				.then(res => {
					createTask(res)
				})
		})
	filterDosk.classList.remove('filter-active')

	setTimeout(function () {
		filterDosk.style.scale = 0;
	}, 0);
}
// request


// titleInput.forEach(inp => {
// 	inp.onclick = () => {
// 		inp.className = 'title-input-2'
// 		inp.selectionStart = titleInput.value.length;
// 	};
// 	})


document.onclick = (event) => {
	if (!inpSearch.contains(event.target)) {
		inpSearch.className = 'inp-search'
		searchImg.classList.remove('black-img')
		inpSearch.placeholder = 'Serach'
	}

};


// search func

search_inp.onfocus = () => {
	search_canvas.style.display = "block"
	setTimeout(() => {
		search_canvas.style.opacity = "1"
	}, 0);
}
search_inp.onblur = () => {
	search_canvas.style.opacity = "0"
	setTimeout(() => {
		search_canvas.style.display = "none"
	}, 400);
	let elems = document.querySelectorAll('.finded')
	elems.forEach(el => el.classList.remove('finded'))
}

search_inp.oninput = (e) => {
	let val = e.target.value.toLowerCase().trim()

	let filtered = todos_for_search.filter(item => item.task.toLowerCase().trim() === val)

	if (val) {
		let elems = document.querySelectorAll('.finded')
		elems.forEach(el => el.classList.remove('finded'))

		for (let finded of filtered) {
			let elem = document.getElementById(finded.id)
			let {
				bottom,
				top,
				height
			} = elem.getBoundingClientRect()
			elem.classList.add('finded')

			main.scrollTo({
				top: top - (height),
				behavior: "smooth"
			})
		}
	} else {
		for (let finded of filtered) {
			let elem = document.getElementById(finded.id)
			elem.classList.remove('finded')
		}
	}

}

// search 

// dosk func



function reloadContainers(arr) {
	for (const item of arr) {
		let p = document.createElement('p')

		p.innerHTML = item.title
		p.classList.add('p-dosk')
		p.id = item.title

		filterDosk.append(p)
	}

}

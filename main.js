let arrowBlock = document.querySelector('.arrow-block')
let arrowIcon = document.querySelector('.img-arrow')
let leftBlind = document.querySelector('.left-blind')
let arrowToggle = false
let temp_id

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

let elements = document.querySelectorAll('*');
let inpSearch = document.querySelector('.inp-search')
let searchImg = document.querySelector('.search-img')
let titleInput = document.querySelector('.title-input')
let todoInput = document.querySelectorAll('.todo-input');
let pencilButton = document.querySelectorAll('.pencil-block');
let addCard = document.querySelectorAll('.add-card')
let addTodoBlock = document.querySelector('.add-todo-block')
let allTodoBlock = document.querySelector('.all-todo-block')


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

let starIcon = document.querySelector('.star-icon')
let isStarred = false;

starIcon.onclick = function () {
  if (isStarred) {
    starIcon.src = './public/icon/star-icon-full.svg';
  } else {
    starIcon.src = './public/icon/star-icon.svg';
  }

  isStarred = !isStarred;
};

let avaBlock = document.querySelector('.choose-ava')
let backModal = document.querySelector('.back-modal')
let userIcon = document.querySelectorAll('.user-img')
let userIconTwo = document.querySelector('.user-img-2')
let userBlock = document.querySelector('.user-icon')
let closeIcon = document.querySelector('.close-icon')
let userFace = document.querySelectorAll('.user-face')

userBlock.onclick = () => {
  avaBlock.style.display = 'block';
  backModal.style.display = 'block';

  setTimeout(function () {
    avaBlock.style.scale = 1;
  }, 0);
};

backModal.onclick = () => {
  avaBlock.style.scale = 0;

  setTimeout(function () {
    avaBlock.style.display = 'none';
    backModal.style.display = 'none'
  }, 300);
};

closeIcon.onclick = () => {
  avaBlock.style.scale = 0;

  setTimeout(function () {
    avaBlock.style.display = 'none';
    backModal.style.display = 'none'
  }, 300);
};

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




titleInput.onclick = function () {
  titleInput.className = 'title-input-2'
  titleInput.selectionStart = titleInput.value.length;
};

if (localStorage.getItem('titleValue')) {
  let savedValue = localStorage.getItem('titleValue');

  titleInput.value = savedValue;
}

titleInput.onkeyup = () => {
  let inputValue = titleInput.value;

  localStorage.setItem('titleValue', inputValue);
};



let allTodoCard = document.querySelectorAll('.all-todo-card');

addCard.forEach(add => {
  add.onclick = () => {
    let todoCard = document.createElement('div');
    let input = document.createElement('input');
    let pencil = document.createElement('div');

    todoCard.classList.add('todo-card');
    input.classList.add('todo-input');

    input.type = 'text';
    input.value = '';
    pencil.classList.add('pencil-block');

allTodoCard.forEach(card => {
  card.prepend(todoCard);
});
    todoCard.append(input, pencil);
  
  
    input.onkeydown = (event) => {
      if (event.key === 'Enter' || event.target !== input) {
        if (input.value.trim() === '') {
          alert('Введите текст задачи');
        }
      }
    };
  
    input.focus();
    input.selectionEnd = input.value.length;

  }
  
  pencilButton.forEach(pen => {
    pen.onclick = () => {
      todoInput.forEach(inp => {
        inp.focus();
        inp.selectionEnd = inp.value.length;
        inp.removeAttribute('readonly', 'readonly')
      })
    };
  
  })
})


addTodoBlock.onclick = () => {
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
  input.value = ''

  allTodoBlock.append(todoBlock)
  todoBlock.append(dotsBlock, input, allTodoCard, addCard)
  dotsBlock.append(dotsIcon)
  addCard.prepend(p)


  input.focus();
  input.selectionEnd = input.value.length;
  

}

let createTodo = document.querySelector('.create-todo')

let closeBtn = document.querySelector('.close-btn')
let createTaskBlock = document.querySelector('.create-task-block')
let closeTodo = document.querySelector('.close')


createTodo.onclick = () => {
  createTaskBlock.style.display = 'block';
  backModal.style.display = 'block';

  setTimeout(function () {
    createTaskBlock.style.scale = 1;
  }, 0);
};

backModal.onclick = () => {
  createTaskBlock.style.scale = 0;

  setTimeout(function () {
    createTaskBlock.style.display = 'none';
    backModal.style.display = 'none'
  }, 300);
};

closeBtn.onclick = () => {
  createTaskBlock.style.scale = 0;

  setTimeout(function () {
    createTaskBlock.style.display = 'none';
    backModal.style.display = 'none'
  }, 300);
};

closeTodo.onclick = () => {
  createTaskBlock.style.scale = 0;

  setTimeout(function () {
    createTaskBlock.style.display = 'none';
    backModal.style.display = 'none'
  }, 300);
};

let formTodo  = document.forms.form_todo

formTodo.onsubmit = (e) => {
  e.preventDefault();

  
}


let userArray = [
  {
      id: 1,
      name: 'Jane',
      lastName: 'Smith',
      specialicion: 'software',
      icon: 'https://sobirjonovamir.github.io/trello_copy/icons/icon1.png'
  },
  {
      id: 2,
      name: 'Sarah',
      lastName: 'Williams',
      specialicion: 'software',
      icon: 'https://sobirjonovamir.github.io/trello_copy/icons/icon2.png'
  },
  {
      id: 3,
      name: 'Emily',
      lastName: 'Davis',
      specialicion: 'software',
      icon: 'https://sobirjonovamir.github.io/trello_copy/icons/icon3.png'
  },{
      id: 4,
      name: 'Mike',
      lastName: 'Johnson',
      specialicion: 'software',
      icon: 'https://sobirjonovamir.github.io/trello_copy/icons/icon4.png'
  },
  {
      id: 5,
      name: 'Daniel',
      lastName: 'Wilson',
      specialicion: 'software',
      icon: 'https://sobirjonovamir.github.io/trello_copy/icons/icon5.png'
  }
]

let selectedUsers =  []

let select = document.querySelector('.select-user');
let imgBlock = document.querySelector('.img-block');
let usersBlock = document.querySelector('.users-block')


select.onchange = () => {
createUser(selectedUsers);
 }


function reloadUser(arr) {
  for (const item of arr) {
    let option = document.createElement('option');
    option.innerHTML = item.name + ' ' + item.lastName;
    select.append(option);
  }
}

reloadUser(userArray);


function createUser(arr) {
    let selectedOption = select.options[select.selectedIndex];
    let selectedName = selectedOption.text;
    
    let selectedUser = userArray.find(item => item.name + ' ' + item.lastName === selectedName);
    
    let icon = document.createElement('img');
    let closeIcon = document.createElement('img');
    let name = document.createElement('p');
    icon.src = selectedUser.icon;
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

let todoCard = document.querySelectorAll('.todo-card')

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

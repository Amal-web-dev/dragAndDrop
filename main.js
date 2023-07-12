let arrowBlock = document.querySelector('.arrow-block')
let arrowIcon = document.querySelector('.img-arrow')
let leftBlind = document.querySelector('.left-blind')
let arrowToggle = false 

arrowBlock.onclick = () => {
  if(arrowToggle) {
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

elements.forEach(element => {
   element.setAttribute('draggable', 'false');
});

document.onclick = (event) => {
  if (!inpSearch.contains(event.target)) {
    inpSearch.className = 'inp-search'
    searchImg.classList.remove('black-img')
    inpSearch.placeholder = 'Serach'
  }
};

inpSearch.onclick = function() {
  inpSearch.className = 'inp-search-2-version'
  searchImg.classList.add('black-img')
  inpSearch.placeholder = 'Serach in Trello'
};

let starIcon = document.querySelector('.star-icon')
let isStarred = false;

starIcon.onclick = function() {
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
  
  setTimeout(function() {
     avaBlock.style.scale = 1;
  }, 0);
};

backModal.onclick = () => {
  avaBlock.style.scale = 0;
  
  setTimeout(function() {
     avaBlock.style.display = 'none';
     backModal.style.display = 'none'
  }, 300);
};

closeIcon.onclick = () => {
  avaBlock.style.scale = 0;
  
  setTimeout(function() {
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
    
    setTimeout(function() {
       avaBlock.style.display = 'none';
       backModal.style.display = 'none'
    }, 300);
  }
})
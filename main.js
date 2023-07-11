let arrowIcon = document.querySelector('.img-arrow')
let leftBlind = document.querySelector('.left-blind')
let arrowToggle = false 

arrowIcon.onclick = () => {
  if(!arrowToggle) {
    leftBlind.style.marginLeft = '0px'
    arrowIcon.src = './public/icon/arrow-left.svg'
    arrowToggle = true
  } else {
    leftBlind.style.marginLeft = '-49%'
    arrowIcon.src = './public/icon/arrow-right.svg'
    arrowToggle = false

  }

}
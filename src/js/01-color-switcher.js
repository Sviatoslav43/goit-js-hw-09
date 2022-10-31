const refs = {
start: document.querySelector('button[data-start]'),
stop: document.querySelector('button[data-stop]'),
};

let timeId = null

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.start.addEventListener('click', () => {
    refs.start.disabled = true
    timeId = setInterval(() => {
        const body = document.querySelector('body')
        body.style.backgroundColor = getRandomHexColor()
    },1000)
})



refs.stop.addEventListener('click', () => {
    clearInterval(timeId)
    refs.start.disabled = false
})
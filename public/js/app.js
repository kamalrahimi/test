console.log('Client side javascript load in') 

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
      //  console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const serach = document.querySelector('input')
const meassageOne = document.querySelector('#message-1')
const meassageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = 'http://localhost:3000/weather?address=' + serach.value
    meassageOne.textContent = 'Loading...'
    meassageTwo.textContent = ''
    fetch(location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            meassageOne.textContent = 'error: ' + data.error
        }else {
            meassageOne.textContent = 'Location: ' + data.location
            meassageTwo.textContent = 'description: ' + data.description
        }
    })
})
})

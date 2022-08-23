

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location =search.value
   
    msg1.textContent = 'loading pls wait...'
    fetch('/weather?address='+location).then((response)=>{
    
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error
                
            }
            else{
    
                console.log(data.location)
                msg1.textContent =data.forecast
                msg2.textContent =data.location
            }
        })
    
    })

})
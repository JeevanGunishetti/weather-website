//const { response } = require("express");

console.log("the script is running");


fetch("http://localhost:3000/weather?address=Hyderabad").then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.place)
            console.log(data.temperature)
        }
    })
})

const weatherForm = document.querySelector("form")
const search = document.querySelector('input')
const messageOne = document.querySelector("#m1")
const messageTwo = document.querySelector("#m2")



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent ="Loading..."
    messageTwo.textContent = ""
    
    fetch("http://localhost:3000/weather?address=" + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           return messageOne.textContent = data.error
           messageTwo.textContent =""
            
        }
        else{
            messageOne.textContent = "Location is " + data.place
            messageTwo.textContent = "Current temperature in "+ data.place + " is " + data.temperature
            
        }
    })
})
})

// https://localhost:3000/weather?address=hyderabad
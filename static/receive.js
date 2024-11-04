let chosen_meal = null
function highlight_meal(selectedmeal){
    //remove highlight from other meals
    let meals = document.querySelectorAll(".meal")
    
    //loop through every single meal and remove highlight
    meals.forEach(meal => meal.classList.remove("highlight"))
    
    // add highlight class to select meal
    selectedmeal.classList.add("highlight")
    let mealname = selectedmeal.querySelector("h3")
    chosen_meal = mealname.textContent
}

let xhr = null
getXmlHttpRequestObject = function(){
    if(!xhr){
        xhr = new XMLHttpRequest()
    }

    return xhr
}
function SendReceiveData(e){
    e.preventDefault()
    let nameinput = document.getElementById("full-name").value
    console.log(nameinput)

    let emailinput = document.getElementById("email-add").value
    console.log(emailinput)

    let address = document.getElementById("address").value
    console.log(address)

    let cityinput = document.getElementById("city").value
    console.log(cityinput)

    let state = document.getElementById("state").value
    console.log(state)

    let zipcode = document.getElementById("zipcode").value
    console.log(zipcode)
    console.log(chosen_meal)

    let confirmation_receive = document.getElementById("confirm_receive")
    confirmation_receive.innerHTML = ""

    //Send Data to backend using PostRequest method  
    //allows us to send data to backend using http postrequest
    xhr = getXmlHttpRequestObject()

    //Send postresquest
    xhr.open("POST","http://127.0.0.1:8000/views/receive",true)
    xhr.onload = function(){
        if (xhr.status === 200){
            confirmation_receive.innerHTML = "Your information has been sent! Thank you!"
            confirmation_receive.style.color = "green"
        }
        else{
            confirmation_receive.innerHTML = "Upload failed! Please try again!"
            confirmation_receive.style.color = "red"
        }
    }

    xhr.setRequestHeader("Accept","application/json")
    xhr.setRequestHeader("Content-Type","application/json")

    //attach (staple) data to request
    //JSON IS A DICTIONARY. (NAME OF DATA AND DATA)
    xhr.send(JSON.stringify({
        "meal-name": chosen_meal,
        "name": nameinput, 
        "email": emailinput, 
        "address": address,
        "city": cityinput, 
        "state": state, 
       "zipcode": zipcode }))


}






document.getElementById("send").addEventListener("click", SendReceiveData)

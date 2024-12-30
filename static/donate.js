const local = true

// Create object to send requests//
let xhr = null
getXmlHttpRequestObject = function(){
    if (!xhr){
        //create a new http request object if it doesn't exist already
        xhr = new XMLHttpRequest()
    }
    return xhr
}
function SendDonateData(e){ 
    e.preventDefault() 
    let foodname = []
    let foodweight = []
    //get input values from input field//
    let bfullname = document.getElementById("b-full-name").value
    console.log(bfullname)

    let bemailinput = document.getElementById("b-email").value
    console.log(bemailinput)

    let baddress = document.getElementById("b-address").value
    console.log(baddress)

    let dname = document.getElementsByClassName("food-name")
    let dweight = document.getElementsByClassName("food-weight")
    Array.from(dname).forEach(element => {
        console.log(element.value)
        foodname.push(element.value)
    });
    Array.from(dweight).forEach(element => {
        console.log(element.value)
        foodweight.push(element.value)
    });
    //console.log(dname)

    let dimageinput = document.getElementById("donation-image")
    console.log(dimageinput)
    //get image from input field
    let file = dimageinput.files[0]
    console.log(file)

    let allergies = document.getElementById("alle-rgies").value
    console.log(allergies)

    let confirm_message = document.getElementById("confirmation")
    let confirmation_done = document.getElementById("confirmation_done")

    if (!file){
        confirm_message.innerHTML = "Please select a meal image!"
        confirm_message.style.color = "red"
        return 
    }
    //clear old messages
    confirm_message.innerHTML = ""
    confirmation_done.innerHTML = ""

    const formdata = new FormData()
    
    //attach (staple) data to request
    //JSON IS A DICTIONARY. (NAME OF DATA AND DATA)
    formdata.append("image",file)
    formdata.append("data",JSON.stringify({ "business-name": bfullname, 
                                            "business-email": bemailinput,
                                            "business-location": baddress,  
                                            "donation-name": foodname, 
                                            "donation-weight": foodweight, 
                                            "allergies": allergies }))

    //Send Data to backend using PostRequest method  
    //allows us to send data to backend using http postrequest
    xhr = getXmlHttpRequestObject()

    //Send postresquest
    if(local){
        xhr.open("POST","http://127.0.0.1:8000/views/donate",true)
    }
    else{
        xhr.open("POST","https://businessmealshare.onrender.com/views/donate",true)
    }
    
    
    xhr.onload = function(){
        if (xhr.status === 200){
            confirmation_done.innerHTML = "Your information has been sent! Thank you!"
            confirmation_done.style.color = "green"
        }
        else{
            confirmation_done.innerHTML = "File upload failed! Please try again!"
            confirmation_done.style.color = "red"
        }
    }
    
    xhr.send(formdata)

}

document.getElementById("add-row").addEventListener("click",function(event){
    const list = document.getElementById("List")
    const div = document.createElement("div")
    div.className = "list-item"
    div.id = "list-item"
    list.appendChild(div)
    const nameinput = document.createElement("input")
    const weightinput = document.createElement("input")
    nameinput.type = "text"
    weightinput.type = "text"
    weightinput.name = "list-item"
    nameinput.name = "list-item"
    nameinput.className = "form-control food-item"
    weightinput.className = "form-control food-item"
    weightinput.id = "weight"
    nameinput.id = "item"
    nameinput.placeholder = "Apples"
    weightinput.placeholder = "50lbs"
        
        
    div.appendChild(nameinput)
    div.appendChild(weightinput)
    

    
    
    

/*list.innerHTML += `
    <div class="list-item" id="list-item">
        <input type="text" name="list-item" class="form-control" id = "item" placeholder="Apples">
        <input type="text" name="list-item" class="form-control" id = "weight" placeholder="200lbs">
    </div>
    `*/
})


//Send user to main page (back button)
document.getElementById("back-donate").addEventListener("click",function(event){
    if(local){
        window.location.href = "http://127.0.0.1:8000/views/"
    }
    else{
         window.location.href = "https://businessmealshare.onrender.com/views/"
         
    }
   
})

document.getElementById("send").addEventListener("click", SendDonateData)
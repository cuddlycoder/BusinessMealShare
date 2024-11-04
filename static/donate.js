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
    //get input values from input field//
    let bfullname = document.getElementById("b-full-name").value
    console.log(bfullname)

    let bemailinput = document.getElementById("b-email").value
    console.log(bemailinput)

    let baddress = document.getElementById("b-address").value
    console.log(baddress)

    let dlist = document.getElementById("donatelist-input").value
    console.log(dlist)

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
                                            "donation-name": dlist,  
                                            "allergies": allergies }))

    //Send Data to backend using PostRequest method  
    //allows us to send data to backend using http postrequest
    xhr = getXmlHttpRequestObject()

    //Send postresquest
    xhr.open("POST","http://127.0.0.1:8000/views/donate",true)
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




document.getElementById("send").addEventListener("click", SendDonateData)

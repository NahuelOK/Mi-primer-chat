console.log("init my chat")
let socket

let user = sessionStorage.getItem("user") || ""
if(user){
    document.querySelector("#username").innerHTML = user + " : "
    initIO()
}else{
    Swal.fire({
        title: "Ingresá un nombre!!!",
        input: "text",
        text: "Poné un nombre de usuario para chatear!",
        inputValidator: value=>{
            return !value.trim() && "Por favor, ponga un nombre de usuario"
        },
        allowOutsideClick: false 
    }).then(result =>{
        user = result.value;
        document.querySelector("#username").innerHTML = user + " : "
        sessionStorage.setItem("user", user)
        initIO()
    })
}

const inputt = document.querySelector("#chatinput")
inputt.addEventListener("keyup", event =>{
    if(event.key === "Enter"){
        sendMenssage(event.currentTarget.value)
    }  
})

document.querySelector("#send").addEventListener("click", event =>{
        sendMenssage(inputt.value)
})

function sendMenssage(message){
if(message.trim().length > 0){
    socket.emit("message", { user, message })}
    inputt.value = ""
}

function initIO(){
    socket = io()
    socket.on("logs", messages =>{
        const box = document.querySelector("#chatbox")
        let html = ""
        
        messages.reverse().forEach(message => {
            html += `<p><i>${message.user}</i>: ${message.message}</p>`   
        });
        box.innerHTML = html;
    })
}




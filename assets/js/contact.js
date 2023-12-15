function sendEmail(){
    var params = {
        from_name:document.getElementById("Name").value,
        email_id:document.getElementById("Email").value,
        number:document.getElementById("phone").value,
        message:document.getElementById("message").value,
    }
    emailjs.send("service_ms1hiwp","template_e7wa7ls",params).then(function(res){
        
    }).then(function openPopup(){
        popup.classList.add("open-popup");
       
    })
    
}
let popup = document.getElementById("popup")

function closePopup() {
popup.classList.remove("open-popup");
}
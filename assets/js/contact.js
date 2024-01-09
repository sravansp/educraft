// function validateForm() {
//     var name = document.getElementById("Name").value;
//     var email = document.getElementById("Email").value;
//     var phone = document.getElementById("phone").value;
//     var message = document.getElementById("message").value;

//     // Clear previous error messages
//     clearErrorMessages();

//     var isValid = true;

//     // Simple validation for each field
//     if (name.trim() === "") {
//         displayErrorMessage("nameError", "Please enter your name");
//         isValid = false;
//     }

//     if (email.trim() === "") {
//         displayErrorMessage("emailError", "Please enter your email address");
//         isValid = false;
//     } else {
//         // Email validation using a regular expression
//         var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             displayErrorMessage("emailError", "Please enter a valid email address");
//             isValid = false;
//         }
//     }

//     if (phone.trim() === "") {
//         displayErrorMessage("phoneError", "Please enter your phone number");
//         isValid = false;
//     } else {
//         // Phone number validation (you can customize based on your requirements)
//         var phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
//         if (!phoneRegex.test(phone)) {
//             displayErrorMessage("phoneError", "Please enter a valid phone number");
//             isValid = false;
//         }
//     }

//     if (message.trim() === "") {
//         displayErrorMessage("messageError", "Please enter your message");
//         isValid = false;
//     }

//     // Additional validations can be added based on your specific requirements

//     // If all validations pass, return true to submit the form
//     return isValid;
// }

// function displayErrorMessage(id, message) {
//     var errorElement = document.getElementById(id);
//     errorElement.innerHTML = message;
//     errorElement.style.display = "block";
// }

// function clearErrorMessages() {
//     var errorElements = document.querySelectorAll(".error-message");
//     errorElements.forEach(function (element) {
//         element.innerHTML = "";
//         element.style.display = "none";
//     });
// }



// function sendEmail(){
//     var params = {
//         from_name:document.getElementById("Name").value,
//         email_id:document.getElementById("Email").value,
//         number:document.getElementById("phone").value,
//         message:document.getElementById("message").value,
//     }
//     emailjs.send("service_ms1hiwp","template_e7wa7ls",params).then(function(res){
        
//     }).then(
//         function openPopup(){
//         popup.classList.add("open-popup");
       
//     })
    
// }
// let popup = document.getElementById("popup")

// function closePopup() {
// popup.classList.remove("open-popup");
// }

function validateForm() {
    var name = document.getElementById("Name").value;
    var email = document.getElementById("Email").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;

    // Clear previous error messages
    clearErrorMessages();

    var isValid = true;

    // Simple validation for each field
    if (name.trim() === "") {
        displayErrorMessage("nameError", "Please enter your name");
        isValid = false;
    }

    if (email.trim() === "") {
        displayErrorMessage("emailError", "Please enter your email address");
        isValid = false;
    } else {
        // Email validation using a regular expression
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayErrorMessage("emailError", "Please enter a valid email address");
            isValid = false;
        }
    }

    if (phone.trim() === "") {
        displayErrorMessage("phoneError", "Please enter your phone number");
        isValid = false;
    } else {
        // Phone number validation (you can customize based on your requirements)
        var phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
        if (!phoneRegex.test(phone)) {
            displayErrorMessage("phoneError", "Please enter a valid phone number");
            isValid = false;
        }
    }

    if (message.trim() === "") {
        displayErrorMessage("messageError", "Please enter your message");
        isValid = false;
    }

    // Additional validations can be added based on your specific requirements

    // If all validations pass, return true to submit the form
    return isValid;
}

function displayErrorMessage(id, message) {
    var errorElement = document.getElementById(id);
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
}

function clearErrorMessages() {
    var errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(function (element) {
        element.innerHTML = "";
        element.style.display = "none";
    });
}

function sendEmail() {
    var params = {
        from_name: document.getElementById("Name").value,
        email_id: document.getElementById("Email").value,
        number: document.getElementById("phone").value,
        message: document.getElementById("message").value,
    }

    emailjs.send("service_ms1hiwp","template_e7wa7ls", params)
        .then(function (res) {
            // Handle success, if needed
            console.log("Email sent successfully");
            openPopup();
            resetForm();
        })
        .catch(function (error) {
            // Handle error
            console.error("Error sending email:", error);
        });

    // Return false to prevent the form from submitting (handled by onsubmit attribute)
    return false;
}

function openPopup() {
    var popup = document.getElementById("popup");
    popup.classList.add("open-popup");
}

function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
}

function resetForm() {
    document.getElementById("myForm").reset();
    clearErrorMessages();
}
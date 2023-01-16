const name__modal = document.querySelector("#recipient-name");
const email__modal = document.querySelector("#recipient-email");
const message__modal = document.querySelector("#message-text");
const response = document.querySelector("#message-response")
const form__modal = document.querySelector("#modal__form")
const submit__modal = document.querySelector("#send-button")
submit__modal.addEventListener("click", function(event){
    event.preventDefault();
    if(name__modal.value == "" || email__modal.value == "" || message__modal.value == ""){       
        response.textContent = "Please fill all the fields";
    } else {
        response.textContent = "Thank you ❤️ We received your message";
        form__modal.reset()
    }
});

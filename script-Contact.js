const name__modal = document.querySelector("#recipient-name");
const email__modal = document.querySelector("#recipient-email");
const message__modal = document.querySelector("#message-text");
const response = document.querySelector("#message-response");
const form__modal = document.querySelector("#modal__form");
const submit__modal = document.querySelector("#send-button");

emailjs.init('F_vkpuNCc8ID-M7eD'); // public api key

submit__modal.addEventListener("click", function(event){
    event.preventDefault();
    if(name__modal.value == "" || email__modal.value == "" || message__modal.value == ""){       
        response.textContent = "Please fill all the fields";
    } else {
        emailjs.sendForm("service_nj48cb8", "template_vandhana", modal__form)
        .then(function(response) {
            console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        }, function(error) {
            console.log("FAILED. error=", error);
        });
        response.textContent = "Thank you ❤️ We received your message";
        form__modal.reset()
    }
});
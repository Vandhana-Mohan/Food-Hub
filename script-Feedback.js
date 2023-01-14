function changeStar(star) {
    let stars = star.parentElement.children;
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.add("hovered");
      if (stars[i] === star) {
        break;
      }
    }
  }
  
  function resetStar(star) {
    let stars = star.parentElement.children;
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove("hovered");
    }
  }
  
  function selectStar(star) {
    let stars = star.parentElement.children;
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove("selected");
      if (stars[i] === star) {
        break;
      }
    }
    for (let i = 0; i < stars.length; i++) {
      stars[i].classList.add("selected");
      if (stars[i] === star) {
        break;
      }
    }
  }
  

const form = document.querySelector(".feedback");
// const submitButton = form.querySelector("input[type='submit']");
const submitButton = form.querySelector("#review");
const feedbackMessage = document.querySelector(".feedback-message");

submitButton.addEventListener("click", (event) => {
  event.preventDefault(); // prevent the form from submitting
  const formData = {};
  
  const formElements = form.querySelectorAll("input, textarea, .form-check-input"); // Select all input fields, textarea, and radio buttons
  
  const starRating = document.getElementById("star-rating"); // select the star-rating div
  
  const stars = starRating.getElementsByTagName("i"); // get all the stars
  
  let selectedStars = 0; // loop through the stars and check if it has the class "selected"
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].classList.contains("selected")) {
      selectedStars++;
    }
  }
  formData["star-rating"] = selectedStars;
  formElements.forEach((formElement) => {
    if (formElement.type === "radio" && formElement.checked === false) {
    return;
    }
    formData[formElement.name] = formElement.value;
    });
    
    Object.keys(formData).forEach((key) => { // Store the form data in local storage
    localStorage.setItem(key, formData[key]);
    });

    feedbackMessage.innerHTML = `Thank you for your feedback!`;
const reviewItem = document.createElement("div");
reviewItem.classList.add("review-item");
reviewItem.innerHTML = `<p>Name: ${formData["name"]}</p> 
                        <p>Email: ${formData["email"]}</p> 
                        <p>Found what they were looking for: ${formData["find"]}</p> 
                        <p>Visit Reason: ${formData["visit"]}</p> 
                        <p>Star Rating: ${formData["star-rating"]}</p> 
                        <p>Additional Comments: ${formData["comments"]}</p>`;
document.querySelector(".container-fluid").appendChild(reviewItem);
  })
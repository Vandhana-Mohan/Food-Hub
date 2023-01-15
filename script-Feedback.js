// Selects the form element and the submit button from the HTML.
const form = document.querySelector("form.feedback");
const submitButton = form.querySelector("#review");
const feedbackMessage = document.querySelector(".feedback-message");
const reviewsContainer = document.querySelector(".review-items");
let reviewsData = JSON.parse(localStorage.getItem("reviewsData")) || [];
// selects the div with the id "star-rating" and all the "i" tags within it, and stores them in a variable called "stars".
const starRating = document.querySelector("#star");
const stars = starRating.querySelectorAll("i");
// initializes a variable "selectedStars" to 0. This variable will store the number of selected stars from the "star-rating" div.
let selectedStars = 0;
// Function to handle hover effect on the star rating
function changeStar(star) {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.add("hovered");
    if (stars[i] === star) {
      break;
    }
  }
}
// Function to handle resetting the hover effect on the star rating
function resetStar(star) {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("hovered");
  }
}
// Function to handle selecting a star rating
function selectStar(star) {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("selected");
    if (stars[i] === star) {
      break;
    }
  }
  star.classList.add("selected");
  selectedStars = 0;
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].classList.contains("selected")) {
      selectedStars = i + 1;
    }
  }
  return selectedStars;
}
//add event listener to all stars
for(let i = 0; i < stars.length; i++){
  stars[i].addEventListener("mouseover", function(){changeStar(this)});
  stars[i].addEventListener("mouseout", function(){resetStar(this)});
  stars[i].addEventListener("click", function(){selectStar(this)});
}
// Function to check if the email is in correct format
function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// Handle form submission
form.addEventListener("submit", function(event) {
  event.preventDefault();
  // Create an object to store form data - All validations are passed, proceed to store data in local storage
  const formData = {
    name: form.elements.name.value,
    email: form.elements.email.value,
    starRating: selectedStars,
    comments: form.elements.comments.value || '',
  };
  // check if the required fields are filled and email is valid
  if(!form.elements.name.value){
    feedbackMessage.textContent = "Please fill name - it's a required field.";
    return;
  } 
  if(!form.elements.email.value || !isValidEmail(form.elements.email.value)){
    feedbackMessage.textContent = "Please fill a valid email - it's a required field.";
    return;
  }
  if(selectedStars === 0){
    feedbackMessage.textContent = "Please select a star rating - it's a required field.";
    return;
  }
  // Store the form data in local storage
  reviewsData.push(formData);
  localStorage.setItem("reviewsData", JSON.stringify(reviewsData));
  // Display the form data in a table
  const tr = document.createElement("tr");
  tr.innerHTML = 
  `<td>${formData.name}</td>
  <td>${formData.email}</td>
  <td>${formData.starRating}</td>
  <td>${formData.comments}</td>
  <td><button class="delete-btn">Delete</button></td>`;
  reviewsContainer.appendChild(tr);
  // Show thank you message and reset the form
  
  form.reset(); // Reset form fields
  // reset selected stars
  selectedStars = 0;
  stars.forEach(star => star.classList.remove("selected"));
  feedbackMessage.textContent = ""
  // Add event listener to delete button
  const deleteBtn = tr.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function() {
    tr.remove();
    const index = reviewsData.indexOf(formData);
    reviewsData.splice(index, 1);
    localStorage.setItem("reviewsData", JSON.stringify(reviewsData));
  });
});
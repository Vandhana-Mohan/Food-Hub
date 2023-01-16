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

// Function to reset the stars to their initial state
function resetStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove("selected", "hovered");
  }
  selectedStars = 0;
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

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", function(){
    feedbackMessage.textContent = "";
    resetStars();
    form.reset();
});


// Function to display reviews from local storage
function displayReviews() {
  // Retrieve reviews data from local storage
  let reviewsData = JSON.parse(localStorage.getItem("reviewsData")) || [];
  // Remove existing table rows
  while (reviewsContainer.firstChild) {
    reviewsContainer.removeChild(reviewsContainer.firstChild);
  }
  // Iterate through the reviews data and create table rows and cells
  for (let i = 0; i < reviewsData.length; i++) {
    // Create a table row
    const row = document.createElement("tr");
    // Create cells for name, email, star rating, and comments
    const nameCell = document.createElement("td");
    nameCell.textContent = reviewsData[i].name;
    const starCell = document.createElement("td");
    starCell.textContent = reviewsData[i].starRating;
    const commentCell = document.createElement("td");
    commentCell.textContent = reviewsData[i].comments;
    
    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("data-index", i);

    // set style for rows
    nameCell.classList.add("name-cell");
    starCell.classList.add("star-cell");
    commentCell.classList.add("comment-cell");
    
    // Append cells and button to the row
    row.appendChild(nameCell);
    row.appendChild(starCell);
    row.appendChild(commentCell);
    row.appendChild(deleteButton);
    // Append the row to the reviews container table
    reviewsContainer.appendChild(row);
  }
  // Add event listener to the delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function() {
      const index = this.getAttribute("data-index");
      reviewsData.splice(index, 1);
      localStorage.setItem("reviewsData", JSON.stringify(reviewsData));
      displayReviews();
    });
  }
}

// Handle form submission
submitButton.addEventListener("click", function(event) {
  event.preventDefault();
  // Create an object to store form data - All validations are passed, proceed to store data in local storage
  const formData = {
    name: form.elements.name.value,
    email:form.elements.email.value,
    starRating: selectedStars,
    comments: form.elements.comments.value || '',
  };
    // check if the required fields are filled and email is valid
    if (formData.email && !isValidEmail(form.elements.email.value)) {
      feedbackMessage.textContent = "Please fill a valid email";
      return;
    }
    if (!formData.comments){
      feedbackMessage.textContent = "Please leave a comment - it's a required field.";
      return;
    }
    if (selectedStars === 0) {
      feedbackMessage.textContent = "Please select a star ⭐️ rating - it's a required field.";
      return;
    }
    // All validations are passed, proceed to store data in local storage
    reviewsData.push(formData);
    localStorage.setItem("reviewsData", JSON.stringify(reviewsData)); // Store the reviews data array in local storage
    // reset the form and stars
    resetForm();
    selectedStars = 0;
    // Display the reviews
    displayReviews();
    feedbackMessage.textContent = "";
});
    
// Call the displayReviews function on page load
window.onload = function() {
    displayReviews();
}

function resetForm(){
  feedbackMessage.textContent = "";
  resetStars();
  form.reset();
}
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
  
// Selects the form element and the submit button from the HTML.
const form = document.querySelector(".feedback");
const submitButton = form.querySelector("#review");
const feedbackMessage = document.querySelector(".feedback-message");
//Adds an event listener to the submit button that listens for a click event.
submitButton.addEventListener("click", (event) => {
  event.preventDefault(); //prevents the default form submission behavior.
  const formData = {}; //creates an empty object called "formData" that will store the data from the form fields.

  //selects all the input, textarea, and form-check-input elements within the form and stores them in a variable called "formElements".
  const formElements = form.querySelectorAll("input, textarea, .form-check-input");
  //selects the div with the id "star-rating" and all the "i" tags within it, and stores them in a variable called "stars".
  const starRating = document.getElementById("star-rating");
  const stars = starRating.getElementsByTagName("i");
  // initializes a variable "selectedStars" to 0. This variable will store the number of selected stars from the "star-rating" div.
  let selectedStars = 0;

  //loops through all the "i" tags (stars) and checks if each one has the class "selected". If it does, it increments the "selectedStars" variable by 1.
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].classList.contains("selected")) {
      selectedStars++;
    }
  }
// adds the "star-rating" key to the "formData" object and assigns it the value of "selectedStars".
  formData["star-rating"] = selectedStars;
  //loops through all the form elements and adds each one's name and value to the "formData" object.
  formElements.forEach((formElement) => {
    if (formElement.type === "radio" && formElement.checked === false) {
      return;
    }
    formData[formElement.name] = formElement.value;
  });
//sets the innerHTML of the "feedbackMessage" element to "Thank you for your feedback!"
  feedbackMessage.innerHTML = `<h5> Thank you! We Appreciate your feedback ❤️ </h5>`;

// Add event listener for the delete button
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    const index = event.target.dataset.index;
    reviewData.splice(index, 1); // remove the item from the array
    localStorage.setItem("reviewData", JSON.stringify(reviewData)); // update the local storage
    renderReviews(); // re-render the reviews
  }
});
}) 
  // Function to render the reviews
  function renderReviews() {
    const container = document.querySelector(".container-fluid");
  
    // Clear the existing reviews
    container.querySelectorAll(".review-item").forEach((review) => review.remove());
    
    // Create a table element for the reviews
    const table = document.createElement("table");
    table.classList.add("feedback-table");
    
    // Create the table head
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");
    headRow.innerHTML = `<th>Name</th> <th>Email</th> <th>Found what they were looking for</th> <th>Visit Reason</th> <th>Star Rating</th> <th>Additional Comments</th> <th>Actions</th>`;
    thead.appendChild(headRow);
    table.appendChild(thead);
    
    // Create the table body
    const tbody = document.createElement("tbody");
    reviewData.forEach((review, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${review.name}</td>
                      <td>${review.email}</td>
                      <td>${review.find}</td>
                      <td>${review.visit}</td>
                      <td>${review["star-rating"]}</td>
                      <td>${review.comments}</td>
                      <td><button class="btn btn-danger btn-delete" data-index="${index}">Delete</button></td>`;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    // Append the table to the container
    container.appendChild(table);
 }

  // check if there is any review data in local storage and display it
  const reviewData = JSON.parse(localStorage.getItem("reviewData")) || [];
  if (reviewData.length > 0) {
    renderReviews();
  }




/* this works - dont delete until table works */

// const reviewData = JSON.parse(localStorage.getItem("reviewData"));
//If there is data stored, it creates a new div element with the class "review-item" and sets its innerHTML to be a string that includes the data from the "reviewData" object stored in local storage.
// if (reviewData) {
  //appends the "review-item" div element to the "container-fluid" div element, displaying the user's feedback in the form of a new review. The local storage is also checked in the last block of code to see if there is any existing review data. If there is, it creates a new "review-item" div element and appends it to the "container-fluid" div element, displaying the existing review data.
//   const reviewItem = document.createElement("div");
//   reviewItem.classList.add("review-item");
//   reviewItem.innerHTML = `<p>Name: ${reviewData["name"]}</p> <p>Email: ${reviewData["email"]}</p> <p>Found what they were looking for: ${reviewData["find"]}</p> <p>Visit Reason: ${reviewData["visit"]}</p> <p>Star Rating: ${reviewData["star-rating"]}</p> <p>Additional Comments: ${reviewData["comments"]}</p>`;
//   document.querySelector(".container-fluid").appendChild(reviewItem);
// }

//creates a new div element with the class "review-item" and sets its innerHTML to be a string that includes the data from the "formData" object.
  // const reviewItem = document.createElement("div");
  // reviewItem.classList.add("review-item");
  // reviewItem.innerHTML = `<p>Name: ${formData["name"]}</p> <p>Email: ${formData["email"]}</p> <p>Found what they were looking for: ${formData["find"]}</p> <p>Visit Reason: ${formData["visit"]}</p> <p>Star Rating: ${formData["star-rating"]}</p> <p>Additional Comments: ${formData["comments"]}</p>`;
  //appends the "review-item" div to the element with the class "container-fluid"
  // document.querySelector(".container-fluid").appendChild(reviewItem);
  

// store the review data in local storage -- stores the "formData" object in local storage as a string under the key "reviewData"
// localStorage.setItem("reviewData", JSON.stringify(formData));
// });

// check if there is any review data in local storage and display it --checks if there is any data stored in local storage under the key "reviewData"
// const reviewsData = JSON.parse(localStorage.getItem("reviewData"));
//If there is data stored, it creates a new div element with the class "review-item" and sets its innerHTML to be a string that includes the data from the "reviewData" object stored in local storage.
// if (reviewsData) {
// const reviewItems = document.querySelector(".review-items");
//   for (let i = 0; i < reviewsData.length; i++) {
//     const reviewItem = document.createElement("tr");
//     reviewItem.innerHTML = `
//       <td>${reviewsData[i].name}</td>
//       <td>${reviewsData[i].email}</td>
//       <td>${reviewsData[i].find}</td>
//       <td>${reviewsData[i].visit}</td>
//       <td>${reviewsData[i].starRating}</td>
//       <td>${reviewsData[i].comments}</td>
//       <td><button class="btn-delete" data-index=${i}>Delete</button></td>
//     `;
//     reviewItems.appendChild(reviewItem);
//   }
// }

// check if there is any review data in local storage and display it
  // const reviewData = JSON.parse(localStorage.getItem("reviewData")) || [];
  // if (reviewData.length > 0) {
  // renderReviews();
  // }
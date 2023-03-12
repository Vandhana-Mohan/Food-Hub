const searchForm = document.querySelector(".foodHub__search__form");
const searchResultDiv = document.querySelector(".foodHub__search__result");
const container = document.querySelector(".foodHub__container");
const recipeContainer = document.querySelector(".foodHub__videos")
const pagination = document.querySelector('ul');
const heading = document.querySelector(".foodHub__recommendation")
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.previous');
const searchInput = document.querySelector(".foodHub__search__input");
const clearBtn = document.querySelector(".clear-btn");
const searchIcon = document.querySelector(".fa-search");
let searchQuery = "";
let currentPage = 1;

// const APP_ID = '4486cb7f' 
// const APP_KEY = '07ca8aa9c321a1980cc6b75d4326acb8' 

searchInput.addEventListener("input", () => {
  if (searchInput.value) {
    clearBtn.style.display = "block";
  } else {
    clearBtn.style.display = "none";
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchAPI(currentPage);
});

prevBtn.addEventListener('click', () => {
  currentPage--;
  fetchAPI(currentPage);
});

window.addEventListener("beforeunload", () => {
  searchInput.value = "";
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.querySelector("input").value;
  currentPage = 1;
  fetchAPI(currentPage);
  // Hide the recommended heading and images
  heading.classList.add("hidden");
  recipeContainer.classList.add("hidden");
});

searchIcon.addEventListener("click", (event) => {
  event.preventDefault();
  searchQuery = searchInput.value;
  currentPage = 1;
  fetchAPI(currentPage);
  // Hide the recommended heading and images
  heading.classList.add("hidden");
  recipeContainer.classList.add("hidden");
});

async function fetchAPI(currentPage) {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${(currentPage-1)*12}&to=${currentPage*12}`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}

function generateHTML(results) {
  container.classList.remove("foodHub__initial");
  pagination.classList.remove("hidden")
  searchResultDiv.classList.remove("hidden")
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += 
    `<div class="foodHub__search__result__item">
        <img class="foodHub__search__result__image" src="${result.recipe.image}" alt="img">
        <div class="foodHub__search__result__content">
          <h1 class="foodHub__search__result__title">${result.recipe.label}</h1>
          <a class="foodHub__search__result__link" target="_blank" href="${result.recipe.url}">View Recipe</a>
        </div>
      </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
//<a class="foodHub__search__result__link" target="_blank" href="">More Info...</a>
//<p class="foodHub__search__result__data">Calories: ${result.recipe.calories.toFixed(2)}</p> */}
//<p class="foodHub__search__result__data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p>
//<p class="foodHub__search__result__data">Health labels: ${result.recipe.healthLabels}</p>

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";
});

async function fetchInitialRecipes() {
  // Generate a random ingredient
  const randomIngredient = generateRandomIngredient();
  const baseURL = `https://api.edamam.com/search?q=${randomIngredient}&app_id=${APP_ID}&app_key=${APP_KEY}&to=15`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateRecipes(data.hits);
  heading.classList.remove("hidden");
  recipeContainer.classList.remove("hidden");
}

function generateRandomIngredient() {
  const ingredients = ['chicken', 'potato', 'beef', 'pork', 'tomato', 'spinach', 'carrot', 'onion','dessert','cookies','pie', 'egg','cheese','donut'];
  const randomIndex = Math.floor(Math.random() * ingredients.length);
  return ingredients[randomIndex];
}

function generateRecipes(data) {
  let generatedRecipes = "";
  data.map((recipe) => {
    generatedRecipes += 
      `<div class="foodHub__search__result__item">
          <a href="${recipe.recipe.url}" target="_blank">
            <img class="foodHub__search__result__image" src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
          </a>
          <div class="foodHub__search__result__content">
            <h4 class="foodHub__search__result__title">${recipe.recipe.label}</h4>
          </div>
       </div>`;
  });
  recipeContainer.innerHTML = generatedRecipes;
}
window.onload = fetchInitialRecipes();
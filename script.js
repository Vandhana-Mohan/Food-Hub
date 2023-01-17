const searchForm = document.querySelector(".foodHub__search__form");
const searchResultDiv = document.querySelector(".foodHub__search__result");
const container = document.querySelector(".foodHub__container");
const recipeContainer = document.querySelector(".foodHub__videos")
const pagination = document.querySelector('ul');
const heading = document.querySelector("foodHub__recommendation")


let searchQuery = "";
const APP_ID = "4486cb7f";
const APP_key = "07ca8aa9c321a1980cc6b75d4326acb8";

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=1000`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("foodHub__initial");
  pagination.classList.remove("hidden")
  heading.classList.toggle("hidden")
  recipeContainer.classList.toggle("hidden")
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

//<p class="foodHub__search__result__data">Calories: ${result.recipe.calories.toFixed(2)}</p> */}
//<p class="foodHub__search__result__data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p>
//<p class="foodHub__search__result__data">Health labels: ${result.recipe.healthLabels}</p>

function fetchInitialRecipes() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f5ea32695fmsha6dcac8242f9814p1dc272jsn8c0cd080f905',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  // Generate a random ingredient
  const randomIngredient = generateRandomIngredient();

  fetch(`https://tasty.p.rapidapi.com/recipes/list?q=${randomIngredient}`, options)
      .then(response => response.json())
      .then(data => {
         console.log(data)
         generateRecipes(data);
      })
      .catch(error => console.error(error));
}

function generateRandomIngredient() {
  const ingredients = ['chicken', 'potato', 'beef', 'pork', 'tomato', 'spinach', 'carrot', 'onion','dessert','cookie','pie', 'egg','cheese','donut'];
  const randomIndex = Math.floor(Math.random() * ingredients.length);
  return ingredients[randomIndex];
}

function generateRecipes(data) {
  let generatedRecipes = "";
  
  data.results.map((recipe) => {
    generatedRecipes += 
      `<div class="foodHub__search__result__item">
          <img class="foodHub__search__result__image" src="${recipe.thumbnail_url}" alt="${recipe.thumbnail_alt_text}">
          <div class="foodHub__search__result__content">
            <h4 class="foodHub__search__result__title">${recipe.name}</h4>
          </div>
       </div>`;
  });
  recipeContainer.innerHTML = generatedRecipes;
}
// <p class="foodHub__recipes__description">${recipe.description}</p>
// <p class="foodHub__recipes__serving">Servings: ${recipe.servings_noun_plural}</p>
// <p class="foodHub__recipes__time">Total Time: ${recipe.total_time_minutes} minutes</p>
window.onload = fetchInitialRecipes();


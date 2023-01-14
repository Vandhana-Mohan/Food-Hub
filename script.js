const searchForm = document.querySelector(".foodHub__search__form");
const searchResultDiv = document.querySelector(".foodHub__search__result");
const container = document.querySelector(".foodHub__container");
let searchQuery = "";
const APP_ID = "4486cb7f";
const APP_key = "07ca8aa9c321a1980cc6b75d4326acb8";

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("foodHub__initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += 
    `<div class="foodHub__search__result__item">
        <img class="foodHub__search__result__image" src="${result.recipe.image}" alt="img">
        <div class="foodHub__search__result__content">
          <h1 class="foodHub__search__result__title">${result.recipe.label}</h1>
          <a class="foodHub__search__result__link" target="_blank" href="${result.recipe.url}">View Recipe</a>
        </div>
        <p class="foodHub__search__result__data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="foodHub__search__result__data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p>
        <p class="foodHub__search__result__data">Health labels: ${result.recipe.healthLabels}</p>
      </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

document.querySelector('.first-button').addEventListener('click', function () {

  document.querySelector('.animated-icon1').classList.toggle('open');
  });
  document.querySelector('.second-button').addEventListener('click', function () {
  
  document.querySelector('.animated-icon2').classList.toggle('open');
  });
  document.querySelector('.third-button').addEventListener('click', function () {
  
  document.querySelector('.animated-icon3').classList.toggle('open');
  });
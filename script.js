const searchForm = document.querySelector(".foodHub__search__form");
const searchResultDiv = document.querySelector(".foodHub__search__result");
const container = document.querySelector(".foodHub__container");
const videoContainer = document.querySelector(".foodHub__videos")
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
      </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

function fetchInitialVideos() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f5ea32695fmsha6dcac8242f9814p1dc272jsn8c0cd080f905',
      'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
  };

  fetch('https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken', options)
      .then(response => response.json())
      .then(data => {
        console.log(data)
          generateVideo(data);
      })
      .catch(error => console.error(error));
}

function generateVideo(data) {
  let generatedvideo = "";
  data.results.map((video) => {
    generatedvideo += 
    `<div class="foodHub__videos__item">
    <video width="320" height="240" controls>
      <source src="${video.video_url}" type="video/mp4">
      <source src="${video.original_video_url}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <h1 class="foodHub__videos__title">${video.keywords}</h1>
    <p class="foodHub__videos__description">${video.draft_status}</p>
</div>`;
});
    videoContainer.innerHTML = generatedvideo;
}

window.onload = fetchInitialVideos();

//<p class="foodHub__search__result__data">Calories: ${result.recipe.calories.toFixed(2)}</p> */}
//<p class="foodHub__search__result__data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : "No Data Found"}</p>
//<p class="foodHub__search__result__data">Health labels: ${result.recipe.healthLabels}</p>


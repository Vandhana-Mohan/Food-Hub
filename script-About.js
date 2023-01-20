require('./config');
const imgElement = document.querySelector('#image__center');
const images = document.querySelectorAll('#image__center');
const loadingMessage = document.querySelector('#loading-message');
const APP_ID = process.env.APP_ID_edamam;
const APP_KEY = process.env.APP_key_edamam;

document.addEventListener('DOMContentLoaded', function() {
  const cuisineTypes = ["italian", "chinese", "mexican", "indian", "french", "mediterranean","asian","american"];
  const randomCuisine = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)];
  const ingredients = ["beef", "chicken", "pork", "fish", "vegetables", "tofu", "pizza", "milk", "sugar","cake","pie","icecream"];
  const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
  const baseURL = `https://api.edamam.com/search?q=${randomIngredient}&app_id=${APP_ID}&app_key=${APP_KEY}&cuisine_type=${randomCuisine}`;
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.hits.length === 0) {
          loadingMessage.textContent = "Loading Image...";
        } else {
            for (let i = 0; i < images.length; i++) {
              const randomIndex = Math.floor(Math.random() * data.hits.length);
              const randomImage = data.hits[randomIndex].recipe.image;
              if (!randomImage) {
                loadingMessage.textContent = "Image not found...";
              } else {
                images[i].setAttribute("src", randomImage);
                loadingMessage.textContent = "";
              }
            }
        }
    })
      .catch(error => {
        console.log(error);
        loadingMessage.textContent = "An error occurred while loading the image.";
    });
})
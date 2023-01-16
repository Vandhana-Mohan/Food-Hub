const APP_ID = "4486cb7f";
const APP_key = "07ca8aa9c321a1980cc6b75d4326acb8";
const imgElement = document.querySelector('#image__center');

document.addEventListener('DOMContentLoaded', function() {
    const cuisineTypes = ["italian", "chinese", "mexican", "indian", "french", "mediterranean","asian","american"];
    const randomCuisine = cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)];
    const ingredients = ["beef", "chicken", "pork", "fish", "vegetables", "tofu", "pizza", "milk", "sugar"];
    const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    const baseURL = `https://api.edamam.com/search?q=${randomIngredient}&app_id=${APP_ID}&app_key=${APP_key}&cuisine_type=${randomCuisine}`;

    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        const randomImage = data.hits[randomIndex].recipe.image;
        imgElement.setAttribute("src", randomImage);
    })
      .catch(error => console.log(error));
});
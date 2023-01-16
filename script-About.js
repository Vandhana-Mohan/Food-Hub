const APP_ID = "4486cb7f";
const APP_key = "07ca8aa9c321a1980cc6b75d4326acb8";
const imgElement = document.querySelector('#image__center');

document.addEventListener('DOMContentLoaded', function() {
    const baseURL = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_key}`
    fetch(baseURL)
      .then(response => response.json())
      .then(data => {
        console.log(data.hits[1].recipe.image)
        imgElement.setAttribute("src", `data.hits[1].recipe.image`);
      })
      .catch(error => console.log(error));
});
  
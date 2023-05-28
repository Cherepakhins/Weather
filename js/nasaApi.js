const main = document.querySelector(".main");
const apiKeyNasa = "9S5gSnfoynIPdjs82VwzDL7G5KlejUhrnjRDKBzq";
const urlNasa = `https://api.nasa.gov/planetary/apod?api_key=${apiKeyNasa}`;

fetch(urlNasa)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    {
      const html = `
            <div class="card-nasa">
                <div class="card-nasa-wrapper">
                    <h2 class="card__title card__title-nasa">${data.title}</h2>
                    <span class='card__description card__description-nasa'>${data.explanation}</span>
                    <img src="${data.url}" alt="space" class="img-space">
                </div>
                
            </div>`;
      main.insertAdjacentHTML("beforeend", html);
    }
  });

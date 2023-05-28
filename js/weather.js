const apiKey = "31bc9fcdacc37b494ffc295523a5f668";
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const main = document.querySelector(".main");
const today = new Date();
const day = today.toLocaleDateString();
const time = today.toLocaleTimeString();
const now = day + " " + time;
const hours = today.getHours();

function removeCard() {
  const prevCard = document.querySelector(".card-weather");
  if (prevCard) prevCard.remove();
}

form.onsubmit = function (e) {
  e.preventDefault();
  let city = input.value.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.code === "404") {
        removeCard();

        input.value = "";
        input.focus();

        const html = `
                <div class="card-weather card--active">Город не найден</div>`;
        main.insertAdjacentHTML("afterbegin", html);
      } else {
        removeCard();
        const weatherDescription = data.weather["0"].description;
        const wDescription = weatherDescription.replace(
          weatherDescription[0],
          weatherDescription[0].toUpperCase()
        );

        const html = `
            <div class="card card-weather">
                <div class="today">
                    <span class='day'>${day}</span>
                    <span class='clock'>${time}</span>
                </div>
                <h2 class="card__title">${data.name}<span class="card__GB">${
          data.sys.country
        }</span></h2>
                
                <div class="card__weather">
                    <p class="card__value">${Math.round(
                      data.main.temp
                    )}<sup>°c</sup> </p>
                    <div class="box">
                        <img src="https://openweathermap.org/img/wn/${
                          data.weather["0"].icon
                        }@4x.png" alt="weather" class="card__img">
                    </div>
                </div>
                <div class="card__description">${wDescription}</div>
            </div>`;
        main.insertAdjacentHTML("afterbegin", html);
        input.value = "";
        input.focus();
      }
    });
};

// В зависимости от времени суток изменяем дизайн страницы.
if ((19 < hours && hours < 24) || hours < 7) {
  document.body.classList.add("dark");
} else {
  const isDark = document.body.classList.remove("dark");

  if (isDark) {
    localStorage.setItem("darkMode", "dark");
  } else {
    localStorage.setItem("darkMode", "light");
  }
}

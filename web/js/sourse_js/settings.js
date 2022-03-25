
const ui_settings_block = document.querySelectorAll(".settings-section-block");

const latest_towns = document.querySelector(".latest-towns");
const favorite_towns = document.querySelector(".favorite-towns");
const weather_forecast = document.querySelector(".weather-forecast");
const weather_info = document.querySelector(".weather-other");

const json = require("../json/settings.json");

var forecast_day_status_arr = document.querySelectorAll(".forecast-day__status");

window.addEventListener("load", function() {

    if (!(localStorage.getItem('page-rewritten'))) {
        localStorage.setItem('page-rewritten', false);

        localStorage.setItem("dark-theme", json.ui["theme"]["dark-theme"]);
        localStorage.setItem("display-latest-towns", json.ui["latest-towns"]["display-latest-towns"]);
        localStorage.setItem("display-favorite-towns", json.ui["favorite-towns"]["display-favorite-towns"]);
        localStorage.setItem("display-weather-forecast", json.ui["weather-info"]["display-weather-forecast"]);
        localStorage.setItem("display-additional-info", json.ui["weather-info"]["display-weather-additional-info"]);
        localStorage.setItem("search-autocomplete", json.search["search-autocomplete"]);
        localStorage.setItem("display-search-clear-button", json.search["display-search-clear-button"]);
    }

    if (JSON.parse(localStorage.getItem("dark-theme"))) {
        document.body.setAttribute('theme', "dark");

        forecast_day_status_arr.forEach(element => {
            element.classList.add("dark-icon-theme");
        });

        set_active_atribute("ui-theme");
    } else {
        document.body.setAttribute('theme', "light");

        forecast_day_status_arr.forEach(element => {
            element.classList.add("light-icon-theme");
        });
    }

    if (JSON.parse(localStorage.getItem("display-latest-towns"))) {
        
        set_active_atribute("latest-towns-atr");
    } else {
        latest_towns.classList.add("disactive");
    }

    if (JSON.parse(localStorage.getItem("display-favorite-towns"))) {

        set_active_atribute("favorite-towns-atr");
    } else {
        favorite_towns.classList.add("disactive");
    }

    if (JSON.parse(localStorage.getItem("display-weather-forecast"))) {

        set_active_atribute("weather-forecast-atr");
    } else {
        weather_forecast.classList.add("disactive");
    }

    if (JSON.parse(localStorage.getItem("display-additional-info"))) {

        set_active_atribute("weather-info-atr");
    } else {
        weather_info.classList.add("disactive");
    } 

    if (JSON.parse(localStorage.getItem("search-autocomplete"))) {
        set_active_atribute("search-autocomplete-atr");
    }

    if (JSON.parse(localStorage.getItem("display-search-clear-button"))) {
        set_active_atribute("display-search-clear-button-atr");
    }
});

function set_active_atribute(arg) {
    for (let i = 0; i < ui_settings_block.length; i++) {
        if (ui_settings_block[i].classList.contains(arg)) {
            ui_settings_block[i].classList.add("settings-section-block--active");
        }
    }
}

for (let i = 0; i < ui_settings_block.length; i++) {

    ui_settings_block[i].addEventListener("click", function() {
        localStorage.setItem('page-rewritten', true);

        if (ui_settings_block[i].classList.contains("settings-section-block--active")) {
            ui_settings_block[i].classList.remove("settings-section-block--active")
            if (ui_settings_block[i].classList.contains("ui-theme")) {
                document.body.setAttribute('theme', "light");

                replace_dir_name(/dark_theme/gi, "light_theme", "light");
                localStorage.setItem('dark-theme', false);
            }
            if (ui_settings_block[i].classList.contains("latest-towns-atr")) {
                disactive_element(latest_towns);
                localStorage.setItem('display-latest-towns', false);
            }
            if (ui_settings_block[i].classList.contains("favorite-towns-atr")) {
                disactive_element(favorite_towns);
                localStorage.setItem('display-favorite-towns', false);
            }
            if (ui_settings_block[i].classList.contains("weather-forecast-atr")) {
                disactive_element(weather_forecast);
                localStorage.setItem('display-weather-forecast', false);
            }
            if (ui_settings_block[i].classList.contains("weather-info-atr")) {
                disactive_element(weather_info);
                localStorage.setItem('display-additional-info', false);
            }
            if (ui_settings_block[i].classList.contains("search-autocomplete-atr")) {
                localStorage.setItem('search-autocomplete', false);
            }
            if (ui_settings_block[i].classList.contains("display-search-clear-button-atr")) {
                localStorage.setItem('display-search-clear-button', false);
            }
        } else {
            ui_settings_block[i].classList.add("settings-section-block--active");
            if (ui_settings_block[i].classList.contains("ui-theme")) {
                document.body.setAttribute('theme', "dark");

                replace_dir_name(/light_theme/gi, "dark_theme", "dark");
                localStorage.setItem('dark-theme', true);
            }
            if (ui_settings_block[i].classList.contains("latest-towns-atr")) {
                active_element(latest_towns);
                localStorage.setItem('display-latest-towns', true);
            }
            if (ui_settings_block[i].classList.contains("favorite-towns-atr")) {
                active_element(favorite_towns);
                localStorage.setItem('display-favorite-towns', true);
            }
            if (ui_settings_block[i].classList.contains("weather-forecast-atr")) {
                active_element(weather_forecast);
                localStorage.setItem('display-weather-forecast', true);
            }
            if (ui_settings_block[i].classList.contains("weather-info-atr")) {
                active_element(weather_info);
                localStorage.setItem('display-additional-info', true);
            }
            if (ui_settings_block[i].classList.contains("search-autocomplete-atr")) {
                localStorage.setItem('search-autocomplete', true);
            }
            if (ui_settings_block[i].classList.contains("display-search-clear-button-atr")) {
                localStorage.setItem('display-search-clear-button', true);
            }
        }
    });

}

function replace_dir_name(replace_in, replace_to, theme) {
    forecast_day_status_arr.forEach(element => {

        if (theme == "light") {
            element.classList.remove("dark-icon-theme");
            element.classList.add("light-icon-theme");
        } else if (theme == "dark") {
            element.classList.add("dark-icon-theme");
            element.classList.remove("light-icon-theme");
        }

        let icon_dir = element.style.backgroundImage;
        let exit_dir = icon_dir.replace(replace_in, replace_to);

        element.style.backgroundImage = exit_dir;
    })
}

function disactive_element(element) {
    element.classList.add("disactive-animation");
    let delay = setTimeout(function() {
        element.classList.remove("disactive-animation");
        element.classList.add("disactive");
    }, 100);
}

function active_element(element) {
    if (!(element.classList.contains("favorite-towns") || element.classList.contains("latest-towns"))) {
        element.classList.add("active-animation");
        element.classList.remove("disactive");
        let delay = setTimeout(function() {
            element.classList.remove("active-animation");
        }, 100);
    } else {
        element.classList.remove("disactive");
    }
}

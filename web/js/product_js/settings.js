(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "ui": {
        "theme": {
            "dark-theme": false
        },
        "latest-towns": {
            "display-latest-towns": true
        },
        "favorite-towns": {
            "display-favorite-towns": true,
            "favorite-latest-towns": true,
            "block-favorite-towns": false
        },
        "weather-info": {
            "display-weather-additional-info": true,
            "display-weather-forecast": true,
            "display-weather-forecast-icons": true
        }
    },
    "search": {
        "search-autocomplete": true,
        "display-search-clear-button": true
    }
}
},{}],2:[function(require,module,exports){

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


    // only in theme conditional
    function dark_theme_active() {
        document.body.setAttribute('theme', "dark");

        forecast_day_status_arr.forEach(element => {
            element.classList.add("dark-icon-theme");
        });
    }

    function dark_theme_disactive() {
        document.body.setAttribute('theme', "light");

        forecast_day_status_arr.forEach(element => {
            element.classList.add("light-icon-theme");
        });
    }


    let ui_theme = localStorage.getItem("dark-theme");

    if (ui_theme == "true") {
        dark_theme_active();
        
        set_active_atribute("ui-theme");
    } else if (ui_theme == "false") {
        dark_theme_disactive();

    } else if (ui_theme == "fully_disactive") {
        set_atribute("ui-theme", "fully_disactive");
        dark_theme_disactive();

    } else if (ui_theme == "fully_active") {
        set_atribute("ui-theme", "fully_active");
        dark_theme_active();
    }

    set_element_action("display-latest-towns", "latest-towns-atr", latest_towns);
    set_element_action("display-favorite-towns", "favorite-towns-atr", favorite_towns);
    set_element_action("display-weather-forecast", "weather-forecast-atr", weather_forecast);
    set_element_action("display-additional-info", "weather-info-atr", weather_info);

    set_element_action_search("search-autocomplete", "search-autocomplete-atr");
    set_element_action_search("display-search-clear-button", "display-search-clear-button-atr");

});

function set_element_action_search(localStorage_index, element_atr) {
    let element = localStorage.getItem(localStorage_index);

    if (element == "true") {
        set_active_atribute(element_atr);

    } else if (element == "fully_active") {
        set_atribute(element_atr, "fully_active");

    } else if (element == "fully_disactive") {
        set_atribute(element_atr, "fully_disactive");

    }
}

function set_element_action(localStorage_index, element_atr, function_element) {
    let element = localStorage.getItem(localStorage_index);

    if (element == "true") {
        set_active_atribute(element_atr);

    } else if (element == "false"){
        function_element.classList.add("disactive");

    } else if (element == "fully_disactive") {
        set_atribute(element_atr, "fully_disactive");
        function_element.classList.add("disactive");

    } else if (element == "fully_active") {
        set_atribute(element_atr, "fully_active");

    }
}

function set_active_atribute(arg) {
    for (let i = 0; i < ui_settings_block.length; i++) {
        if (ui_settings_block[i].classList.contains(arg)) {
            ui_settings_block[i].classList.add("settings-section-block--active");
        }
    }
}

function set_atribute(arg, atr) {
    for (let i = 0; i < ui_settings_block.length; i++) {
        if (ui_settings_block[i].classList.contains(arg)) {
            ui_settings_block[i].classList.add(atr);
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

            disactive_atr(ui_settings_block[i], "latest-towns-atr", latest_towns, 'display-latest-towns');
            disactive_atr(ui_settings_block[i], "favorite-towns-atr", favorite_towns, 'display-favorite-towns');
            disactive_atr(ui_settings_block[i], "weather-forecast-atr", weather_forecast, 'display-weather-forecast');
            disactive_atr(ui_settings_block[i], "weather-info-atr", weather_info, 'display-additional-info');
            
            disactive_atr_search(ui_settings_block[i], "search-autocomplete-atr", 'search-autocomplete');
            disactive_atr_search(ui_settings_block[i], "display-search-clear-button-atr", 'display-search-clear-button');

        } else {
            ui_settings_block[i].classList.add("settings-section-block--active");
            if (ui_settings_block[i].classList.contains("ui-theme")) {
                document.body.setAttribute('theme', "dark");

                replace_dir_name(/light_theme/gi, "dark_theme", "dark");
                localStorage.setItem('dark-theme', true);
            }

            active_atr(ui_settings_block[i], "latest-towns-atr", latest_towns, 'display-latest-towns');
            active_atr(ui_settings_block[i], "favorite-towns-atr", favorite_towns, 'display-favorite-towns');
            active_atr(ui_settings_block[i], "weather-forecast-atr", weather_forecast, 'display-weather-forecast');
            active_atr(ui_settings_block[i], "weather-info-atr", weather_info, 'display-additional-info');
            
            active_atr_search(ui_settings_block[i], "search-autocomplete-atr", 'search-autocomplete');
            active_atr_search(ui_settings_block[i], "display-search-clear-button-atr", 'display-search-clear-button');
        }
    });

}

function disactive_atr_search(element, element_className, localStorage_index) {
    if (element.classList.contains(element_className)) {
        localStorage.setItem(localStorage_index, false);
    }
}

function active_atr_search(element, element_className, localStorage_index) {
    if (element.classList.contains(element_className)) {
        localStorage.setItem(localStorage_index, true);
    }
}

function disactive_atr(element, element_className, function_element, localStorage_index) {
    if (element.classList.contains(element_className)) {
        disactive_element(function_element);
        localStorage.setItem(localStorage_index, false);
    }
}

function delete_atr(atr_name, art) {
    const element = document.querySelector("." + atr_name);
    element.classList.remove(art);
} 

function active_atr(element, element_className, function_element, localStorage_index) {
    if (element.classList.contains(element_className)) {
        active_element(function_element);
        localStorage.setItem(localStorage_index, true);
    }
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

function try_to_get_towns() {
    fetch("http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=" + "d" + "&maxRows=10&username=" + "si1og" + "&featureClass=p&lang=ru&country=RU")  
    .then(function(resp) { return resp.json() })
    .then(function(data) { 
        delete_atr("search-autocomplete-atr", "fully_disactive");
        if (localStorage.getItem("search-autocomplete") != "false") {
            localStorage.setItem("search-autocomplete", "true");
        }
    })
    .catch(function() {
        set_atribute("search-autocomplete-atr", "fully_disactive");
        localStorage.setItem("search-autocomplete", "fully_disactive");
    })
}

try_to_get_towns();
},{"../json/settings.json":1}]},{},[2]);

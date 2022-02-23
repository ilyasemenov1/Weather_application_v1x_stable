(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
    "ui": {
        "theme": {
            "dark-theme": false
        },
        "latest-towns": {
            "display-latest-towns": true
        },
        "recommend-towns": {
            "display-recommend-towns": true,
            "recommend-latest-towns": true,
            "block-recommend-towns": false
        },
        "weather-info": {
            "dasplay-weather-additional-info": true,
            "dasplay-weather-forecast": true,
            "dasplay-weather-forecast-icons": true
        }
    }
}
},{}],2:[function(require,module,exports){

const ui_settings_block = document.querySelectorAll(".ui-settings-block");

const latest_towns = document.querySelector(".latest-towns");
const recommend_towns = document.querySelector(".recommend-towns");
const weather_forecast = document.querySelector(".weather-forecast");
const weather_info = document.querySelector(".weather-other");

const json = require("../json/settings.json");

window.addEventListener("load", function() {
    if (json.ui["theme"]["dark-theme"]) {
        document.body.setAttribute('theme', "dark");

        set_active_atribute("ui-theme");
    } else {
        document.body.setAttribute('theme', "light");
    }
    if (!(json["ui"]["latest-towns"]["display-latest-towns"])) {
        latest_towns.className = "disactive";
    } else {
        set_active_atribute("latest-towns-atr");
    }
    if (!(json["ui"]["recommend-towns"]["display-recommend-towns"])) {
        recommend_towns.className = "disactive";
    } else {
        set_active_atribute("recommend-towns-art");
    }
    if (!(json["ui"]["weather-info"]["dasplay-weather-forecast"])) {
        weather_forecast.className = "disactive";
    } else {
        set_active_atribute("weather-forecast-atr");
    }
    if (!(json["ui"]["weather-info"]["dasplay-weather-additional-info"])) {
        weather_info.className = "disactive";
    } else {
        set_active_atribute("weather-info-atr");
    }
})

function set_active_atribute(arg) {
    for (let i = 0; i < ui_settings_block.length; i++) {
        if (ui_settings_block[i].classList.contains(arg)) {
            ui_settings_block[i].classList.add("ui-settings-block--active");
        }
    }
}

for (let i = 0; i < ui_settings_block.length; i++) {

    ui_settings_block[i].addEventListener("click", function() {
        if (ui_settings_block[i].classList.contains("ui-settings-block--active")) {
            ui_settings_block[i].classList.remove("ui-settings-block--active")
            if (ui_settings_block[i].classList.contains("ui-theme")) {
                document.body.setAttribute('theme', "light");
                json.ui.theme["dark-theme"] = false;
            }
            if (ui_settings_block[i].classList.contains("latest-towns-atr")) {
                disactive_element(latest_towns);
            }
            if (ui_settings_block[i].classList.contains("recommend-towns-art")) {
                disactive_element(recommend_towns);
            }
            if (ui_settings_block[i].classList.contains("weather-forecast-atr")) {
                disactive_element(weather_forecast);
            }
            if (ui_settings_block[i].classList.contains("weather-info-atr")) {
                disactive_element(weather_info);
            }
        } else {
            ui_settings_block[i].classList.add("ui-settings-block--active");
            if (ui_settings_block[i].classList.contains("ui-theme")) {
                document.body.setAttribute('theme', "dark");
                json.ui.theme["dark-theme"] = true;
            }
            if (ui_settings_block[i].classList.contains("latest-towns-atr")) {
                active_element(latest_towns);
            }
            if (ui_settings_block[i].classList.contains("recommend-towns-art")) {
                active_element(recommend_towns);
            }
            if (ui_settings_block[i].classList.contains("weather-forecast-atr")) {
                active_element(weather_forecast);
            }
            if (ui_settings_block[i].classList.contains("weather-info-atr")) {
                active_element(weather_info);
            }
        }
    });

}

function disactive_element(element) {
    element.classList.add("disactive-animation");
    let delay = setTimeout(function() {
        element.classList.remove("disactive-animation");
        element.classList.add("disactive");
    }, 100);
}

function active_element(element) {
    if (!(element.classList.contains("recommend-towns") || element.classList.contains("latest-towns"))) {
        element.classList.add("active-animation");
        element.classList.remove("disactive");
        let delay = setTimeout(function() {
            element.classList.remove("active-animation");
        }, 100);
    } else {
        element.classList.remove("disactive");
    }
}

},{"../json/settings.json":1}]},{},[2]);

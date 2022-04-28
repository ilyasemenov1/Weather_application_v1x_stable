
const ui_settings_block = document.querySelectorAll(".settings-section-block");

const latest_towns = document.querySelector(".latest-towns");
const favorite_towns = document.querySelector(".favorite-towns");
const weather_forecast = document.querySelector(".weather-forecast");
const weather_info = document.querySelector(".weather-other");
const default_town_button = document.querySelector("#default-town-button");
const town_input = document.querySelector("#default-town-input");
const town_input_conteinet = document.querySelector(".settings-section__input--conteiner");

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

// only in set_element_action
function set_const_atr() {
    var fully_disactive = document.querySelectorAll(".fully_disactive");
    var fully_active = document.querySelectorAll(".fully_active");
    var element_arr = [...fully_disactive, ...fully_active];

    element_arr.forEach(element => {
        element.tabIndex = -1;
    });
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
        set_const_atr();
    })
}

try_to_get_towns();
default_town_input();
default_town();

function default_town() {
    let default_town_ = localStorage.getItem("default-town");
    
    if (default_town_) {
        town_input.value = default_town_;
        set_default_town_input();
        default_town_button.classList.add("settings-section__add-button--complete");
        default_town_button.classList.remove("settings-section__add-button--plus-img");
    }
}

function default_town_input() {
    town_input.addEventListener("input", function() {
        if (default_town_button.classList.contains("settings-section__add-button--complete")) {
            remove_default_town();
        }

        if (town_input.value) {
            set_default_town_input();
        } else {
            hide_default_town_input();
        }
    });

    town_input.addEventListener("keydown", function(event) {
       if (event.keyCode == 13) {
           default_town_button_event();
       } 
    });
}

function set_default_town_input() {
    default_town_button.classList.remove("settings-section__add-button--back");
    default_town_button.classList.remove("disactive");
    town_input_conteinet.classList.remove("settings-section__input--conteiner-no-content");
    town_input.classList.add("settings-section__input--back-animation");
}

function hide_default_town_input() {
    town_input.classList.remove("settings-section__input--back-animation");
    default_town_button.classList.add("settings-section__add-button--back")
    town_input.classList.add("settings-section__input--animation");

    setTimeout(function() {
        default_town_button.classList.add("disactive");
        town_input_conteinet.classList.add("settings-section__input--conteiner-no-content");
        town_input.classList.remove("settings-section__input--animation");
    }, 180);
}

default_town_button.addEventListener("click", function() {
    default_town_button_event();
});

function remove_default_town() {
    localStorage.setItem("default-town", "");

    default_town_button.classList.remove("settings-section__add-button--complete");
    default_town_button.classList.add("settings-section__add-button--plus-img");
}

function default_town_button_event() {
    const animation = document.querySelector(".add-main-town-animation");
    const key = '88d2ec6ab0319b11d3c9704f6ac3b98f';
    let place = town_input.value;

    let delay = setTimeout(function() {
        default_town_button.classList.remove("settings-section__add-button--plus-img");
        animation.classList.remove("disactive");
    }, 200);

    if (default_town_button.classList.contains("settings-section__add-button--complete")) {
        remove_default_town();

        clearTimeout(delay);
        town_input.value = "";
        hide_default_town_input();

    } else {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + place + ",&appid=" + key + "&lang=ru")  
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            console.log(data);
            if (data.cod == "200") {
                clearTimeout(delay);
                animation_disactive();
                
                setTimeout(function() {
                    default_town_button.classList.remove("settings-section__add-button--plus-img");
                    default_town_button.classList.add("settings-section__add-button--complete");
                    localStorage.setItem("default-town", place);
                }, 200)
            } else {
                add_plus_icon(delay);
            }   
        })
        .catch(function() {
            add_plus_icon(delay);
        });
    }

    function add_plus_icon(delay) {
        clearTimeout(delay);
        animation_disactive();

        setTimeout(function() {
            default_town_button.classList.add("settings-section__add-button--plus-img");
        }, 200);
    }

    function animation_disactive() {
        animation.classList.remove("set-add-main-town-animation");
        animation.classList.add("hide-add-main-town-animation");

        setTimeout(function() {
            animation.classList.remove("hide-add-main-town-animation");
            animation.classList.add("disactive");
            animation.classList.add("set-add-main-town-animation");
        }, 200);
    }
}
set_const_atr();
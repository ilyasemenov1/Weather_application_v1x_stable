document_events();
new_town_button_event();

// global variables
const add_button_text = document.querySelector("#add_button_text");
const add_button_text_before = document.querySelector("#add_button_text_before");
const add_new_town = document.querySelector(".add-new-town");
const add_button_center = document.querySelector("#add_button_center");
const no_connection = document.querySelector(".no-connection-notification");
const town_not_found = document.querySelector(".town-not-found-notification");
const town_not_found_label = document.querySelector("#town_not_found_label");
const enter_town_notification = document.querySelector(".enter-town-notification");
const search_input = document.querySelector("#search_input");
const latest_towns = document.querySelector(".latest-towns");
const recommend_towns_elements = document.querySelector("#recommend_towns_elements");
const search_animation = document.querySelector("#search_animation");
const key = 'b52345d6529f9d1ac5a2c583a5f89e31';
var all_last_places_array = [];
var last_places_array = [];
let click_counter = 0;
let search_anable = true;

async function display_weather(place) {
    print_weather_info(true);

    all_last_places_array.unshift(place);

    if (is_online()) {

        if (place) {
            no_connection.className = "no-connection-notification no-connection-notification--disabled";

            let weather_template = document.querySelector(".weather-template");

            weather_template.style = "display: grid;";

            let delay = setTimeout(function() {
                search_animation.className = "search__animation-conteiner";
            },250);

            search_anable = true;

            try {
                fetch("https://api.openweathermap.org/data/2.5/weather?q=" + place + ",&appid=" + key + "&lang=ru")  
                .then(function(resp) { return resp.json() })
                .then(function(data) {
                    if (search_anable) {
                        let temp = Math.round(parseFloat(data.main.temp)-273.15);
    
                        let temp_min = Math.round(parseFloat(data.main.temp_min)-273.15);
                        let temp_max = Math.round(parseFloat(data.main.temp_max)-273.15);
                        let temp_min_max = temp_min  + "/" + temp_max;
        
                        let wind = Math.round(data.wind.speed);
        
                        let humidity = data.main.humidity;
        
                        let status = data.weather[0].description;
        
                        var weather_info_data = [temp, status, wind, temp_min_max, humidity];
        
                        if (last_places_array[0] != place) {
                            last_places_array.unshift(place);
        
                            add_last_town(place, temp, wind, humidity);
                        }
        
                        var weather_data = document.querySelectorAll('.weather_data');
        
                        let i = 0;
                        weather_info_data.forEach(element => {
                            weather_data[i].textContent = element;
                            i++;
                        });
                
                        clearTimeout(delay);
                        search_animation.className = "search__animation-conteiner  search__animation-conteiner--disactive";
                        weather_template.className = "weather-template weather-template--active";
                    }
                })
                .catch(function() {
                    if (search_anable) {
                        clearTimeout(delay);
                        search_animation.className = "search__animation-conteiner  search__animation-conteiner--disactive";
                
                        town_not_found_label.textContent = " \"" + place + "\" ";
                        town_not_found.style = "display: flex;";
                    }
                }); 
            } catch {
                console.log("town not found");
            }
        } else {
            print_weather_info(true);
            enter_town_notification.style = "display: flex;";
        }
    } else {
        print_weather_info(true);
        no_connection.style = "display: flex;";
    }
}

function print_weather_info(par) {
    let recommend_towns = document.querySelector(".recommend-towns");
    let search_back_button = document.querySelector("#search_back_button");
    let search = document.querySelector(".search");
    let weather_template = document.querySelector(".weather-template");
    let add_new_town = document.querySelector(".add-new-town");
    if (par) {
        search.style = "grid-template-columns: min-content 1fr;";
        search_back_button.style = "display: flex;";
        recommend_towns.style = "display: none;";
        weather_template.className = "weather-template";
        add_new_town.style = "display: none";
        no_connection.style = "display: none;";
        enter_town_notification.style = "display: none;";
        click_counter = hide_add_new_town_button();
        latest_towns.style = "display: none";
    } else {
        search.style = "";
        search_back_button.style = "";
        recommend_towns.style = "";
        weather_template.className = "weather-template";
        weather_template.style = "";
        search_input.value = "";
        add_new_town.className = "add-new-town";
        add_new_town.style = "display: none";
        no_connection.style = "display: none;";
        town_not_found.style = "display: none;";
        town_not_found_label.textContent = "";
        enter_town_notification.style = "display: none;";
        latest_towns.style = "display: grid";
        search_animation.className = "search__animation-conteiner  search__animation-conteiner--disactive";
        search_anable = false;
    }
}

function document_events() {

    let search_input_conteiner = document.querySelector(".search__input-conteiner");

    let search_button = document.querySelector("#search_button");

    search_button.addEventListener('click', function() {

        let place = document.getElementById("search_input").value;

        display_weather(place);
    });

    search_button.addEventListener('focus', function() {
        search_input_conteiner.style = "box-shadow: 0px 0px 18px #0000001f;";
    });
    
    search_button.addEventListener('blur', function() {
        search_input_conteiner.style = "";
    });

    let search_input = document.querySelector("#search_input");

    search_input.addEventListener('keydown', function(event) {
        if (event.keyCode == 13) {
            let place = document.getElementById("search_input").value;
            display_weather(place);
        }
        if (event.keyCode == 27) {
            print_weather_info(false);
        }
    });

    search_input.addEventListener('focus', function() {
        search_input_conteiner.style = "box-shadow: 0px 0px 18px #0000001f;";
    });
    
    search_input.addEventListener('blur', function() {
        search_input_conteiner.style = "";
    });

    let refresh_button = document.querySelector("#refresh_button");

    refresh_button.addEventListener('click', function() {

        print_weather_info(true);

        search_input.value = all_last_places_array[0];

        display_weather(all_last_places_array[0]);
    });
    
    let home_button = document.querySelector("#home_button");

    home_button.addEventListener('click', function() {
        print_weather_info(false);
    });

    let search_back_button = document.querySelector("#search_back_button");
    
    search_back_button.addEventListener('click', function() {
        print_weather_info(false);
    });
    
    var town_close_button = document.querySelectorAll(".recommend-towns__close-button");
    var town_button = document.querySelectorAll(".recommend-towns__button");
    
    town_close_button_event(town_close_button, town_button);
    town_button_event_focus(town_close_button, town_button, town_close_button, "focus");
    town_button_event_focus(town_close_button, town_button, town_close_button, "blur");

    var town_name_button = document.querySelectorAll(".recommend-towns__town-button-name");
    town_name_button_event(town_name_button, "recommend_towns");
    town_button_event_focus(town_name_button, town_button, town_close_button, "focus");
    town_button_event_focus(town_name_button, town_button, town_close_button, "blur");

    let add_button = document.querySelector("#add_button");

    add_button.addEventListener('click', function() {
        if (!click_counter) {
            click_counter = show_add_new_town_button();
        } else {
            click_counter = hide_add_new_town_button();
        }
    });

    add_button.addEventListener('keydown', function(event) {
        if (event.keyCode == 27) {
            click_counter = hide_add_new_town_button();
        } 
    });

    let new_town_input = document.querySelector("#new_town_input");

    let new_town_button = document.querySelector("#new_town_button");

    new_town_button.addEventListener('click', function() {
        new_town_button_event();
    });

    new_town_input.addEventListener('keydown', function(event) {
        if (event.keyCode == 13) {
            new_town_button_event();
        }
        if (event.keyCode == 27) {
            click_counter = hide_add_new_town_button();
        }
    });
}

function show_add_new_town_button() {
    let new_town_input_select = document.querySelector("#new_town_input");
    add_button_center.style = "justify-content: left; padding: 10px 0 0 0;";
    add_button_text.textContent = "Добавление нового города";
    add_button_text_before.textContent = "-";
    add_button_text_before.style = "padding: 0 0 2px 0; height: 22px;";
    add_new_town.style = "display: flex;";
    new_town_input_select.value = "";

    return 1;
}

function hide_add_new_town_button() {
    add_button_center.style = "";
    add_button_text.textContent = "Добавить город";
    add_button_text_before.textContent = "+";
    add_button_text_before.style = "";
    add_new_town.className = "add-new-town add-new-town__back-animation";

    let add_new_town_delay = setTimeout(function() {
        add_new_town.className = "add-new-town";
        add_new_town.style = "display: none;";
    }, 200);

    return 0;
}

async function new_town_button_event() {
    let new_town_button = document.querySelector("#new_town_button");
    if (new_town_button.id != "new_town_button_active") {
        let new_town = document.getElementById("new_town_input").value;
        if (new_town) {
            let delay = setTimeout(function() {
                new_town_button.className = "add-new-town__button add-new-town__button--active";
                new_town_button.id = "new_town_button_active";
            }, 200);

            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + new_town + ",&appid=" + key + "&lang=ru")  
            .then(function(resp) { return resp.json() })
            .then(function(data) {
                if (data.cod == "200") {
                    clearTimeout(delay);
                    if (addendum_new_town(new_town)) {
                        new_town_button.className = "add-new-town__button ";
                        new_town_button.id = "new_town_button";
                    }
                } else {
                    clearTimeout(delay);
                    new_town_button.className = "add-new-town__button ";
                    new_town_button.id = "new_town_button";
                }
            })
        }
    }
} 

 function addendum_new_town(town) {

    let recommend_towns = document.querySelector("#recommend_towns_elements");

    let new_recommend_town = document.createElement("div");
    new_recommend_town.className = "recommend-towns__button";

    let recommend_town_name_button = document.createElement("button");
    recommend_town_name_button.className = "recommend-towns__town-button-name";
    recommend_town_name_button.value = town;
    recommend_town_name_button.textContent = town;

    let recommend_town_close_button = document.createElement("button");
    recommend_town_close_button.className = "recommend-towns__close-button";

    let recommend_towns_close_button_img = document.createElement("span");
    recommend_towns_close_button_img.className = "recommend-towns__close-button--img";

    let delete_notification = false;

    var recommend_towns_notification_conteiner = document.querySelectorAll(".rocommend-towns__no-town-notification");
    if (recommend_towns_notification_conteiner.length >= 1) {
        recommend_towns_notification_conteiner[0].className = "rocommend-towns__no-town-notification rocommend-towns__no-town-notification--back";
        delete_notification = true;
        let delay = setTimeout(function() {
            recommend_towns_notification_conteiner[0].remove();
        }, 200);
    }

    if (delete_notification) {
        let delay_2 = setTimeout(function() {
            recommend_towns.append(new_recommend_town);
            new_recommend_town.append(recommend_town_name_button);
            new_recommend_town.append(recommend_town_close_button);
            recommend_town_close_button.append(recommend_towns_close_button_img);
        
            town_name_button_event([recommend_town_name_button], "recommend_towns");
            town_close_button_event([recommend_town_close_button], [new_recommend_town]);

            return true;
        }, 200);
    } else {
        recommend_towns.append(new_recommend_town);
        new_recommend_town.append(recommend_town_name_button);
        new_recommend_town.append(recommend_town_close_button);
        recommend_town_close_button.append(recommend_towns_close_button_img);
    
        town_name_button_event([recommend_town_name_button], "recommend_towns");
        town_close_button_event([recommend_town_close_button], [new_recommend_town]);
        
        return true;
    }
}


function add_last_town(town, temp, wind, humidity) {
    let latest_towns_content = document.querySelector(".latest-towns__content-conteiner");

    let last_town_button = document.createElement("button");
    last_town_button.className = "latest-towns__town-button";
    last_town_button.value = town;

    // town button main content
    let last_town_button_content = document.createElement("div");
    last_town_button_content.className = "last_town_button--content";

    let last_town_name = document.createElement("span");
    last_town_name.className = "latest-towns__town-name-button";
    last_town_name.textContent = town;

    let last_town_temp_conteiner = document.createElement("div");
    last_town_temp_conteiner.className = "latest-towns__town-temp--conteiner";

    let last_town_temp = document.createElement("span");
    last_town_temp.className = "latest-towns__town-temp";
    last_town_temp.textContent = temp;

    // wind
    let last_town_wind_conteiner = document.createElement("div");
    last_town_wind_conteiner.className = "latest-towns__data-conteiner";

    let last_town_wind_label = document.createElement("span");
    last_town_wind_label.className = "latest-towns__data-label latest-towns__wind-label";

    let last_town_wind = document.createElement("span");
    last_town_wind.className = "latest-towns__wind";
    last_town_wind.textContent = wind;

    // humidity
    let last_town_humidity_conteiner = document.createElement("div");
    last_town_humidity_conteiner.className = "latest-towns__data-conteiner";

    let last_town_humidity_label = document.createElement("span");
    last_town_humidity_label.className = "latest-towns__data-label latest-towns__humidity-label";

    let last_town_humidity = document.createElement("span");
    last_town_humidity.className = "latest-towns__humidity";
    last_town_humidity.textContent = humidity;

    let last_town_data_conteiner = document.createElement("div");
    last_town_data_conteiner.className = "last-town__weather-data-conteiner";

    let town_count = 0;
    var last_town_buttons = document.querySelectorAll(".latest-towns__town-button");

    if (last_town_buttons) {
        town_count = last_town_buttons.length + 1;
    }
    
    if (town_count == 1) {
        latest_towns_content.className = "latest-towns__content-conteiner latest-towns__content-conteiner--2-colums";
    } else if (town_count == 2){
        latest_towns_content.className = "latest-towns__content-conteiner latest-towns__content-conteiner--2-colums";
    } else if (town_count == 3){
        latest_towns_content.className = "latest-towns__content-conteiner latest-towns__content-conteiner--3-colums";
    } else if (town_count == 4) {
        latest_towns_content.className = "latest-towns__content-conteiner";
    }

    if (town_count > 4) {
        latest_towns_content.prepend(last_town_button);
        last_town_button.append(last_town_button_content);
        last_town_button_content.append(last_town_name);
        last_town_button_content.append(last_town_temp);
        last_town_button_content.append(last_town_data_conteiner);
        last_town_data_conteiner.append(last_town_wind_conteiner);
        last_town_wind_conteiner.append(last_town_wind_label);
        last_town_wind_conteiner.append(last_town_wind);
        last_town_data_conteiner.append(last_town_humidity_conteiner);
        last_town_humidity_conteiner.append(last_town_humidity_label);
        last_town_humidity_conteiner.append(last_town_humidity);

        last_town_buttons = document.querySelectorAll(".latest-towns__town-button");
        last_town_buttons[last_town_buttons.length - 1].remove();
    } else {
        latest_towns_content.prepend(last_town_button);
        last_town_button.append(last_town_button_content);
        last_town_button_content.append(last_town_name);
        last_town_button_content.append(last_town_temp);
        last_town_button_content.append(last_town_data_conteiner);
        last_town_data_conteiner.append(last_town_wind_conteiner);
        last_town_wind_conteiner.append(last_town_wind_label);
        last_town_wind_conteiner.append(last_town_wind);
        last_town_data_conteiner.append(last_town_humidity_conteiner);
        last_town_humidity_conteiner.append(last_town_humidity_label);
        last_town_humidity_conteiner.append(last_town_humidity);
        last_town_buttons = document.querySelectorAll(".latest-towns__town-button");
    }

    town_name_button_event([last_town_buttons[0]], "latest_towns");
}

function town_button_event_focus(focus_button_arr, town_button_arr, close_button_arr, event) {
    if (focus_button_arr && town_button_arr && close_button_arr) {
        if (focus_button_arr.length == town_button_arr.length) {
            if (event == "focus") {
                for (let i = 0; i < focus_button_arr.length; i++) {
                    focus_button_arr[i].addEventListener('focus', function() {
                        town_button_arr[i].className = "recommend-towns__button recommend-towns__button--active";
                        close_button_arr[i].style = "opacity: 1";
                    });
                }
            }
            else if (event == "blur") {
                for (let i = 0; i < focus_button_arr.length; i++) {
                    focus_button_arr[i].addEventListener('blur', function() {
                        town_button_arr[i].className = "recommend-towns__button";
                        close_button_arr[i].style = "";
                    });
                }
            }
        }
    }
}

function town_close_button_event(close_button_arr, town_button_arr) {
    if (close_button_arr && town_button_arr) {
        if (close_button_arr.length == town_button_arr.length) {
            for (let i = 0; i < close_button_arr.length; i++) {
                close_button_arr[i].addEventListener('click', function() {
                    remove_recommend_towns_element(town_button_arr[i]);
                });
            }
        }
    }
}

function remove_recommend_towns_element(element) {
    element.remove();
    var town_button_count = document.querySelectorAll(".recommend-towns__button");
    if (town_button_count.length == 3) {
        recommend_towns_elements.className = "recommend-towns__content-conteiner recommend-towns__content-conteiner--3-colums";
    } else if (town_button_count.length == 2) {
        recommend_towns_elements.className = "recommend-towns__content-conteiner recommend-towns__content-conteiner--2-colums";
    } else if (town_button_count.length == 1) {
        recommend_towns_elements.className = "recommend-towns__content-conteiner recommend-towns__content-conteiner--1-colum";
    } else if (town_button_count.length == 0) {
        let recommend_towns_notification_conteiner = document.createElement("p");
        recommend_towns_notification_conteiner.className = "rocommend-towns__no-town-notification";
        recommend_towns_notification_conteiner.textContent = "Нет рекомендованных городов";
        recommend_towns_elements.append(recommend_towns_notification_conteiner);
    }
}

function remove_latest_towns_element(element) {
    element.remove();
    const latest_towns_content = document.querySelector(".latest-towns__content-conteiner");
    var town_button_count = document.querySelectorAll(".latest-towns__town-button");
    if (town_button_count.length == 3) {
        latest_towns_content.className = "latest-towns__content-conteiner latest-towns__content-conteiner--3-colums";
    } else if (town_button_count.length == 2) {
        latest_towns_content.className = "latest-towns__content-conteiner latest-towns__content-conteiner--2-colums";
    } else if (town_button_count.length == 1) {
        latest_towns_content.className = "latest-towns__content-conteiner latest-towns__content-conteiner--2-colums";
    } else if (town_button_count.length == 0) {
        latest_towns_content.parentElement.style = "display: none;";
    }
}

function town_name_button_event(town_button_arr, button_type) {
    if (town_button_arr.length >= 1) {
        let weather_function = true;
        let delay = 0;
        town_button_arr.forEach(element => {
            element.addEventListener('click', function(event) {
                if (weather_function) {
                    let place = this.value;
                    let search_input = document.querySelector("#search_input");
                    search_input.value = place;
                    clearTimeout(delay);
                    remove_indicate_menu(true);
                    display_weather(place);
                }
                weather_function = true;
            });
            element.addEventListener("mousedown", function(event) {
                if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                    delay = setTimeout(function() {
                        indicate_menu_add(element, event, "pc", button_type);
                        weather_function = false;
                    }, 250);
                }
            });
            element.addEventListener("touchstart", function(event) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                    delay = setTimeout(function() {
                        indicate_menu_add(element, event, "mobile", button_type);
                        weather_function = false;
                    }, 250);
                }
            });
            element.addEventListener("blur", function() {
                clearTimeout(delay);
                remove_indicate_menu(false);
                weather_function = true;
            });
        }); 
    }
}
function remove_indicate_menu(event) {
    var indicate_menu_elements = document.querySelectorAll(".indicate-menu");
    if (indicate_menu_elements.length >= 1) {
        indicate_menu_elements.forEach(function(element) {
            if (!event) {
                element.className = "indicate-menu indicate-menu--remove-animation";
                let remove_delay = setTimeout(function() {
                    element.remove();
                }, 300);
            } else {
                element.remove(); 
            }
        });
    }
}
function indicate_menu_add(element, event, device_mode, button_type) {
    remove_indicate_menu(false);
    let indicate_menu = document.createElement("div");
    indicate_menu.className = "indicate-menu";
    let indicate_menu_romove_button = document.createElement("button");
    indicate_menu_romove_button.className = "indicate-menu__remove-button";
    indicate_menu_romove_button.innerHTML = "Удалить";
    let indicate_menu_search_button = document.createElement("button");
    indicate_menu_search_button.className = "indicate-menu__search-button";
    indicate_menu_search_button.innerHTML = "Поиск";

    let cord_Y = 0;
    let cord_X = 0;

    if (device_mode == "pc") {
        cord_Y = event.clientY + window.pageYOffset;
        cord_X = event.clientX;
    } else if (device_mode == "mobile") {
        cord_Y = event.changedTouches[0].clientY  + window.pageYOffset;
        cord_X = event.changedTouches[0].clientX;
    }

    document.body.append(indicate_menu);
    indicate_menu.style = "top: " + cord_Y + "px; left: " + cord_X + "px;";

    indicate_menu.append(indicate_menu_romove_button);
    indicate_menu.append(indicate_menu_search_button);
    
    indicate_menu_romove_button.addEventListener("click", function() {
        remove_indicate_menu(true);
        if (button_type == "latest_towns") {
            remove_latest_towns_element(element);
        } else if (button_type == "recommend_towns") {
            remove_recommend_towns_element(element.parentElement);
        }
    });
    indicate_menu_search_button.addEventListener("click", function() {
        remove_indicate_menu(true);
        let search_place = element.value;
        let search_input = document.querySelector("#search_input");
        search_input.value = search_place;
        display_weather(search_place);
    });
}
function is_online() {
    if (navigator.onLine) {

        return true;

    } else {

        return false;

    }
}
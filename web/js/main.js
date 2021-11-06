document_events();
new_town_button_event();

// global variables
let add_button_text = document.querySelector("#add_button_text");
let add_button_text_before = document.querySelector("#add_button_text_before");
let add_new_town = document.querySelector(".add-new-town");
let add_button_center = document.querySelector("#add_button_center");
let no_connection = document.querySelector(".no-connection-notification");
let town_not_found = document.querySelector(".town-not-found-notification");
let town_not_found_label = document.querySelector("#town_not_found_label");
let search_input = document.querySelector("#search_input");
var all_last_places_array = [];
let click_counter = 0;


async function display_weather(place) {
    print_weather_info(true);

    all_last_places_array.unshift(place);

    if (is_online()) {

        no_connection.className = "no-connection-notification no-connection-notification--disabled";

        let search_animation = document.querySelector("#search_animation");
        let weather_template = document.querySelector(".weather-template");
    
        search_animation.className = "search__animation-conteiner";
        weather_template.style = "display: grid;";
    
        var main_data = await eel.main(place)();
    
        var weather_info_data = main_data[0];
        let istrue = main_data[1];
    
        if (istrue) {
    
            var weather_data = document.querySelectorAll('.weather_data');
    
            let i = 0;
            weather_info_data.forEach(element => {
                weather_data[i].textContent = element;
                i++;
            });
    
            search_animation.className = "search__animation-conteiner  search__animation-conteiner--disactive";
            weather_template.className = "weather-template weather-template--active";
    
        } else {
            search_animation.className = "search__animation-conteiner  search__animation-conteiner--disactive";
    
            town_not_found_label.textContent = " \"" + place + "\" ";
            town_not_found.className = "town-not-found-notification";
        }
    } else {
        no_connection.className = "no-connection-notification";
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
        add_new_town.className = "add-new-town add-new-town--disactive";
        town_not_found.className = "town-not-found-notification town-not-found-notification--disabled";
        click_counter = hide__add_new_town_button();
    } else {
        search.style = "";
        search_back_button.style = "";
        recommend_towns.style = "";
        weather_template.className = "weather-template";
        weather_template.style = "";
        search_input.value = "";
        add_new_town.className = "add-new-town";
        add_new_town.style = "";
        no_connection.className = "no-connection-notification no-connection-notification--disabled";
        town_not_found.className = "town-not-found-notification town-not-found-notification--disabled";
        town_not_found_label.textContent = "";
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

    search_input.addEventListener('focus', function() {
        search_input_conteiner.style = "box-shadow: 0px 0px 18px #0000001f;";
    });
    
    search_input.addEventListener('blur', function() {
        search_input_conteiner.style = "";
    });

    let refresh_button = document.querySelector("#refresh_button");

    refresh_button.addEventListener('click', function() {

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

    var town_name_button = document.querySelectorAll(".recommend-towns__town-button-name");
    town_name_button_event(town_name_button);

    let add_button = document.querySelector("#add_button");

    add_button.addEventListener('click', function() {
        if (!click_counter) {
            click_counter = show_add_new_town_button();
        } else {
            click_counter = hide__add_new_town_button();
        }

    });

}

function show_add_new_town_button() {
    let new_town_input_select = document.querySelector("#new_town_input");
    add_button_center.style = "justify-content: left; padding: 10px 0 0 0;";
    add_button_text.textContent = "Добавление нового города";
    add_button_text_before.textContent = "-";
    add_button_text_before.style = "padding: 0 0 2px 0; height: 22px;";
    add_new_town.style = "opacity: 1; transform: translateY(0px)";
    new_town_input_select.value = "";

    return 1;
}

function hide__add_new_town_button() {
    add_button_center.style = "";
    add_button_text.textContent = "Добавить город";
    add_button_text_before.textContent = "+";
    add_button_text_before.style = "";
    add_new_town.style = "";

    return 0;
}

function new_town_button_event() {

    let new_town_button = document.querySelector("#new_town_button");

    new_town_button.addEventListener('click', async function() {
        if (new_town_button.id != "new_town_button_active") {
            let new_town = document.getElementById("new_town_input").value;
            if (new_town) {
                new_town_button.className = "add-new-town__button add-new-town__button--active";
                new_town_button.id = "new_town_button_active";
                let main_data = await eel.is_town(new_town)();
                if (main_data) {
                    if (addendum_new_town(new_town)) {
                        new_town_button.className = "add-new-town__button ";
                        new_town_button.id = "new_town_button";
                    }
                } else {
                    new_town_button.className = "add-new-town__button ";
                    new_town_button.id = "new_town_button";
                }
            }
        }
    });
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

    recommend_towns.appendChild(new_recommend_town);
    new_recommend_town.appendChild(recommend_town_name_button);
    new_recommend_town.appendChild(recommend_town_close_button);
    recommend_town_close_button.appendChild(recommend_towns_close_button_img);

    town_name_button_event([recommend_town_name_button]);
    town_close_button_event([recommend_town_close_button], [new_recommend_town]);
    
    return true;

}

// TODO: Remake town_button_arr counter of the town_close_button_event function
function town_close_button_event(close_button_arr, town_button_arr) {
    if (close_button_arr.length >= 1 && town_button_arr.length >= 1) {
        if (close_button_arr.length == town_button_arr.length) {
            let i = 0;
            close_button_arr.forEach(element => {
                element.addEventListener('click', function() {
                    town_button_arr[i].remove();
                    var town_button_count = document.querySelectorAll(".recommend-towns__button");
                    if (town_button_count.length == 0) {
                        console.log("нет элементов");
                    }
                    i++;
                });
            });
        }
    }
}

function town_name_button_event(town_button_arr) {
    if (town_button_arr.length >= 1) {
        town_button_arr.forEach(element => {
            element.addEventListener('click', function() {
                let place = this.value;
                let search_input = document.querySelector("#search_input");
                search_input.value = place;
                display_weather(place);
            });
        }); 
    }
}
function is_online() {
    if (navigator.onLine) {

        return true;

    } else {

        return false;

    }
}
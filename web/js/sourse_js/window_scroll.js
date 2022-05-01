
const search = document.querySelector(".search");
const search_back_button = document.querySelector(".search__back-button");
const search_input_conteiner = document.querySelector(".search__input-conteiner");
const search_button = document.querySelector("#search_button");
const search_backgound = document.querySelector(".search-background");
const search_animation = document.querySelector(".search__animation-conteiner");
const search_input = document.querySelector(".search__input");

let search_scroll_rule = true;
let search_scroll_rule_2 = false;

sessionStorage.setItem("search-scroll-rule", search_scroll_rule_2);

window.addEventListener('load', function() {
    search_scroll_rule = search_scroll(search_scroll_rule);
});

window.addEventListener('scroll', function() {
    search_scroll_rule = search_scroll(search_scroll_rule);
    detect_window_scroll(search_scroll_rule_2);
});

function hide_search() {
    search.classList.remove("search-scroll", "search-scroll-colors");
    search_back_button.classList.remove("search-scroll-back-button-colors")
    search_input_conteiner.classList.remove("search-scroll__input-conteiner", "search-scroll-input-conteiner-colors")
    search_button.classList.remove("search-scroll__button");
    search_input.classList.remove("search-scroll__input");
    search_backgound.style = "display: none;"
    search.classList.remove("search-scroll__add-animation");
}

function add_search() {
    search.classList.add("search-scroll", "search-scroll-colors");
    search_back_button.classList.add("search-scroll-back-button-colors")
    search_input_conteiner.classList.add("search-scroll__input-conteiner", "search-scroll-input-conteiner-colors")
    search_button.classList.add("search-scroll__button");
    search_input.classList.add("search-scroll__input");
    search_backgound.style = "display: block;"
}

function search_scroll(scroll_rule) {
    if (window.pageYOffset >= 35) {
        if (scroll_rule) {
            add_search();
            scroll_rule = false;
            sessionStorage.setItem("search-scroll-rule", false);
        }
    } else if (window.pageYOffset < 35) {
        if (!scroll_rule) {
            hide_search();
            scroll_rule = true;
            sessionStorage.setItem("search-scroll-rule", true);
        }
    }
    return scroll_rule
}

function detect_window_scroll() {
    let window_scroll_time_1 = window.pageYOffset;
    let window_scroll_time_2 = 0;
    search_scroll_rule_2 = JSON.parse(sessionStorage.getItem("search-scroll-rule"));

    setTimeout(function() {
        console.log(search_scroll_rule_2);
        window_scroll_time_2 = window.pageYOffset;
        if (window_scroll_time_1 - window_scroll_time_2 < 0 && !search_scroll_rule_2) {
            search.classList.add("search-scroll__remove-animation");
            sessionStorage.setItem("search-scroll-rule", true);
            setTimeout(function() {
                search.classList.remove("search-scroll__remove-animation");
                hide_search();
            }, 300);
        } else if (window_scroll_time_1 - window_scroll_time_2 > 0 && search_scroll_rule_2 && window.pageYOffset > 100) {
            add_search();
            sessionStorage.setItem("search-scroll-rule", false);
            search.classList.add("search-scroll__add-animation");
            setTimeout(function() {
                search.classList.remove("search-scroll__add-animation");
            }, 300);
        }
    }, 50);
}
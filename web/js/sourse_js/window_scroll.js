
const search = document.querySelector(".search");
const search_back_button = document.querySelector(".search__back-button");
const search_input_conteiner = document.querySelector(".search__input-conteiner");
const search_button = document.querySelector("#search_button");
const search_backgound = document.querySelector(".search-background");
const search_animation = document.querySelector(".search__animation-conteiner");
const search_input = document.querySelector(".search__input");

let search_scroll_rule = true;

window.addEventListener('load', function() {
    search_scroll_rule = search_scroll(search_scroll_rule);
});

window.addEventListener('scroll', function() {
    search_scroll_rule = search_scroll(search_scroll_rule);
});

function search_scroll(scroll_rule) {
    if (window.pageYOffset >= 35) {
        if (scroll_rule) {
            search.classList.add("search-scroll", "search-scroll-colors");
            search_back_button.classList.add("search-scroll-back-button-colors")
            search_input_conteiner.classList.add("search-scroll__input-conteiner", "search-scroll-input-conteiner-colors")
            search_button.classList.add("search-scroll__button");
            search_input.classList.add("search-scroll__input");
            search_backgound.style = "display: block;"
            search_animation.classList.add("search__animation-conteiner-scroll");
            
            scroll_rule = false;
        }
    } else if (window.pageYOffset < 35) {
        if (!scroll_rule) {
            search.classList.remove("search-scroll", "search-scroll-colors");
            search_back_button.classList.remove("search-scroll-back-button-colors")
            search_input_conteiner.classList.remove("search-scroll__input-conteiner", "search-scroll-input-conteiner-colors")
            search_button.classList.remove("search-scroll__button");
            search_input.classList.remove("search-scroll__input");
            search_backgound.style = "display: none;"
            search_animation.classList.remove("search__animation-conteiner-scroll");
            
            scroll_rule = true;
        }
    }
    return scroll_rule
}
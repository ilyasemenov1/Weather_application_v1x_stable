
const search = document.querySelector(".search");
const search_back_button = document.querySelector(".search__back-button");
const search_input_conteiner = document.querySelector(".search__input-conteiner");
const search_button = document.querySelector("#search_button");
const search_backgound = document.querySelector(".search-background");
const search_animation = document.querySelector(".search__animation-conteiner");

let search_scroll_rule = true;

window.addEventListener('scroll', function() {

    if (window.pageYOffset >= 35) {
        if (search_scroll_rule) {
            search.className = "search search-scroll search-scroll-colors";
            search_back_button.className = "search__back-button search-scroll-back-button-colors";
            search_input_conteiner.className = "search__input-conteiner search-scroll__input-conteiner search-scroll-input-conteiner-colors";
            search_button.className = "search__button search-scroll__button search-button-colors";
            search_input.className = "search__input search-scroll__input";
            search_backgound.style = "display: block;"
            search_scroll_rule = false;

            search_animation.classList.add("search__animation-conteiner-scroll");
        }
    } else if (window.pageYOffset < 35) {
        if (!search_scroll_rule) {
            search.className = "search";
            search_back_button.className = "search__back-button search-back-button-colors";
            search_input_conteiner.className = "search__input-conteiner search-input-conteiner-colors";
            search_button.className = "search__button search-button-colors";
            search_input.className = "search__input search-input-colors";
            search_backgound.style = "display: none;"
            search_scroll_rule = true;

            search_animation.classList.remove("search__animation-conteiner-scroll");
        }
    }
  });

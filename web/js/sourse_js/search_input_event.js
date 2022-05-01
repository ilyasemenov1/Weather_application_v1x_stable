const search_clear_button = document.querySelector(".search__clear-button");
let search_input_index = true;
let focus_change = true;

search_input.addEventListener("input", function() { 
    if (JSON.parse(localStorage.getItem("display-search-clear-button"))) {
        add_search_clear_button();
    }
});
search_input.addEventListener("focus", function() { 
    if (JSON.parse(localStorage.getItem("display-search-clear-button"))) {
        add_search_clear_button();
        document.body.style = "overflow: hidden;";
    }
});
search_input.addEventListener("blur", function() { 
    if (!search_input_index) {
        search_input_index = remove_search_clear_button();
    }
});
search_input.addEventListener("keydown", function(event) { 
    if (JSON.parse(localStorage.getItem("display-search-clear-button"))) {
        if (event.keyCode == 46) {
            search_input_index = remove_search_clear_button_main();
        }
    }
});
search_clear_button.addEventListener("click", function() {
    search_input_index = remove_search_clear_button_main();
});

function remove_search_clear_button_main() {
    search_input.setAttribute("focus_change", "false");

    search_input.value = "";
    let search_input_index = remove_search_clear_button();

    search_input.focus();

    let search_modal_menu = document.querySelector(".search__modal-menu");

    if (!search_modal_menu.classList.contains("search__modal-menu--disactive")) {
        search_modal_menu.classList.add("search__modal-menu--disactive-animation", "modal-menu-colors");

        let delay = setTimeout(function() {
            search_modal_menu.classList.remove("search__modal-menu--disactive-animation");
            search_modal_menu.classList.add("search__modal-menu--disactive");
        }, 90);
    }

    let delay = setTimeout(function() {
        search_input.setAttribute("focus_change", "true");
    }, 200);

    return search_input_index;
}

function add_search_clear_button() {
    if (search_input.value && search_input_index) {
        search_input_conteiner.classList.add("input-value");
        search_clear_button.style = "display: block";
        search_input.classList.add("search-input__left-animation");

        let delay = setTimeout(function() {
            search_input.classList.remove("search-input__left-animation");
        }, 190);
        search_input_index = false;
    } else if (!search_input.value && !search_input_index) {
        search_input_index = remove_search_clear_button();
    }
}

function remove_search_clear_button() {
    search_clear_button.classList.add("search-clear-remove-animaton");
    search_input.classList.add("search-input__right-animation");

    let delay = setTimeout(function() {
        search_clear_button.classList.remove("search-clear-remove-animaton");
        search_input.classList.remove("search-input__right-animation");
        search_clear_button.style = "display: none";
        search_input_conteiner.classList.remove("input-value");
    }, 190);

    return true;
}

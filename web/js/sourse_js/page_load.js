
var loading_disactive = document.querySelectorAll(".loading-disactive");

loading_disactive.forEach(element => {
    element.classList.remove("loading-disactive");
});

var loading_elements = document.querySelectorAll(".loading-element");

loading_elements.forEach(element => {
    element.classList.add("disactive");
    element.classList.remove("loading-element");
});
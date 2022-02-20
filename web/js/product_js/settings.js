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

},{"../json/settings.json":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIndlYi9qcy9qc29uL3NldHRpbmdzLmpzb24iLCJ3ZWIvanMvc291cnNlX2pzL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJtb2R1bGUuZXhwb3J0cz17XHJcbiAgICBcInVpXCI6IHtcclxuICAgICAgICBcInRoZW1lXCI6IHtcclxuICAgICAgICAgICAgXCJkYXJrLXRoZW1lXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImxhdGVzdC10b3duc1wiOiB7XHJcbiAgICAgICAgICAgIFwiZGlzcGxheS1sYXRlc3QtdG93bnNcIjogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZWNvbW1lbmQtdG93bnNcIjoge1xyXG4gICAgICAgICAgICBcImRpc3BsYXktcmVjb21tZW5kLXRvd25zXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwicmVjb21tZW5kLWxhdGVzdC10b3duc1wiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImJsb2NrLXJlY29tbWVuZC10b3duc1wiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ3ZWF0aGVyLWluZm9cIjoge1xyXG4gICAgICAgICAgICBcImRhc3BsYXktd2VhdGhlci1hZGRpdGlvbmFsLWluZm9cIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkYXNwbGF5LXdlYXRoZXItZm9yZWNhc3RcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkYXNwbGF5LXdlYXRoZXItZm9yZWNhc3QtaWNvbnNcIjogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlxyXG5jb25zdCB1aV9zZXR0aW5nc19ibG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudWktc2V0dGluZ3MtYmxvY2tcIik7XHJcblxyXG5jb25zdCBsYXRlc3RfdG93bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxhdGVzdC10b3duc1wiKTtcclxuY29uc3QgcmVjb21tZW5kX3Rvd25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWNvbW1lbmQtdG93bnNcIik7XHJcbmNvbnN0IHdlYXRoZXJfZm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItZm9yZWNhc3RcIik7XHJcbmNvbnN0IHdlYXRoZXJfaW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1vdGhlclwiKTtcclxuXHJcbmNvbnN0IGpzb24gPSByZXF1aXJlKFwiLi4vanNvbi9zZXR0aW5ncy5qc29uXCIpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGpzb24udWlbXCJ0aGVtZVwiXVtcImRhcmstdGhlbWVcIl0pIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgndGhlbWUnLCBcImRhcmtcIik7XHJcblxyXG4gICAgICAgIHNldF9hY3RpdmVfYXRyaWJ1dGUoXCJ1aS10aGVtZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ3RoZW1lJywgXCJsaWdodFwiKTtcclxuICAgIH1cclxuICAgIGlmICghKGpzb25bXCJ1aVwiXVtcImxhdGVzdC10b3duc1wiXVtcImRpc3BsYXktbGF0ZXN0LXRvd25zXCJdKSkge1xyXG4gICAgICAgIGxhdGVzdF90b3ducy5jbGFzc05hbWUgPSBcImRpc2FjdGl2ZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRfYWN0aXZlX2F0cmlidXRlKFwibGF0ZXN0LXRvd25zLWF0clwiKTtcclxuICAgIH1cclxuICAgIGlmICghKGpzb25bXCJ1aVwiXVtcInJlY29tbWVuZC10b3duc1wiXVtcImRpc3BsYXktcmVjb21tZW5kLXRvd25zXCJdKSkge1xyXG4gICAgICAgIHJlY29tbWVuZF90b3ducy5jbGFzc05hbWUgPSBcImRpc2FjdGl2ZVwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRfYWN0aXZlX2F0cmlidXRlKFwicmVjb21tZW5kLXRvd25zLWFydFwiKTtcclxuICAgIH1cclxuICAgIGlmICghKGpzb25bXCJ1aVwiXVtcIndlYXRoZXItaW5mb1wiXVtcImRhc3BsYXktd2VhdGhlci1mb3JlY2FzdFwiXSkpIHtcclxuICAgICAgICB3ZWF0aGVyX2ZvcmVjYXN0LmNsYXNzTmFtZSA9IFwiZGlzYWN0aXZlXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldF9hY3RpdmVfYXRyaWJ1dGUoXCJ3ZWF0aGVyLWZvcmVjYXN0LWF0clwiKTtcclxuICAgIH1cclxuICAgIGlmICghKGpzb25bXCJ1aVwiXVtcIndlYXRoZXItaW5mb1wiXVtcImRhc3BsYXktd2VhdGhlci1hZGRpdGlvbmFsLWluZm9cIl0pKSB7XHJcbiAgICAgICAgd2VhdGhlcl9pbmZvLmNsYXNzTmFtZSA9IFwiZGlzYWN0aXZlXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldF9hY3RpdmVfYXRyaWJ1dGUoXCJ3ZWF0aGVyLWluZm8tYXRyXCIpO1xyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gc2V0X2FjdGl2ZV9hdHJpYnV0ZShhcmcpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdWlfc2V0dGluZ3NfYmxvY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodWlfc2V0dGluZ3NfYmxvY2tbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKGFyZykpIHtcclxuICAgICAgICAgICAgdWlfc2V0dGluZ3NfYmxvY2tbaV0uY2xhc3NMaXN0LmFkZChcInVpLXNldHRpbmdzLWJsb2NrLS1hY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mb3IgKGxldCBpID0gMDsgaSA8IHVpX3NldHRpbmdzX2Jsb2NrLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgdWlfc2V0dGluZ3NfYmxvY2tbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh1aV9zZXR0aW5nc19ibG9ja1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJ1aS1zZXR0aW5ncy1ibG9jay0tYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgIHVpX3NldHRpbmdzX2Jsb2NrW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJ1aS1zZXR0aW5ncy1ibG9jay0tYWN0aXZlXCIpXHJcbiAgICAgICAgICAgIGlmICh1aV9zZXR0aW5nc19ibG9ja1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJ1aS10aGVtZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ3RoZW1lJywgXCJsaWdodFwiKTtcclxuICAgICAgICAgICAgICAgIGpzb24udWkudGhlbWVbXCJkYXJrLXRoZW1lXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVpX3NldHRpbmdzX2Jsb2NrW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImxhdGVzdC10b3ducy1hdHJcIikpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FjdGl2ZV9lbGVtZW50KGxhdGVzdF90b3ducyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVpX3NldHRpbmdzX2Jsb2NrW2ldLmNsYXNzTGlzdC5jb250YWlucyhcInJlY29tbWVuZC10b3ducy1hcnRcIikpIHtcclxuICAgICAgICAgICAgICAgIGRpc2FjdGl2ZV9lbGVtZW50KHJlY29tbWVuZF90b3ducyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVpX3NldHRpbmdzX2Jsb2NrW2ldLmNsYXNzTGlzdC5jb250YWlucyhcIndlYXRoZXItZm9yZWNhc3QtYXRyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNhY3RpdmVfZWxlbWVudCh3ZWF0aGVyX2ZvcmVjYXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodWlfc2V0dGluZ3NfYmxvY2tbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwid2VhdGhlci1pbmZvLWF0clwiKSkge1xyXG4gICAgICAgICAgICAgICAgZGlzYWN0aXZlX2VsZW1lbnQod2VhdGhlcl9pbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVpX3NldHRpbmdzX2Jsb2NrW2ldLmNsYXNzTGlzdC5hZGQoXCJ1aS1zZXR0aW5ncy1ibG9jay0tYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBpZiAodWlfc2V0dGluZ3NfYmxvY2tbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwidWktdGhlbWVcIikpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCd0aGVtZScsIFwiZGFya1wiKTtcclxuICAgICAgICAgICAgICAgIGpzb24udWkudGhlbWVbXCJkYXJrLXRoZW1lXCJdID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodWlfc2V0dGluZ3NfYmxvY2tbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwibGF0ZXN0LXRvd25zLWF0clwiKSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlX2VsZW1lbnQobGF0ZXN0X3Rvd25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodWlfc2V0dGluZ3NfYmxvY2tbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVjb21tZW5kLXRvd25zLWFydFwiKSkge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlX2VsZW1lbnQocmVjb21tZW5kX3Rvd25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodWlfc2V0dGluZ3NfYmxvY2tbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwid2VhdGhlci1mb3JlY2FzdC1hdHJcIikpIHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZV9lbGVtZW50KHdlYXRoZXJfZm9yZWNhc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1aV9zZXR0aW5nc19ibG9ja1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJ3ZWF0aGVyLWluZm8tYXRyXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVfZWxlbWVudCh3ZWF0aGVyX2luZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNhY3RpdmVfZWxlbWVudChlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhY3RpdmUtYW5pbWF0aW9uXCIpO1xyXG4gICAgbGV0IGRlbGF5ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhY3RpdmUtYW5pbWF0aW9uXCIpO1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImRpc2FjdGl2ZVwiKTtcclxuICAgIH0sIDEwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFjdGl2ZV9lbGVtZW50KGVsZW1lbnQpIHtcclxuICAgIGlmICghKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVjb21tZW5kLXRvd25zXCIpIHx8IGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibGF0ZXN0LXRvd25zXCIpKSkge1xyXG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1hbmltYXRpb25cIik7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWN0aXZlXCIpO1xyXG4gICAgICAgIGxldCBkZWxheSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZS1hbmltYXRpb25cIik7XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWN0aXZlXCIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==

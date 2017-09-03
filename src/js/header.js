'use strict';

let menu = document.getElementsByClassName("menu-container")[0]; // menu only for mobile
let menuForTablet = document.getElementsByClassName("menu-for-tablet-container")[0];
let navButton = document.getElementById("openmenu"); // the navButton is only shown for mobile viewports
const tabletMq = window.matchMedia("(min-width: 990px)");
const mobileMq = window.matchMedia("(max-width: 989px)");

navButton.addEventListener('click', function () {
    //console.log("Comienzo..........................");
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

// Using the API window.matchMedia to respond to CSS3 media query state changes within JavaScript
function checkForViewportChange() {
    if (tabletMq.matches) {
        //console.log("This is a TABLET !!");
        menuForTablet.style.display = 'block';
        menu.style.display = 'none';
    } else if (mobileMq.matches) {
        //console.log("This is a      MOBILE !!");
        menuForTablet.style.display = 'none';
    }
}

window.addEventListener('resize', function () {
    checkForViewportChange();
}, false);


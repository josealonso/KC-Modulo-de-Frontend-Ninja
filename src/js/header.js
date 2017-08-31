'use strict';

console.log('This is header.js');

let menu = document.getElementsByClassName("menu-container")[0]; // menu only for mobile
let menuForTablet = document.getElementsByClassName("menu-for-tablet-container")[0];
let navButton = document.getElementById("openmenu"); // the navButton is only shown for mobile viewports
const tabletMq = window.matchMedia("(min-width: 990px)");
const mobileMq = window.matchMedia("(max-width: 989px)");

//if (mobileMq.matches) {
navButton.addEventListener('click', function () {
    console.log("Comienzo..........................");
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
// } 

// Using the API window.matchMedia to respond to CSS3 media query state changes within JavaScript
//if (matchMedia) {
function checkForViewportChange() {
    //mq.addListener(WidthChange);
    if (tabletMq.matches) {
        //console.log("This is a TABLET !!");
        menuForTablet.style.display = 'block';
        menu.style.display = 'none';
    } else if (mobileMq.matches) {
        //console.log("This is a      MOBILE !!");
        menuForTablet.style.display = 'none';
        /*  navButton.addEventListener('click', function () {
              console.log("Comienzo SEGUNDO...");
              //navButton.setAttribute("disabled", true);
              menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
              ///navButton.setAttribute("disabled", false);
          }); */
    }
}

window.addEventListener('resize', function () {
    checkForViewportChange();
    //showMenuInTablet();
}, false);

/*function checkForViewportChange() {
    console.log("resizing.....");
    let state = window.getComputedStyle(document.body, ':before').content;
    console.log("Mensaje: " + state);
    //this.lastState = this.lastState || "";
    //if (state != this.lastState) {
    if (state === "showHorizontalNavMenu") {
        console.log("Showing menu...");
        menu.style.display = 'block';
        // do something when viewport switches to tablet state
    } else {
        // do something when viewport moves out of tablet mode
    }
    //  this.lastState = state;
    /}
} */
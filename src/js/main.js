'use strict';

window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente

//console.log("This is MAIN.JS !!");
//import 'jquery';  // import in new in ES6, I think
//import {} from "./footer.js";
//export * from "./footer.js";
//import measureScroll from "./footer.js";

import * as footer from "./footer";
import * as articles from "./articles";
import * as header from "./header";
//import * from "./footer";   // Syntax error !!

//console.log("This is MAIN.js !!");
//let footer = require("./footer.js");

//const message = footer.measureScroll();

//    const message = footer.measureScroll();
//console.log(message);
//footer.goToTop();

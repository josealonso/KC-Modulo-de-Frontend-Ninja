'use strict';

document.addEventListener('scroll', function toggleButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btnToTop").style.display = "block";
        //$("#btnToTop").style.display = "block";
    } else {
        document.getElementById("btnToTop").style.display = "none";
    }
}); 

document.getElementById("btnToTop").addEventListener('click', function moveToTheTop() {
    window.scrollTo(0, 0);
});
'use strict';

//console.log('This is footer.js');
let targetPage = '';
let scrollIcon = document.getElementsByClassName('scroll')[0];

if (document.getElementsByClassName('articles-list').length === 1) {
	// Checks we are in the articles (main) page
	targetPage = 'index.html'; //    scrollTo(0, 0);
}

if (document.getElementsByClassName('articles-details').length === 1) {
	// Checks we are in the details page
	targetPage = 'index-details.html';
}

function goToTheTop(page) {
	window.location.href = page;
}

scrollIcon.addEventListener('click', function() {
	goToTheTop(targetPage);
});

/* document.addEventListener('scroll', function toggleButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btnToTop").style.display = "block";
        //$("#btnToTop").style.display = "block";
    } else {
        document.getElementById("btnToTop").style.display = "none";
    }
}); */

/* document.getElementById("btnToTop").addEventListener('click', function moveToTheTop() {
    window.scrollTo(0, 0);
}); */

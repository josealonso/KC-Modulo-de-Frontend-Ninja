'use strict';
window.$ = window.jQuery = require('jquery');

//console.log('This is footer.js');
let targetPage = '';
//let scrollIcon = document.getElementsByClassName('scroll')[0];
let scrollIcon = $('.scroll');

if (document.getElementsByClassName('articles-list').length === 1) {
	// Checks we are in the articles (main) page
	targetPage = 'index.html'; //    scrollTo(0, 0);
}

if (document.getElementsByClassName('articles-details').length === 1) {
	// Checks we are in the details page
	targetPage = 'index-details.html';
}

function goToTheTop(page) {
	let factor = page.endsWith('details.html') ? 0 : 2000;
	$('html, body').animate(
		{
			scrollTop: 0 //window.location.href = page
		},
		800 + factor
	);
	//console.log('Animate método en ' + page);
}

$('.scroll').on('click', function() {
	goToTheTop(targetPage);
});

/*	$('html, body').animate(
		{
			scrollTop: 0 //window.location.href = page
		},
		500
	);
		goToTheTop(targetPage);
});  */

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

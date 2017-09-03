'use strict';
window.$ = window.jQuery = require('jquery');

//console.log('This is footer.js');
let targetPage = '';
//let scrollIcon = document.getElementsByClassName('scroll')[0];
let $scrollIcon = $('.scroll');

/*****************************************************************/

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
}

$scrollIcon.on('click', function() {
	goToTheTop(targetPage);
});

/*****************************************************************/
const tabletPortraitMq = window.matchMedia('(min-width: 768px)');

// Using the API window.matchMedia to respond to CSS3 media query state changes within JavaScript
function checkForViewportChange() {
	if (tabletPortraitMq.matches) {
		//console.log("This is a TABLET !!");
		$scrollIcon.addClass('fa-2x');
	} else {
		$scrollIcon.removeClass('fa-2x');
	}
}

window.addEventListener(
	'resize',
	function() {
		checkForViewportChange();
	},
	false
);

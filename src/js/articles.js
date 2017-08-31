'use strict';

window.$ = window.jQuery = require('jquery'); // Hace jQuery accesible públicamente para q funcione Bootstrap, por ejemplo)

let fs = require('fs');

/********************* This object should be inside a .json file *********************/
const articlesObj = {
	articles: [
		{
			id: 1,
			publicationDate: '21-08-2017 21:10:32'
		},
		{
			id: 2,
			publicationDate: '14-08-2017 21:19:32'
		},
		{
			id: 3,
			publicationDate: '21-08-2017 17:25:45'
		},
		{
			id: 4,
			publicationDate: '07-01-2017 23:47:52'
		},
		{
			id: 5,
			publicationDate: '25-02-2017 23:47:52'
		},
		{
			id: 6,
			publicationDate: '12-04-2017 23:47:52'
		},
		{
			id: 7,
			publicationDate: '15-05-2017 23:47:52'
		},
		{
			id: 8,
			publicationDate: '07-07-2017 23:47:52'
		},
		{
			id: 9,
			publicationDate: '18-08-2017 23:47:52'
		},
		{
			id: 10,
			publicationDate: '02-09-2017 23:47:28'
		}
	]
};

/*************************************************************************************/
/************** Functions to calculate the date-and-time string format ***************/
/*************************************************************************************/

const NUM_OF_ARTICLES = 10;

Date.prototype.getWeekDay = function() {
	let weekDay = [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ];
	return weekDay[this.getDay()];
};

function showArticlesDateAndTime(listOfDatesStrings) {
	let i = 0;
	listOfDatesStrings.forEach(function(dateString) {
		document.getElementsByClassName('date-of-publication')[i].textContent = calculateDateFormat(dateString);
		i++;
	});
}

/* Convert a date-and-time string into a Date object.
   Returns that Date object */
function convertToDateObject(dateString) {
	let [ dateInfo, timeInfo ] = dateString.split(' '); // The square brackets are needed
	let [ hours, mins, secs ] = timeInfo.split(':');
	let [ day, month, year ] = dateInfo.split('-');
	let date = new Date();
	date.setDate(day);
	date.setMonth(month - 1);
	date.setFullYear(year);
	date.setHours(hours);
	date.setMinutes(mins);
	date.setSeconds(secs);
	return date;
}

/* The first parameter is a date-and-time string.
   Returns the string that will be displayed in the web page.
*/
function calculateDateFormat(dateString) {
	const secondsInAWeek = 60 * 60 * 24 * 7;
	const currentDate = new Date(); // 0 is January, 11 is December
	let publicationDateObj = convertToDateObject(dateString);
	let diff = currentDate - publicationDateObj;
	let diffInSeconds = Math.floor(diff / 1000);
	if (diffInSeconds < 0) {
		return 'Fecha no válida';
	}

	if (diffInSeconds > secondsInAWeek) {
		return dateString;
	} else {
		/* If the article is older than a week, a different string format will be displayed */
		if (diffInSeconds < 60) {
			// Less than one minute old
			return 'Hace ' + diffInSeconds + ' segundo' + (diffInSeconds === 1 ? '' : 's'); // The parenthesis are needed
		}
		let diffInMinutes = Math.floor(diffInSeconds / 60);
		if (diffInSeconds < 3600) {
			// Less than one hour old
			return 'Hace ' + diffInMinutes + ' minuto' + (diffInMinutes === 1 ? '' : 's');
		}
		let diffInHours = Math.floor(diffInSeconds / 3600);
		if (diffInSeconds < 3600 * 24) {
			// Less than one day old
			return 'Hace ' + diffInHours + ' hora' + (diffInHours === 1 ? '' : 's');
		}
		if (diffInSeconds < 3600 * 24 * 7) {
			// Less than one week old
			let day = publicationDateObj.getWeekDay();
			return 'Pasado ' + day;
		}
	} // End of the else block
}

/* The first parameter is a list of all the article strings.
   Returns a list of date-and-time strings */
function retrievePublicationDates(listOfArticles) {
	let listOfDates = [];
	//listOfDates.length = NUM_OF_ARTICLES; // temporary  // This is dangerous !!
	//let listOfDates[] = new Array[NUM_OF_ARTICLES];  // TypeError: Array[NUM_OF_ARTICLES] is not a constructor
	listOfArticles.forEach(function(article) {
		let dateString = article.publicationDate; // publicationDate is a property of article
		listOfDates.push(dateString);
	});
	return listOfDates;
}

// read a JSON file
//obj = [];
//	fs.readFile('..//db/articles.json', 'utf-8', function(err, obj) {
//console.log(articlesObj);
//let obj = JSON.parse(articlesObj.articles[0].id);

/*Object.keys(articlesObj.articles).forEach(function(key) { // Remove the whitespaces from the keys
		console.log("Key: " + key);
		let replaced = key.replace(' ', '');
		if (key !== replaced) {
			articlesObj[replaced] = articlesObj[key];
			delete articlesObj[key];
		}
	}); */

//let lista = retrievePublicationDates();  // No funciona, pq no sabe q la función tiene q devolver una lista !!
/*let lista = [];
lista = retrievePublicationDates();
console.log('Lista: ' + lista); */

/*************************************************************************************/
/***************** Functions to store and retrieve the preferences *******************/
/*************************************************************************************/

function storageAvailable(type) {
	try {
		let storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === 'QuotaExceededError' ||
				// Firefox
				e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage.length !== 0
		);
	}
}

/******** In this practice, the preferences are saved using a Web Storage object *******/

/* The first parameter is an integer, the first aticle has an index of 0 */
function getPreference(articleIndex) {
	return localStorage.getItem('likeArticle' + articleIndex.toString()); // toString() is not needed here, but it's a good practice
}
/* The first parameter is an integer, the first aticle has an index of 0 */
function setPreference(articleIndex, likeOrNotString) {
	localStorage.setItem('likeArticle' + articleIndex.toString(), likeOrNotString);
}

/*************************************************************************************/
/******************** Functions to implement the "I like" feature ********************/
/*************************************************************************************/
const initLikeTextOnButton = ' ¿¿ Te gusta ??';
const likeTextOnButton = 'Te gusta';
const dontLikeTextOnButton = 'No te gusta';
const likeHintText = 'Pincha si te gusta';
const dontLikeHintText = 'Pincha si no te gusta';
let likeDivNode = [];
let likeTextNode = [];
let initialLikeState = true;

function setInitialLikeButtonsStyles(listOfArticleLikes) {
	likeDivNode = $('.like-me-button-div');
	likeTextNode = $('.like-me-button'); //$('#like-article-1');

	/* This for loop must be executed only once, when the page is loaded */
	for (let i = 0; i < NUM_OF_ARTICLES; i++) {
		if (initialLikeState === true) {
			//$(likeTextNode[i]).append('<span/>').html();
			if (listOfArticleLikes[i] === 'yes') {
				$(likeTextNode[i]).html(likeTextOnButton).addClass('fa-thumbs-up').removeClass('fa-thumbs-down');
				$(likeDivNode[i])
					.removeClass('hint--bottom-right')
					.addClass('hint--top-right')
					.attr('aria-label', dontLikeHintText);
			} else if (listOfArticleLikes[i] === 'no') {
				$(likeTextNode[i]).html(dontLikeTextOnButton).addClass('fa-thumbs-down').removeClass('fa-thumbs-up');
				$(likeDivNode[i])
					.removeClass('hint--top-right')
					.addClass('hint--bottom-right')
					.attr('aria-label', likeHintText);
			} else {
				$(likeTextNode[i]).html(initLikeTextOnButton);
				$(likeDivNode[i])
					.removeClass('hint--top-right')
					.addClass('hint--bottom-right')
					.attr('aria-label', likeHintText);
			}
			console.log('Valor de ..2...: ' + listOfArticleLikes[i]);
		}
	}
	initialLikeState = false;
}

/********************************************************************************************/
function changeLikeButtonsStyles(i) {
	likeDivNode = $('.like-me-button-div');
	likeTextNode = $('.like-me-button');
	console.log('Click detected !!');
	let doYouLikeArticle = getPreference(i);
	if (doYouLikeArticle === 'no' || doYouLikeArticle === null) {
		setPreference(i, 'yes');
		$(likeTextNode[i]).html(likeTextOnButton).addClass('fa-thumbs-up').removeClass('fa-thumbs-down');
		$(likeDivNode[i])
			.removeClass('hint--bottom-right')
			.addClass('hint--top-right')
			.attr('aria-label', dontLikeHintText);
	} else if (doYouLikeArticle === 'yes') {
		setPreference(i, 'no');
		$(likeTextNode[i]).html(dontLikeTextOnButton).addClass('fa-thumbs-down').removeClass('fa-thumbs-up');
		$(likeDivNode[i])
			.removeClass('hint--top-right')
			.addClass('hint--bottom-right')
			.attr('aria-label', likeHintText);
	}
	//$(likeTextNode[i]).toggleClass('you-like');
	doYouLikeArticle = getPreference(i);
	console.log('Valor de .....: ' + doYouLikeArticle);
}

/*********************************************************/
if (storageAvailable('localStorage')) {
	//alert('The like button will work');
} else {
	console.log('localStorage API is NOT supported');
	alert('The like button will not work');
}

/**************************************************************************************************************************/
/************************************* "Executable" part for the main page ************************************************/
/**************************************************************************************************************************/

if (document.getElementsByClassName('articles-list').length === 1) {
	// Checks we are in the articles (main) page

	let paginationList = $('.pagination>ul>li');
	//$(paginationList).on('hover', function() {
	/*$(paginationList).on({
		mouseenter: function(e) {
			$(this).addClass('pagination-active-li');
		},
		mouseleave: function() {
			$(this).removeClass('pagination-active-li');
			//e.stopPropagation();
		}
	}); */

	// Implementado en CSS, que es más rápido
	/*	$(paginationList).on('mouseenter mouseleave', function() {
		$(this).toggleClass('pagination-active-li');
		$(this).children('a').toggleClass('pagination-active-a');
	}); */

	/*************************************************************************************/
	/***************************** Links to the comments *********************************/
	/*************************************************************************************/
	$('.number-of-comments').click(function() {
		window.location.href = 'index-details.html#comments';
	});

	/*************************************************************************************/
	/************** Displays the date-and-time strings for all the articles **************/
	/*************************************************************************************/
	let listOfDatesStrings = retrievePublicationDates(articlesObj.articles);
	// The parameter of this function shoud be read from another file (pattern of dependency injection)
	// In the future it will be retrieved from a database.
	//console.log('Lista de obj. Date: ' + convertToDateObjects(listOfDatesStrings));
	//console.log('Lista de cadenas: ' + listOfDatesStrings);
	showArticlesDateAndTime(listOfDatesStrings);
	$('.date-of-publication').addClass('hint--bottom-right').attr('aria-label', 'Fecha de publicación');

	/*************************************************************************************/
	/**************** Displays the "I like" strings for all the articles *****************/
	/*************************************************************************************/

	let listOfLikes = [];
	for (let i = 0; i < NUM_OF_ARTICLES; i++) {
		listOfLikes[i] = getPreference(i);
	}
	setInitialLikeButtonsStyles(listOfLikes);

	//let likeDivNode = [];
	likeDivNode = $('.like-me-button-div');

	/*************************************************************************************/
	/**************** Event listener for the click on the "I like" buttons ***************/
	/*************************************************************************************/
	$(likeDivNode).on('click', function() {
		// Once a button is clicked, jQuery will return the object of that button clicked
		let identifier = this.getAttribute('id').split('-');
		let articleNumber = identifier[identifier.length - 1]; //.slice(-1)
		console.log('Art. núm.: ' + articleNumber);
		changeLikeButtonsStyles(articleNumber - 1); // The first article has an index of 0
	});

	/*let paginationList = $('.pagination>ul>li');
	//$(paginationList).on('hover', function() {
	$(paginationList).on('click', function() {
		console.log('Ratón');
		$(this).html('A');
	}); */
} // End of the Executable block for the main page

/*************************************************************************************/
/******************** Handling the dynamic data (comments) ***************************/
/*************************************************************************************/

// Moved to the "comments.js" file

function showComments() {
	//let listOfComments = {};
	// Check if there are comments
	if (1 === 2) {
		//(listOfComments.length === 0) {
		$('.comments-list').removeClass('loading').addClass('empty');
		$('.comments-title').hide();
	} else {
	}
}

function successCallback(listOfComments) {
	console.log(`ComentarioS: ${listOfComments}`);
	// Componemos el html con todos los comentarios
	let html = '';
	for (let comment of listOfComments) {
		console.log(`Comentario: ${comment.author}`);

		html += `<div class="comment" id="comment-${comment.id}">
                    <div class="user-info">
					    <img src="${comment.photo}" alt="">
						<span>${comment.author}</span>
                    </div>
                    <div class="content">
                        <p>${comment.text}
                        </p>                 
                    </div>
                </div>`;
	}

	$('.comments-list').removeClass('loading').addClass('ideal');
	$('.comments-title').show();
	// Put the formed HTML inside the appropriate container
	$('.comments-list .ui-status.ideal').html(html);
	// Take care of the UI status
	//$('.comments-list').removeClass('loading').addClass('ideal');
}

function errorCallback() {
	$('.comments-list').removeClass('loading').addClass('error');
}

function getComments(successCallback, errorCallback) {
	/******************************* AJAX for dealing with the comments *****************************************/
	// ¿Y si cambia la fuente de datos? ---> Hay que encapsular el acceso a los datos
	let comments = [];
	$.ajax({
		url: '/comments',
		type: 'get', // post, put (update), delete, patch (partial update)
		success: successCallback(comments),
		error: errorCallback
	});
}

function createComment() {
	let newComment;
	$.ajax({
		url: '/comments',
		type: 'post',
		success: ssss,
		error: (error) => {}
	});
}

/**************************************************************************************************************************/
/************************************* "Executable" part for the details page *********************************************/
/**************************************************************************************************************************/
if (document.getElementsByClassName('articles-details').length === 1) {
	// Checks we are in the details page
	console.log('This is the details page');

	//getComments(successCallback, errorCallback); // showComments, showError);

	/*if (getComments() === -1) {
		$('.comments-list').removeClass('loading').addClass('error');
		$('.comments-title').hide();
		console.error('Error al cargar los comentarios', error);
		//return;
	} else {
		let listOfComments = [];
		listOfComments = getComments();
		showComments(listOfComments);
	} */
}

/****************************************************** The END *************************************************************************/

'use strict';

window.$ = window.jQuery = require('jquery'); // Hace jQuery accesible públicamente

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
let initialLikeState = true;

Date.prototype.getWeekDay = function() {
	let weekDay = [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ];
	return weekDay[this.getDay()];
};

/*$(function() {
	if ($('section').hasClass('articles-list')) {
		// Extract the publication date strings
		let listOfDatesStrings = retrievePublicationDates(articlesObj.articles); // The parameter of this function shoud be read from another file (pattern of dependency injection)
		//console.log('Lista de obj. Date: ' + convertToDateObjects(listOfDatesStrings));
		console.log('Lista de cadenas: ' + listOfDatesStrings);
		showArticlesDateAndTime(listOfDatesStrings);
	}
}); */

/* La fecha y hora de publicación del artículo: esta fecha deberá mostrar el número segundos que
han pasado desde la fecha y hora de publicación en caso de haber sido hace menos de un
minuto, el número de minutos en caso de haber sido hace menos de una hora, el número de
horas en caso de haber sido hace menos de un día y el día de la semana (Lunes, Martes,
Miércoles) en caso de haberse publicado hace menos de una semana. En cualquier otro caso,
la fecha y hora al completo. */
function showArticlesDateAndTime(listOfDatesStrings) {
	//for (let i = 0; i < NUM_OF_ARTICLES; i++) {
	let i = 0;
	listOfDatesStrings.forEach(function(dateString) {
		document.getElementsByClassName('date-of-publication')[i].textContent = calculateDateFormat(dateString);
		i++;
	});
	/*let listOfDateObjs = convertToDateObjects(listOfDatesStrings);
	console.log('Objetos: ' + listOfDateObjs);
	return;*/
}

/* Convert a date-and-time string into a Date object. */
function convertToDateObject(dateString) {
	//let listOfPublicationDates = new Date[NUM_OF_ARTICLES]();
	//let listOfPublicationDates = [];
	//let listOfDatesStrings = retrievePublicationDates(); // called outside this function, for bigger code decoupling ??
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
	let publicationDateObj = convertToDateObject(dateString); // It is a Date object, NO !!
	//	console.log('ObjetO: ' + publicationDateObj);
	let diff = currentDate - publicationDateObj;
	let diffInSeconds = Math.floor(diff / 1000);
	if (diffInSeconds > secondsInAWeek) {
		return dateString;
	} else {
		/* If the article is older than a week, a different string format will be displayed */
		if (diffInSeconds < 60) {
			return 'Hace ' + diffInSeconds + ' segundo' + (diffInSeconds === 1 ? '' : 's'); // The parenthesis are needed
		}
		let diffInMinutes = Math.floor(diffInSeconds / 60);
		if (diffInSeconds < 3600) {
			return 'Hace ' + diffInMinutes + ' minuto' + (diffInMinutes === 1 ? '' : 's');
		}
		let diffInHours = Math.floor(diffInSeconds / 3600);
		if (diffInSeconds < 3600 * 24) {
			return 'Hace ' + diffInHours + ' hora' + (diffInHours === 1 ? '' : 's');
		}
		if (diffInSeconds < 3600 * 24 * 7) {
			let day = publicationDateObj.getWeekDay();
			return 'Pasado ' + day;
		}
	} // End of the else block
}

/* The first parameter is a list of all the article strings.
   Returns a list of date-and-time strings */
// In the future it will be retrieved from a database.
function retrievePublicationDates(listOfArticles) {
	let listOfDates = [];
	//listOfDates.length = NUM_OF_ARTICLES; // temporary  // This is dangerous !!
	//let listOfDates[] = new Array[NUM_OF_ARTICLES];  // TypeError: Array[NUM_OF_ARTICLES] is not a constructor
	//let listOfDates = new Array(NUM_OF_ARTICLES);
	listOfArticles.forEach(function(article) {
		//articlesObj.articles
		let dateString = article.publicationDate;
		//console.log('     date: ' + dateString);
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
/******************** Functions to implement the "I like" feature ********************/
/*************************************************************************************/
// In this practice, the preferences are saved using a Web Storage object.

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

/*if (!localStorage.getItem('likeArticle_1')) {
	populateStorage();
} else {
	setStyles();
} */

function setLikeButtonsStyles() {
	let doYouLikeArticle = localStorage.getItem('likeArticle1');
	let initLikeTextOnButton = ' ¿¿ Te gusta ??';
	let likeTextOnButton = 'Te gusta';
	let dontLikeTextOnButton = 'No te gusta';
	let likeHintText = 'Pincha si te gusta';
	let dontLikeHintText = 'Pincha si no te gusta';
	let likeDivNode = [];
	likeDivNode = $('.like-me-button-div');
	let likeTextNode = [];
	likeTextNode = $('.like-me-button'); //$('#like-article-1');

	//likeTextNode.forEach(likeTextNode[i]) {
	for (let i = 0; i < NUM_OF_ARTICLES; i++) {
		doYouLikeArticle = localStorage.getItem('likeArticle' + i.toString()); // toString is not needed here, but it's a good practice

		if (initialLikeState === true) {
			//$(likeTextNode[i]).append('<span/>').html();
			if (doYouLikeArticle === 'yes') {
				$(likeTextNode[i]).html(likeTextOnButton).addClass('fa-thumbs-up').removeClass('fa-thumbs-down');
				$(likeDivNode[i])
					.removeClass('hint--bottom-right')
					.addClass('hint--top-right')
					.attr('aria-label', dontLikeHintText);
			} else if (doYouLikeArticle === 'no') {
				$(likeTextNode[i]).html(dontLikeTextOnButton).addClass('fa-thumbs-down').removeClass('fa-thumbs-up');
				$(likeDivNode[i])
					.removeClass('hint--top-right')
					.addClass('hint--bottom-right')
					.attr('aria-label', likeHintText);
			} else {
				$(likeTextNode[i]).html(initLikeTextOnButton).removeClass('fa-thumbs-down', 'fa-thumbs-up');
				$(likeDivNode[i])
					.removeClass('hint--top-right')
					.addClass('hint--bottom-right')
					.attr('aria-label', likeHintText);
			}
			console.log('Valor de ..2...: ' + doYouLikeArticle);
		}
	}
	initialLikeState = false;

	for (let i = 0; i < NUM_OF_ARTICLES; i++) {
		doYouLikeArticle = localStorage.getItem('likeArticle' + i.toString());
		$(likeDivNode[i]).on('click', function() {
			if (doYouLikeArticle === 'no' || doYouLikeArticle === null) {
				localStorage.setItem('likeArticle' + i.toString(), 'yes');
				$(likeTextNode[i]).html(likeTextOnButton).addClass('fa-thumbs-up').removeClass('fa-thumbs-down');
				$(likeDivNode[i])
					.removeClass('hint--bottom-right')
					.addClass('hint--top-right')
					.attr('aria-label', dontLikeHintText);
			} else if (doYouLikeArticle === 'yes') {
				localStorage.setItem('likeArticle' + i.toString(), 'no');
				$(likeTextNode[i]).html(dontLikeTextOnButton).addClass('fa-thumbs-down').removeClass('fa-thumbs-up');
				$(likeDivNode[i])
					.removeClass('hint--top-right')
					.addClass('hint--bottom-right')
					.attr('aria-label', likeHintText);
			}
			//$(likeTextNode[i]).toggleClass('you-like');
			doYouLikeArticle = localStorage.getItem('likeArticle' + i.toString());
			console.log('Valor de .....: ' + doYouLikeArticle);
		});
	} // End of the for loop
}

/*************************************************************************************/
/************** Displays the date-and-time strings for all the articles **************/
/*************************************************************************************/
if (document.getElementsByClassName('articles-list').length === 1) {
	let listOfDatesStrings = retrievePublicationDates(articlesObj.articles); // The parameter of this function shoud be read from another file (pattern of dependency injection)
	//console.log('Lista de obj. Date: ' + convertToDateObjects(listOfDatesStrings));
	console.log('Lista de cadenas: ' + listOfDatesStrings);
	showArticlesDateAndTime(listOfDatesStrings);

	/*************************************************************************************/

	if (storageAvailable('localStorage')) {
		//console.log('localStorage API is supported');
		setLikeButtonsStyles();
	} else {
		console.log('localStorage API is NOT supported');
	}
}

/*************************************************************************************/

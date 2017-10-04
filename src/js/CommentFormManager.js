const $ = require('jquery');

import UIManager from './UIManager';
const $textAreaSelector = $('#comment-text');
const MAX_NUMBER_OF_WORDS = 120;

export default class CommentFormManager extends UIManager {
	constructor(elementSelector, commentsService, pubSub) {
		super(elementSelector);
		this.commentsService = commentsService;
		this.pubSub = pubSub;
	}

	init() {
		this.setupSubmitEventHandler();
		this.setupTextAreaEventHandler();
	}

	setupSubmitEventHandler() {
		this.element.on('submit', () => {
			this.validateAndSendData();
			return false;
		});
	}

	setupTextAreaEventHandler() {
		$textAreaSelector.on('keypress', function calculateNumberOfWords() {
			let numOfWords = 0; // This line is needed !!
			numOfWords = $textAreaSelector.val().split(/\s+/).length;
			console.log('Palabras: ' + numOfWords);
			if (numOfWords > MAX_NUMBER_OF_WORDS) {
				$textAreaSelector.attr('disabled', true);
			} else {
				$textAreaSelector.removeAttr('disabled');
				return;
			}
		});
	}

	validateAndSendData() {
		if (this.isValid()) {
			this.send();
		}
		return false; // == event.preventDefault();
	}

	isValid() {
		const elementsToCheck = this.element.find('input, #comment-text');
		const numOfWords = $textAreaSelector.val().split(/\s+/).length;

		for (let elementToCheck of elementsToCheck) {
			if ($(elementToCheck).is('textarea') && numOfWords > MAX_NUMBER_OF_WORDS) {
				const errorMessage = `Type a maximum of ${MAX_NUMBER_OF_WORDS} words`;
				$textAreaSelector.val('');
				elementToCheck.focus();
				this.setErrorHtml(errorMessage);
				this.setError();
				return false;
			}
			if ($(elementToCheck).is('input') && elementToCheck.checkValidity() == false) {
				const errorMessage = elementToCheck.validationMessage;
				elementToCheck.focus();
				this.setErrorHtml(errorMessage);
				this.setError();
				return false;
			}
		}

		// If we are here, it means there is no error
		this.setIdeal();
		return true;
	}

	basicSanitation(originalText) {
		// return originalText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return $($.parseHTML(originalText)).text();  
		// Función de utilidad de jQuery que elimina todas las etiquetas HTML.
	}

	send() {
		console.log('Valid data. Sending form.');

		const comment = {
			author:
				this.basicSanitation(this.element.find('#name').val()) +
				' ' +
				this.basicSanitation(this.element.find('#lastName').val()),
			email: this.basicSanitation(this.element.find('#email').val()),
			text: this.basicSanitation(this.element.find('#comment-text').val()),
			photo: ''
		};
		// Emit a "new comment" event (publication)
		this.commentsService.save(
			comment,
			(success) => {
				PubSub.publish('new-comment', comment);
				this.resetForm(); // clear the form
				this.setIdeal();
			},
			(error) => {
				this.setErrorHtml('Se ha producido un error al guardar el comentario en el servidor.');
				this.setError();
			}
		);
	}

	resetForm() {
		this.element[0].reset();
	}

	disableFormControls() {
		this.element.find('input, button').attr('disabled', true);
	}

	enableFormControls() {
		this.element.find('input, button').attr('disabled', false);
	}

	setLoading() {
		super.setLoading();
		this.disableFormControls();
	}

	setError() {
		super.setError();
		this.enableFormControls();
	}

	setIdeal() {
		super.setIdeal();
		this.enableFormControls();
	}
}

const $ = require('jquery');
/* Necesito tres cosas:
CommentsService, UIManager y acceso al formulario
*/

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
		// this.element.on("submit", this.validateAndSendData);
		// Las funciones anónimas con flecha, nuevas en ES6, se diferencian de las f. anónimas tradicionales en que
		// "this", cuando se usa dentro de la función, hace referencia al objeto fuera del ámbito de la función.
		// esto antes se solucionaba haciendo "var that = this;"
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
				//console.log('Stop typing !!');
				//textAreaSelector.setAttribute('disabled', true);
				$textAreaSelector.attr('disabled', true);
			} else {
				//textAreaSelector.removeAttribute('disabled');
				$textAreaSelector.removeAttr('disabled');
				return;
			}
		});
	}

	validateAndSendData() {
		//console.log('validAndSendData', this);
		if (this.isValid()) {
			this.send();
		}
		return false; // == event.preventDefault();
	}

	isValid() {
		//const inputs = this.element.find('.field');
		//const textArea = $('#comment-text');
		const inputs = this.element.find('input, #comment-text');
		for (let input of inputs) {
			if (input.checkValidity() == false) {
				const errorMessage = input.validationMessage;
				input.focus();
				this.setErrorHtml(errorMessage);
				this.setError();
				return false;
			}
		}

		// If we are here, it means there is no error
		this.setIdeal();
		return true;
	}

	send() {
		console.log('Valid data. Sending form.');
		const comment = {
			author: this.element.find('#name').val() + ' ' + this.element.find('#lastName').val(),
			email: this.element.find('#email').val(),
			text: this.element.find('#comment-text').val(),
			photo: ""
		};
		// Emit a "new comment" event (publication)
		this.commentsService.save(
			// TODO: reload the list of comments

			// El patrón PubSub permite tener elementos desacoplados, no hay que inyectar dependencias.
			// El elemento común es el canal de subscripción.
			// Los suscriptores de un mismo evento son independiente e- sí (asíncrono). Reciben la información publicada.
			comment,
			(success) => {
				PubSub.publish('new-comment', comment); // publish the event reporting the creation of a comment
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
		this.element[0].reset(); // "element"" is a jQuery object
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

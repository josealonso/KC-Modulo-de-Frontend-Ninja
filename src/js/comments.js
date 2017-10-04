'use strict';
window.$ = window.jQuery = require('jquery');

import CommentsService from './CommentsService';
import UIManager from './UIManager';
import CommentsListManager from './CommentsListManager';
import CommentFormManager from './CommentFormManager';
import PubSub from 'pubsub-js';

const commentsSelector = '.comments-container';

const commentsService = new CommentsService('/comments/');
const commentsListUIManager = new UIManager('.comments-list');
const commentsListManager = new CommentsListManager(commentsService, commentsListUIManager, PubSub);
const commentFormManager = new CommentFormManager('.comment-form', commentsService, PubSub);

function isVisible(element) {
	let pageTop = $(window).scrollTop();
	let elementTop = $(element).offset().top;
	// let pageBottom = pageTop + $(window).height();
	// let elementBottom = elementTop + $(element).height();

	if (elementTop < pageTop) {
		return true;
	} else {
		return false;
	}
}

if ($(commentsSelector).length > 0) {
	$(document).scroll(function() {
		if (isVisible(commentsSelector) === true) {
			commentsListManager.init(); // Se cargan los comentarios.
			commentFormManager.init();
			$(document).unbind('scroll');
		}
	});
}

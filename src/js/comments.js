'use strict';
window.$ = window.jQuery = require('jquery');

console.log('This is the comments.js file');

import CommentsService from './CommentsService';
import UIManager from './UIManager';

const commentsService = new CommentsService('/comments/');
const commentsListUIManager = new UIManager('.comments-list');

function renderComments(comments) {
	let html = '';
	for (let comment of comments) {
		console.log(`Comentario: ${comment.author}`);
		//html += this.renderComment(comment);
		html += renderComment(comment);
	}
	// Put the formed HTML inside the appropriate container
	$('.comments-list .ui-status.ideal').html(html);
}

function renderComment(comment) {
	return `<div class="comment" id="comment-${comment.id}">
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

// Load the list of comments
commentsService.list(
	(comments) => {
		if (comments.length === 0) {
			commentsListUIManager.setEmpty();
		} else {
			// Compose the HTML for all the comments
			renderComments(comments);

			$('.comments-title').show();
			commentsListUIManager.setIdeal();
		}
	},
	(error) => {
		songListUIManager.setError();
		console.log('Error al cargar los comentarios');
	}
);

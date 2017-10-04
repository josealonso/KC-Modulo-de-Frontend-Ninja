const $ = require('jquery');

let $commentsHeader = $('.comments-title'); // Line with the number of comments

export default class CommentsListManager {
	constructor(commentsService, uiManager, pubSub) {
		this.commentsService = commentsService;
		this.uiManager = uiManager;
		this.pubSub = pubSub;
	}

	init() {
		this.loadComments();
		this.pubSub.subscribe('new-comment', (topic, comment) => {
			this.loadComments();
		});
	}

	loadComments() {
		// This subscribes to the "new comment" event
		this.commentsService.list(
			(comments) => {
				if (comments.length === 0) {
					this.uiManager.setEmpty();
				} else {
					let word = comments.length === 1 ? "crítica" : "críticas";
					$commentsHeader.text(`${comments.length} ${word} de los lectores`);
					// Compose the HTML for all the comments
					this.renderComments(comments);
					this.uiManager.setIdeal();
				}
			},
			(error) => {
				$commentsHeader.text('Error al cargar los comentarios');
				this.uiManager.setError();
			}
		);
	}

	renderComments(comments) {
		let html = '';
		for (let comment of comments) {
			html += this.renderComment(comment);
		}
		// Put the formed HTML inside the appropriate container
		this.uiManager.setIdealHtml(html);
	}

	renderComment(comment) {
		let photo = comment.photo;
		let srcset = "";
		if (photo == "" || !photo) {
			photo = "dist/img/someone-150px.png";
			srcset = ' srcset="img/someone-150px.png 150w, img/someone-250px.png 250w, img/someone-300px.png 300w"';
		}

		return `<div class="comment" id="comment-${comment.id}">
                    <div class="user-info">
					    <img src="${photo}" alt="Foto de ${comment.author}" ${srcset}>
						<span>${comment.author}</span>
                    </div>
                    <div class="content">
                        <p>${comment.text}</p>                 
                    </div>
                </div>`;
	}
}

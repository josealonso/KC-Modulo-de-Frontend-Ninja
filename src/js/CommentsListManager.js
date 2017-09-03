const $ = require('jquery');

export default class CommentsListManager {
	constructor(commentsService, uiManager, pubSub) {
		this.commentsService = commentsService;
		this.uiManager = uiManager;
		this.pubSub = pubSub;
	}

	init() {
		this.loadComments();
		this.pubSub.subscribe('new-comment', (topic, comment) => {
			//console.log('Soy el gestor de la lista y me han dicho q hay un nuevo comentario: ', comment);
			this.loadComments();
		});
	}

	loadComments() {
		// This subscribes to the "new comment" event
		// Load the list of comments
		this.commentsService.list(
			(comments) => {
				if (comments.length === 0) {
					this.uiManager.setEmpty();
				} else {
					// Compose the HTML for all the comments
					this.renderComments(comments);

					$('.comments-title').show(); // TODO
					this.uiManager.setIdeal();
				}
			},
			(error) => {
				this.uiManager.setError();
				console.log('Error al cargar los comentarios');
			}
		);
	}

	renderComments(comments) {
		let html = '';
		for (let comment of comments) {
			//console.log(`Comentario: ${comment.author}`);
			html += this.renderComment(comment);
		}
		// Put the formed HTML inside the appropriate container
		this.uiManager.setIdealHtml(html);
	}

	renderComment(comment) {
		//		if (!comment.photo) { console.log("There's NO photo !!"); }
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
}

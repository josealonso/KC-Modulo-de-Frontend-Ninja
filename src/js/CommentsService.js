const $ = require('jquery'); /* Esta línea no es obligatoria, de hecho
                                Browserify solo importa jQuery una vez */
export default class CommentsService {
	//export class CommentsService {
	constructor(url) {
		this.url = url;
	}

	list(successCallback, errorCallback) {
		$.ajax({
			url: this.url,
			success: successCallback,
			error: errorCallback
		});
	}

	save(comment, successCallback, errorCallback) {
		if (comment.id) {
			this.update(comment, successCallback, errorCallback);
		} else {
			this.create(comment, successCallback, errorCallback);
		}
	}

	create(comment, successCallback, errorCallback) {
		$.ajax({
			url: this.url,
			method: 'post',
			data: comment,
			success: successCallback,
			error: errorCallback
		});
	}

	getDetail(commentId, successCallback, errorCallback) {}

	update(comment) {
		$.ajax({
			url: this.url,
			method: 'put',
			data: comment,
			success: successCallback,
			error: errorCallback
		});
	}

	delete(commentId) {
		$.ajax({
			url: this.url,
			method: 'delete',
			data: comment,
			success: successCallback,
			error: errorCallback
		});
	}
}

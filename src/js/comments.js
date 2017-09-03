'use strict';
window.$ = window.jQuery = require('jquery');

console.log('This is the comments.js file');

import CommentsService from './CommentsService';
import UIManager from './UIManager';
import CommentsListManager from './CommentsListManager';
import CommentFormManager from './CommentFormManager';
import PubSub from 'pubsub-js';

const commentsService = new CommentsService('/comments/');
const commentsListUIManager = new UIManager('.comments-list');
//const pubSub = new PubSub();
const commentsListManager = new CommentsListManager(commentsService, commentsListUIManager, PubSub);
commentsListManager.init(); // Dependency Injection pattern: allows to replace the services used by a class, with out getting into the class.

const commentFormManager = new CommentFormManager('.comment-form', commentsService, PubSub);
commentFormManager.init();


/**
* Fireforum Module
*
* Description
*/
angular.module('Fireforum', ['ngRoute', 'ui.router', 'firebase'])
.run(['$rootScope', function($rootScope){

}])
.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
	// Now set up the states
	$stateProvider
	.state('home', {
		url : '/',
		templateUrl : 'templates/index.html'
	})
	.state('users', {
		url: "/users",
		templateUrl: "templates/users/index.html"
	})
	.state('todos', {
		url: "/todos",
		templateUrl: "templates/todos/index.html"
	})
	.state('forum', {
		url: "/forum",
		templateUrl: "templates/forum/index.html"
	})
	.state('forum.create', {
		'url' : '/create/:type',
		'templateUrl' : 'templates/forum/create.html',
		'controller' : 'ForumCreateCtrl'
	})
	.state('forum.show', {
		'url' : '/show/:id',
		'templateUrl' : 'templates/forum/article.html',
		'controller' : 'ForumShowCtrl'
	})
	.state('message', {
		url: "/message",
		templateUrl: "templates/messages/index.html"
	});

});

/**
 *   bootstrap on ready                              
 */
$(document).ready(function(){
	angular.bootstrap(document, ['Fireforum'])
});
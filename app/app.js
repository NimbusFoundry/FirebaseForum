/**
* Fireforum Module
*
* Description
*/
angular.module('Fireforum', ['ngRoute', 'ui.router'])

/**
 *   bootstrap on ready                              
 */
$(document).ready(function(){
	angular.bootstrap(document, ['fireforum'])
});
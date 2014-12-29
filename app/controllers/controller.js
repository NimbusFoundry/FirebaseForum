angular
.module('Fireforum')
.controller('ForumCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
	$scope.searchPlaceHolder = "Search"
	$scope.displayedTopic = {};
	$scope.topics = [];

}])
.controller('ForumCreateCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
	$scope.type = $stateParams.type;
	console.log($stateParams.type);
}])
.controller('UserCtrl', ['$scope', function($scope){

}])
.controller('TodoCtrl', ['$scope', function($scope){

}]);;


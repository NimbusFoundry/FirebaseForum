angular
.module('Fireforum')
.controller('ForumCtrl', ['$scope', '$stateParams', '$forum', '$location', function($scope, $stateParams, $forum, $location){
	$scope.searchPlaceHolder = "Search"
	$scope.displayedTopic = {};
	$scope.topics = $forum.get_posts();

	/**
	 * [get_user_name description]
	 * @type {[type]}
	 */
	$scope.get_user_name = function(id){
		return id;
	};

	$scope.change_display = function(topic, id){
		$location.url('/forum/show/'+id);
	};
}])
.controller('ForumCreateCtrl', ['$scope', '$stateParams', '$forum', function($scope, $stateParams, $forum){
	$scope.topic_data = {};
	$scope.type = $stateParams.type;

	/**
	 * [create_link description]
	 * @return {[type]} [description]
	 */
	$scope.create_link = function(){
		var obj = {
			'title' : $scope.topic_data.name,
			'url' : $scope.topic_data.url,
			'rss' : true,
			'userId' : 'simplelogin:1'
		};

		$forum.create_link(obj).then(function(res){

		});
	};

	/**
	 * [create_post description]
	 * @return {[type]} [description]
	 */
	$scope.create_post = function(){

	};
}])
.controller('ForumShowCtrl', ['$scope', '$stateParams', '$forum', function($scope, $stateParams, $forum){
	var topicId = $stateParams.id,
		topic = $forum.get_post(topicId);

	$scope.add_comment = function(){

	}

}])
.controller('UserCtrl', ['$scope', '$stateParams', '$forum', function($scope, $stateParams, $forum){

}])
.controller('TodoCtrl', ['$scope', '$stateParams', '$forum', function($scope, $stateParams, $forum){

}]);;


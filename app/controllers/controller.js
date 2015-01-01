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
	var topicId = $stateParams.id;
		
	$scope.displayed_topic = $forum.get_post(topicId);
	$scope.showing = true;

	console.log($scope.displayed_topic);

	$scope.add_comment = function(){

	}

}])
.controller('ForumEditCtrl', ['$scope', '$stateParams', '$forum', function($scope, $stateParams, $forum){

}])
.controller('UserCtrl', ['$scope', '$stateParams', '$forum', function($scope, $stateParams, $forum){
	$scope.users = $forum.get_users();

}])
.controller('TodoCtrl', ['$scope', '$stateParams', '$forum', function($scope, $stateParams, $forum){
	$scope.listName = '';
	$scope.todolists = {}

	$scope.create_list = function(){
		console.log('creating list: ', $scope.listName);
		$forum.create_list($scope.listName)
		.then(function(data){
			console.log(data);
			$scope.get_todolist();
		});
		$scope.listName = '';
	}

	$scope.get_todolist = function(){
		$scope.todolists = $forum.get_todolist()
	}

	$scope.get_todos = function(list){

	}

	$scope.get_todolist();
}])
.controller('HomeCtrl', ['$scope', '$forum', function($scope, $forum){
	/**
	 * main code for login and register
	 */
	
	$scope.auth = $forum.getAuth();

	$scope.register = {}
	$scope.login = {}

	/**
	 * [register_user description]
	 * register user and save to users node
	 * will add animation - @todo 
	 */
	$scope.register_user = function(){
		$forum.register_user($scope.register).then(function(authData){
			console.log('auth: ', authData);
			$scope.auth = $forum.getAuth();
		})
		.catch(function(){
			console.log('error')
		});
		return false;
	};

	$scope.login = function(){
		$forum.auth($scope.login).then(function(authData){
			if (authData) {
				$scope.auth = authData;
			};
		});

		return false;
	}

	$scope.logout = function(){
		$forum.unauth();
		$scope.auth = null;
		return false;
	}

}]);


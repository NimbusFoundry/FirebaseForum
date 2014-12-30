angular.module('Fireforum').service('$forum', ['$rootScope', '$firebase', '$firebaseAuth', function($rootScope, $firebase, $firebaseAuth){
	var _ref = new Firebase("https://foundry-test.firebaseio.com"),
		_sync = $firebase(_ref),
		_auth = $firebaseAuth(_ref);

	var topicNode = 'topics';

	this.auth = function(data){
		_sync.$authWithPassword({
		  email: data.email,
		  password: data.password
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		}).catch(function(error) {
		  console.error("Authentication failed:", error);
		});
	};

	this.create_link = function(data){
		sync = $firebase(_ref.child(topicNode));
		return sync.$push(data);
	};

	this.get_posts = function(){
		sync = $firebase(_ref.child(topicNode));
		return sync.$asObject();
	}
}])
angular.service('$forum', ['$rootScope', '$firebase', '$firebaseAuth', function($rootScope, $firebase, $firebaseAuth){
	var _ref = new Firebase("https://foundry-test.firebaseio.com"),
		_sync = $firebase(_ref),
		_auth = $firebaseAuth(_ref);

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

	this.get_posts = funciton(){

	};
}])
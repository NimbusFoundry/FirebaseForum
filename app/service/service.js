angular.module('Fireforum').service('$forum', ['$rootScope', '$firebase', '$firebaseAuth', '$q', function($rootScope, $firebase, $firebaseAuth, $q){
	var _ref = new Firebase("https://foundry-test.firebaseio.com"),
		_sync = $firebase(_ref),
		_auth = $firebaseAuth(_ref),
		_users = {};

	var topicNode = 'topics',
		userNode = 'users';

	/**
	 * methods for authentication
	 */

	this.getAuth = function(){
		return _auth.$getAuth();
	}

	this.auth = function(data){
		return _auth.$authWithPassword({
		  email: data.email,
		  password: data.password
		});
	};

	this.unauth = function(){
		return _auth.$unauth();
	};

	/**
	 * methods for forum parts     
	 */
	this.create_link = function(data){
		var sync = $firebase(_ref.child(topicNode));
		return sync.$push(data);
	};

	/**
	 * [get_posts description]
	 * @return promise
	 */
	this.get_posts = function(){
		var sync = $firebase(_ref.child(topicNode));
		return sync.$asObject();
	}

	/**
	 * [get_post description]
	 * @param  {string} id [post id]
	 * @return {promise}    
	 */
	this.get_post = function(id){
		var sync = $firebase(_ref.child(topicNode+'/'+id));
		return sync.$asObject();
	}

	/**
	 * user related methods
	 */
	this.get_users = function(){
		sync = $firebase(_ref.child(userNode)).$asObject();
		return sync;
	}

	function save_user(data, authData){
		var gravatarHost = '',
			node = $firebase(_ref.child(userNode+'/'+data.email.replace('.', ','))).$asObject();

		node.uid = authData.uid,
		node.pic = 'http://www.gravatar.com/avatar/'+md5(gravatarHost + data.email)+'?d=mm',
		node.created = moment().format('x')

		return node.$save();
	};
	/**
	 * [register_user description]
	 * @param  {object} data [description]
	 * @return {defer}      [description]
	 */
	this.register_user = function(data){
		var defer = $q.defer();
		_auth.$createUser(data.email, data.password).then(function() {
		  console.log("User created successfully!");

		  return _auth.$authWithPassword({
		    email: data.email,
		    password: data.password
		  });
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  // save user
		  save_user(data, authData).then(function(){
		  	console.log('saved');
		  });

		  defer.resolve(authData);
		}).catch(function(error) {
		  console.error("Error: ", error);
		});
		return defer.promise;
	};

}])
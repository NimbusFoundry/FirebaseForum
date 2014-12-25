# setup plugins to load
if not localStorage["version"]?
	localStorage["version"] ="google"
	window.location.reload()

foundry.supportEmail = 'admin@nimbusfoundry.com,admin@nimbusbase.com'
foundry.angular.dependency = []

define('config', ()->
	config = {}
	config.appName = 'Forum'
	config.plugins = 
		forum: 'forum/plugins/forum'
		account: 'forum/plugins/account'
		user : 'forum/plugins/user'
		workspace : 'forum/plugins/workspace'
		support : 'core/plugins/support'

	config
)

foundry.load_plugins()

Nimbus.Auth.setup 
	"app_name": "forum"
	'synchronous' : false
	"Firebase": 
		key: 'foundry-forum',
		app_name: 'Foundry',
		anonymous : true

# callback for loading
Nimbus.Auth.auth_callback = ()->
	$('#loading .identity-form').slideUp('fast');
	$("#login_buttons").addClass("redirect");

foundry.ready(()->
	config = foundry.parse_open_url()
	if config
		if config.space
			localStorage.last_open_workspace = config.space
		if config.topic
			localStorage.to_open_topic = config.topic

		# add pushstate so it won't be this url
		state = 
			title: document.title,
			url: location.href.replace(location.search,'')
			otherkey: {}
		window.history.pushState(state, document.title, state.url);
	
	if Nimbus.Auth.authorized()
		$('#loading .identity-form').slideUp('fast');
		$("#login_buttons").addClass("redirect");

	foundry.init(()->
		# checking if it is time to 
		$('#loading').addClass('loaded');
	)
	return
)

$(document).ready(()->
	###
	form action
	###
	$('.register-form-toggle').on('click', (evt)->
		evt.preventDefault()
		$('.l-form-container').animate({top:'-146px'})
		return false
	)

	$('.login-form-toggle').on('click', (evt)->
		evt.preventDefault()
		$('.l-form-container').animate({top:'0px'})
		return false
	)

	###
	handle login event
	###
	$('#firebase_login_btn').on('click', (evt)->
		data = 
			email : $('.l-form-container .login input[name="email"]').val()
			password : $('.l-form-container .login input[name="passwd"]').val()
			provider : 'password'

		Nimbus.Auth.authorize('Firebase', data)

		evt.preventDefault()
		return false
	)

	###
	handle register event
	###
	$('#firebase_register_btn').on('click', (evt)->
		data = 
			email : $('.l-form-container .register input[name="register"]').val()
			password : $('.l-form-container .register input[name="password"]').val()

		Nimbus.Auth.sync_services.Firebase.service = 'Firebase';
		Nimbus.Auth.setup(JSON.stringify(Nimbus.Auth.sync_services.Firebase))

		server = Nimbus.Firebase.server
		Nimbus.Client.Firebase.createUser(data, (res)->
			if !res.error
				bootbox.alert('Your account has been created, you can sign in now.', ()->
					Nimbus.Auth.authorize('Firebase', 
						'email' : data.email
						'password' : data.password
						'provider' : 'password'
					)
					return
				)
			else
				bootbox.alert('Register Error: '+res.error.code)
			
			return 
		)

		evt.preventDefault()
		return false
	)

	$('.logout_btn').on('click', (evt)->
		foundry.logout()
		location.reload()
	)

	$('.login_btn').on('click', (evt)->
		$('#loading .identity-form').slideDown('fast');
		$("#login_buttons").removeClass("redirect");
		$('#loading').removeClass('loaded');
	)

	# add this to Nimbusbase - todo
	service = Nimbus.Auth.sync_services['Firebase']
	service['service'] = 'Firebase'
	Nimbus.Auth.setup(service)
	Nimbus.Auth.initialize()

	return
)


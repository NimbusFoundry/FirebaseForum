define('account',(require)->
  doc_plugin=
    type : 'plugin'
    title : 'Account'
    order : -14
    icon : 'icon-cog'
    init : ()->
      owner = Nimbus.realtime.c_file.owners[0]
      owner_email = owner.emailAddress or owner.email
      url = "http://192.241.167.76:4001/order?email=#{owner_email}"
      $.ajax(
        'url' : url
        success : (data)->
          if data
            user = data
            foundry._owner_plan = Number(user.order.type)
          else
            user = false
            foundry._owner_plan = 0
          foundry._owner_plan_data = user
          foundry.initialized('account')
      )
      # define controller 
      define_controller()
      return
)

define_controller = ()->
  angular.module('foundry').controller('AccountController', ['$scope', '$rootScope', '$foundry', '$filter', '$http', ($scope,$rootScope, $foundry, $filter, $http)->
    $rootScope.breadcum = 'Account'
    localUser = foundry._models.User.findByAttribute('email',foundry._current_user.email)
    if localUser
      $scope.current_user_role = foundry._models.User.findByAttribute('email',foundry._current_user.email).role
    else 
      $scope.current_user_role = 'Viewer'

    # stripe setup
    chosenPlan = 'fourm_1'
    stripePublishable = 'pk_test_7rdDmdjKakyzgi9ClecAIPTa'
    stripeHandler = StripeCheckout.configure(
      key: stripePublishable
      image: 'assets/img/nimbus_favicon.png'
      token: (token)->
        $.ajax(
          url : "http://192.241.167.76:4001/charge?token="+token.id+"&email="+Nimbus.Share.get_user_email()+"&plan="+chosenPlan,
          success : (data)->
            # reload the app
            window.location.reload()
        )
    )

    # plan setting
    plan_to_usernumber = {
      0: "10",
      1: "25",
      2: "50",
      3: "infinite"
    }

    payment_gate = 'http://192.241.167.76:4000/buy/'

    # set plan type
    $scope.get_plan = ()->
      foundry._owner_plan

    $scope.usernumber = plan_to_usernumber[foundry._owner_plan]
    $scope.users = Nimbus.keys(foundry._user_list).length

    #input: a number from 0-3 representing the plans
    #output: if the current plan is above or below this, this is for css classes to display the correct button
    $scope.is_current_plan = (plan)->
      if plan is $scope.get_plan()
        'current'
      else if plan > $scope.get_plan()
        'up'
      else
        'down'
    
    #email setting related stuff
    if not foundry.get_setting("email")?
      $scope.setting_email = true
    else
      $scope.setting_email = foundry.get_setting("email")

    #input: a true or false
    #output: The setting for the email to be sent or not is set to the status of true of false
    $scope.setting_email_change = (status)->
      console.log("called")
      foundry.set_setting("email", status)

    request_purchase = (level, text)->
      chosenPlan = "forum_"+level
      # try open stripe 
      stripeHandler.open(
        name : text.name
        description: text.description
        email: foundry._current_user.email
      )

      return 

    $scope.cancel_plan = ()->
      # cancel the orders
      $http.get('http://192.241.167.76:4001/cancel?email='+foundry._current_user.email).success(()->
        foundry._owner_plan = 0
      )

    $scope.change_plan = (level)->
      plans = [
        {
          name : 'Business Plan',
          description : 'For 10-25 employees'
          amount: '1000'
        },
        {
          name : 'Foundry Plan',
          description : 'For 25-50 employees'
          amount: '2500'
        },
        {
          name : 'Ultimate Plan',
          description : 'For more than 50 employees'
          amount: '5000'
        }
      ]
      # cancel current plan
      request_purchase(level, plans[level-1])
      
    window.a_scope = $scope
  ])

var app = angular.module('flashcards', ['ui.router'], function config($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider){

    $stateProvider
      .state('dashboard', {
      	url: '/',
        templateUrl: '/partials/dashboard.html',
        controller: 'DashController'
      })
      .state('login', {
      	url: '/login',
      	templateUrl: '/partials/login.html',
      	controller: 'LoginController',
      	controllerAs: 'login'
      })
			.state('register', {
				url: '/register',
				templateUrl: '/partials/register.html',
				controller: 'RegistrationController',
				controllerAs: 'register'
			})
      .state('createCard', {
        url: '/createcard',
        templateUrl: '/partials/createcard.html',
        controller: 'SubjectController'
      })
      .state('about', {
      	url: '/about',
        templateUrl: '/partials/about.html',
        controller: 'AboutController'
      })
      .state('study', {
      	url: '/study',
        templateUrl: '/partials/study.html',
        controller: 'StudyController'
      })
      .state('progress', {
      	url: '/progress',
        templateUrl: '/partials/progress.html',
        controller: 'ProgressController'
      })
      .state('logout', {
      	url: '/logout',
        templateUrl: '/partials/logout.html',
        controller: 'LogoutController'
      })

    $urlRouterProvider.otherwise('/');

		$locationProvider.html5Mode(true);

  }]);

  app.factory('UserFactory', function UserFactory($http, AuthTokenFactory, $q, $rootScope, $window){
    'use strict';
    return {
      login: login,
      logout: logout,
      getUser: getUser,
      readUser: readUser
    };

    function login (email, password){
      return $http.post('/login', {
        email: email,
        password: password
      }).then(function success(response){
        var store = $window.localStorage
        AuthTokenFactory.setToken(response.data.token);
        store.setItem('user', response.data.user);
        return response;
      });
    }

    function logout(){
      AuthTokenFactory.setToken();  // Sets token to nothing removing it from localStorage.
    }

    function getUser(){
      if(AuthTokenFactory.getToken()){
        return $http.get('/me').then(function success(response){
          console.log("Response from GET to /me: ", response);
        });
      } else {
        return $q.reject({data: "Client has no auth token"});
      }
    }

    function readUser(){
      var store = $window.localStorage;
      var user = store.getItem('user');
      return user;
    }

  });

	app.factory('AuthTokenFactory', function AuthTokenFactory($window){
		'use strict';
		var store = $window.localStorage;
		var key = 'auth-token';
		return {
			getToken: getToken,
			setToken: setToken
		};

		function getToken(){
			return store.getItem(key);
		}

		function setToken(token){
			if (token){
				store.setItem(key, token)
      } else {
        store.removeItem(key);
        store.removeItem('user');
      }
		}
	});

	app.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory){
		'use strict';
		return {
			request: addToken
		};

		function addToken(config){
			var token = AuthTokenFactory.getToken();
			if(token){
				config.headers = config.headers || {};
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		}

	});

  app.factory('RegistrationFactory', function RegistrationFactory($http, AuthTokenFactory, $window){
    'use strict';
    var store = $window.localStorage;
    return {
      register: register
    };

    function register(email, password){
      return $http.post('/register', {
        email: email,
        password: password
      }).then(function success(response){
        AuthTokenFactory.setToken(response.data.token);
        store.setItem('user', response.data.user);
        return response;
      });
    }
  });

  app.run(function(UserFactory){
    UserFactory.getUser().then(function(response){
      console.log(response);
    });
  });

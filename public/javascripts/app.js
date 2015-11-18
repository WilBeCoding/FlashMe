var app = angular.module('flashcards', ['ui.router'], function config($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor');
});

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider){

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
      .state('createSubject', {
      	url: '/createsubject',
        templateUrl: '/partials/createsubject.html',
        controller: 'SubjectController'
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
        templateUrl: '/partials/login.html',
        controller: 'LogoutController'
      })

    $urlRouterProvider.otherwise('/');

		$locationProvider.html5Mode(true);

  }]);

  app.factory('UserFactory', function UserFactory($http, AuthTokenFactory){
    'use strict';
    return {
      login: login,
      logout: logout
    };

    function login (email, password){
      return $http.post('/login', {
        email: email,
        password: password
      }).then(function success(response){
        AuthTokenFactory.setToken(response.data.token);
        return response;
      });
    }

    function logout(){
      AuthTokenFactory.setToken();  // Sets token to nothing removing it from localStorage.
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
      console.log("In setToken");
			if (token){
				store.setItem(key, token)
      } else {
        store.removeItem(key);
      }
		}
	});

	app.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory){
		'use strict';
		return {
			request: addToken,
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

var app = angular.module('flashcards', ['ui.router'])

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider, $httpProvider){

				$httpProvider.interceptors.push('AuthInterceptor');

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
	          controller: 'CardController'
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

    }]);

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

			funtion setToken(token){
				if (token){
					store.setItem('key', token)
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

		})

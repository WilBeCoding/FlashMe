var app = angular.module('flashcards', ['ui.router'])

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

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

 
    }])




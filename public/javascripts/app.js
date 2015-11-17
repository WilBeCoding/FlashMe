var app = angular.module('flashcards', ['ui.router'])

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
	        .state('dashboard', {
	        	url: '/',
	          templateUrl: '/partials/dashboard.html', 
	          controller: 'DashController'
	        })

 
    })




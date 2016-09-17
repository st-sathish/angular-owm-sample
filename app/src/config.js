'use strict';

angular
	.module('owmCityGraph',['ui.router', 'ngResource'])
	.config(['$stateProvider','$urlRouterProvider','$logProvider', '$locationProvider', '$httpProvider', '$resourceProvider',
  			function($stateProvider, $urlRouterProvider,$logProvider, $locationProvider, $httpProvider, $resourceProvider) {

  		// For any unmatched url, redirect to /
  		$urlRouterProvider.otherwise("/home");

  		//global
		$httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

		$httpProvider.interceptors.push(function($q) {
		    var realEncodeURIComponent = window.encodeURIComponent;
		    return {
		      'request': function(config) {
		         window.encodeURIComponent = function(input) {
		           return realEncodeURIComponent(input).split("%26").join("&").split("%3D").join("=");
		         }; 
		         return config || $q.when(config);
		      },
		      'response': function(config) {
		         window.encodeURIComponent = realEncodeURIComponent;
		         return config || $q.when(config);
		      }
		    };
		  });

		//disable log in production by passing the value as false
		$logProvider.debugEnabled(true);
		//$locationProvider.html5Mode(true);
  
  		// Now set up the states
	  	$stateProvider

	    .state('/home', {
	    	url: "/home",
	    	templateUrl: "partials/home.html",
	    	controller: "HomeCtrl",
	    	controllerAs: "homeCtrl",
	    	cache: true
	    });

  	}]).constant("OWM_APP_ID", "3eb1849041f27c890e2299694e95b60a");

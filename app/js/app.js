'use strict';

var app = angular
	.module('app', ['ngRoute', 'ngResource'])
	.config(function($routeProvider) {
		$routeProvider
            .when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'Ads-Controller'
            })
            .when('/register', {
            	templateUrl: 'templates/register.html',
            	controller: 'RegisterController'
            })
            .otherwise({redirectTo: '/home'});
	})

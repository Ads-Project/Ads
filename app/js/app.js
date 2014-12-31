'use strict';

var app = angular
	.module('app', ['ngRoute', 'ngResource', 'ngAnimate'])
	.config(function($routeProvider) {
		$routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'Ads-Controller'
            })
            .when('/register', {
            	templateUrl: 'templates/register.html',
            	controller: 'RegisterController'
            })
            .when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })

            
            //.otherwise({redirectTo: '/home'});
	})

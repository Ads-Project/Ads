'use strict';

var app = angular
    .module('app', ['ngRoute', 'ngResource', 'ngAnimate', 'ngSanitize', 'angular-loading-bar', 'toaster', 'duScroll', 'ui.bootstrap', 'ui.utils'])
    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized',
        registrationSuccess: 'auth-registration-success',
        registrationFailed: 'auth-registration-failed'
    })
    .constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        guest: 'guest'
    })
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
            .when('/myAds', {
                templateUrl: 'templates/myAds.html',
                controller: 'UserAdsController',
                resolve: {
                    auth: ["$q", "Auth", function($q, Auth) {
                        var userInfo = Auth.getUserInfo();

                        if (userInfo && userInfo.role == 'user') {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/newAd', {
                templateUrl: 'templates/addAd.html',
                controller: 'addNewAdController',
                resolve: {
                    auth: ["$q", "Auth", function($q, Auth) {
                        var userInfo = Auth.getUserInfo();

                        if (userInfo && userInfo.role == 'user') {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/editProfile', {
                templateUrl: 'templates/editProfile.html',
                controller: 'EditProfileController',
                resolve: {
                    auth: ["$q", "Auth", function($q, Auth) {
                        var userInfo = Auth.getUserInfo();

                        if (userInfo && userInfo.role == 'user') {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/allAds', {
                templateUrl: 'templates/admin/adminAds.html',
                controller: 'AdminAdsController',
                resolve: {
                    auth: ["$q", "Auth", function($q, Auth) {
                        var userInfo = Auth.getUserInfo();

                        if (userInfo && userInfo.role == 'admin') {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/users', {
                templateUrl: 'templates/admin/users.html',
                controller: 'AdminUsersController',
                resolve: {
                    auth: ["$q", "Auth", function($q, Auth) {
                        var userInfo = Auth.getUserInfo();

                        if (userInfo && userInfo.role == 'admin') {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/categories', {
                templateUrl: 'templates/admin/categories.html',
                controller: 'AdminCategoriesController',
                resolve: {
                    auth: ["$q", "Auth", function($q, Auth) {
                        var userInfo = Auth.getUserInfo();

                        if (userInfo && userInfo.role == 'admin') {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/towns', {
                templateUrl: 'templates/admin/towns.html',
                controller: 'AdminTownsController',
                resolve: {
                    auth: ["$q", "Auth", function($q, Auth) {
                        var userInfo = Auth.getUserInfo();

                        if (userInfo && userInfo.role == 'admin') {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })



        .otherwise({redirectTo: '/'});
    })
    .run(["$rootScope", "$location", 'AUTH_EVENTS', function($rootScope, $location, AUTH_EVENTS) {

        // Authentication
        $rootScope.$on("$routeChangeSuccess", function(userInfo) {
            console.log(userInfo);
        });
        $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized)
                $location.path("/login");
            }
        });

        //Switch tabs on navbar
        var path = function() {
            return $location.path();
        };
        $rootScope.$watch(path, function(newVal, oldVal) {
            $rootScope.activetab = newVal;
        });
    }])
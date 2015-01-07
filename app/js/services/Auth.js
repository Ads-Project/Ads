'use strict';

app.factory('Auth', ['$http', '$resource', '$location', '$rootScope', '$q', '$window', 'AUTH_EVENTS',
	function($http, $resource, $location, $rootScope, $q, $window, AUTH_EVENTS) {

		var userInfo,
			loginResource,
			registerResource;

		loginResource = $resource(
			'http://softuni-ads.azurewebsites.net/api/user/login'
		);

		registerResource = $resource(
			'http://softuni-ads.azurewebsites.net/api/user/register'
		);

		init();

		function registerUser(user) {
			var deferred = $q.defer();

			registerResource
				.save(user)
				.$promise
				.then(function(resp) {
					userInfo = {
						accessToken: resp.token_type + ' ' + resp.access_token,
						userName: resp.username,
						role: resp.isAdmin ? 'admin' : 'user'
					};
					$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
					deferred.resolve(userInfo);

					$rootScope.$broadcast(AUTH_EVENTS.registrationSuccess);
					$location.path('/');
				})
				.catch(function(err) {
					$rootScope.$broadcast(AUTH_EVENTS.registrationFailed, err);
					deferred.reject(err);
				})

			return deferred.promise;
		}

		function login(credentials) {
			var deferred = $q.defer();

			loginResource
				.save(credentials)
				.$promise
				.then(function(resp) {
					userInfo = {
						accessToken: resp.token_type + ' ' + resp.access_token,
						userName: resp.username,
						role: resp.isAdmin ? 'admin' : 'user'
					};
					$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
					deferred.resolve(userInfo);

					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess, resp);
					$location.path('/');
				})
				.catch(function(err) {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed, err);
					deferred.reject(err);
				});

			return deferred.promise;
		};

		function getUserInfo() {
			return userInfo;
		}

		function init() {
			if ($window.sessionStorage["userInfo"]) {
				userInfo = JSON.parse($window.sessionStorage["userInfo"]);
				$http.defaults.headers.common['Authorization'] = userInfo.accessToken;
			}
		}


		return {
			login: login,
			register: registerUser,
			getUserInfo: getUserInfo
		};
	}
])
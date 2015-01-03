'use strict';

app.controller('MainController', ['$scope', 'USER_ROLES', 'Auth', 'AUTH_EVENTS', 'toaster',
	function($scope, USER_ROLES, Auth, AUTH_EVENTS, toaster) {

		$scope.currentUser = Auth.getUserInfo();
		$scope.userRoles = USER_ROLES;
		$scope.isAuthorized = Auth.isAuthorized;

		$scope.setCurrentUser = function (user){
			$scope.currentUser = user;
		}

		$scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
			alert(AUTH_EVENTS.notAuthenticated);
		});

		$scope.$on(AUTH_EVENTS.loginFailed, function(event, err) {
			toaster.pop('error', "Error!", err.data.error_description, 5000);
		});

		$scope.$on(AUTH_EVENTS.loginSuccess, function(event, data) {
			toaster.pop('success', "Login Success!", "Hello " + data.username + '.', 1500);
		});

		$scope.$on(AUTH_EVENTS.logoutSuccess, function(event, data) {
			toaster.pop('success', "Logout Success!", "", 5000);
		});		

		$scope.$on(AUTH_EVENTS.registrationSuccess, function(event, err) {
			toaster.pop('success', "Registration Success!", '', 1500);    
		});

		$scope.$on(AUTH_EVENTS.registrationFailed, function(event, err) {
			err.data.modelState[""].forEach(function(message, index){
				toaster.pop('error', "Error!", message, 5000);
			});
		});

		$scope.$on(AUTH_EVENTS.notAuthorized, function(event, err) {
			toaster.pop('error', "Access dained!", 'Please login.', 5000);    
		});

		

	}
])
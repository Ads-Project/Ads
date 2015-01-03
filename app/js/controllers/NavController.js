app.controller('NavController', ['$scope', '$window', 'AUTH_EVENTS', '$rootScope',
	function($scope, $window, AUTH_EVENTS, $rootScope) {

		$scope.logout = function() {
			delete $window.sessionStorage["userInfo"];
			$window.location.reload();
			$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		}

	}
])
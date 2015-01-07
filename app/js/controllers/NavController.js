app.controller('NavController', ['$scope', '$window', 'AUTH_EVENTS', '$rootScope', '$location', '$http',
	function($scope, $window, AUTH_EVENTS, $rootScope, $location, $http) {

		$scope.logout = function() {
			delete $window.sessionStorage["userInfo"];
			$location.path('/');
			$window.location.reload();
			$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			delete $http.defaults.headers.common['Authorization'];
		}

	}
])
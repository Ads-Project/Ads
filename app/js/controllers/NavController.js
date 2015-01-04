app.controller('NavController', ['$scope', '$window', 'AUTH_EVENTS', '$rootScope', '$location', '$http',
	function($scope, $window, AUTH_EVENTS, $rootScope, $location, $http) {

		$scope.logout = function() {
			delete $window.sessionStorage["userInfo"];
			$window.location.reload();
			$location.path('/');
			$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			delete $http.defaults.headers.common['Authorization'];
		}

	}
])
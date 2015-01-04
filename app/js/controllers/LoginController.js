app.controller('LoginController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'Auth', '$location', '$http',
	function($scope, $rootScope, AUTH_EVENTS, Auth, $location, $http) {

		$scope.login = function(credentials) {
			Auth.login(credentials)
			.then(function (resp){
				$scope.setCurrentUser( resp );
				$http.defaults.headers.common['Authorization'] = resp.accessToken;
			});
		};

		$scope.cancel = function (){
			$location.path('/');
		}

	}
])
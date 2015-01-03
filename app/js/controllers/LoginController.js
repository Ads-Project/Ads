app.controller('LoginController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'Auth', '$location',
	function($scope, $rootScope, AUTH_EVENTS, Auth, $location) {

		$scope.login = function(credentials) {
			Auth.login(credentials)
			.then(function (resp){
				$scope.setCurrentUser( Auth.getUserInfo() );
			});
		};

		$scope.cancel = function (){
			$location.path('/');
		}

	}
])
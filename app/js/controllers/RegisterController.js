app.controller('RegisterController', ['Auth', 'categoriesAndTownsData', '$scope', '$location', '$rootScope', 'AUTH_EVENTS',
	function(Auth, categoriesAndTownsData, $scope, $location, $rootScope, AUTH_EVENTS) {

		$scope.towns = categoriesAndTownsData.getAllTowns();

		$scope.register = function(user) {
			Auth.register(user)
			.then(function (resp){
				$scope.setCurrentUser( Auth.getUserInfo() );
			});
		}

		$scope.cancel = function() {
			$location.path('/');
		}



	}
])
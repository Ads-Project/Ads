app.controller('RegisterController', ['Auth', 'categoriesAndTownsData', '$scope', '$location', '$http',
	function(Auth, categoriesAndTownsData, $scope, $location, $http) {

		$scope.towns = categoriesAndTownsData.getAllTowns();

		$scope.register = function(user) {
			Auth.register(user)
			.then(function (resp){
				$scope.setCurrentUser( resp );
				$http.defaults.headers.common['Authorization'] = resp.accessToken;
			});
		}

		$scope.cancel = function() {
			$location.path('/');
		}



	}
])
app.controller('LoginController', ['$scope', '$location', 'Auth', function($scope, $location, Auth) {
	
	$scope.cancel = function() {
		$location.path('/');
	}

	$scope.login = login;

	function login(user) {
		Auth.loginUser(user)
			.$promise
			.then(function(data) {
				$location.path('/');
			}, function(error) {
				console.log(error);
			})
	}

}])
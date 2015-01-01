app.controller('RegisterController', ['Auth', 'categoriesAndTownsData', '$scope', '$location', 
	function(Auth, categoriesAndTownsData, $scope,  $location){
	
	$scope.towns = categoriesAndTownsData.getAllTowns();

	$scope.register = function (user){
		Auth.registerUser(user)
			.$promise
			.then(function (data){
				$location.path('/');	
			}, function (error){
				console.log(error);
			})
	}

	$scope.cancel = function (){
		$location.path('/');
	}




}])
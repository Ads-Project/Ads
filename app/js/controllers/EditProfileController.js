app.controller('EditProfileController', ['$scope', 'categoriesAndTownsData', 'UserDataService', '$location', 'toaster',
	function($scope, categoriesAndTownsData, UserDataService, $location, toaster) {

		$scope.towns = categoriesAndTownsData.getAllTowns();
		$scope.user = UserDataService.getUser();

		$scope.editProfile = editUserProfile;
		$scope.cancel = cancel;
		$scope.editPassword = editPassword;



		function cancel() {
			$location.path('/');
		}

		function editUserProfile(userData) {
			console.log(userData);
			UserDataService.editProfile(userData)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message);
				}, function(err) {
					toaster.pop('error', 'Error!', err);
				})
		}

		function editPassword(passwordData) {
			console.log('change psss');
			UserDataService.changePassword(passwordData)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message);
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.modelState);
				})
		}
	}
])
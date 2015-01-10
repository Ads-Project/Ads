app.controller('EditUserAsAdminController', ['$scope', '$modalInstance', 'user', 'AdminUsersData', 'categoriesAndTownsData', 'toaster',

	function($scope, $modalInstance, user, AdminUsersData, categoriesAndTownsData, toaster) {

		$scope.user = user;
		$scope.towns = categoriesAndTownsData.getAllTowns();
		$scope.editUserProfile = editUserProfile;
		$scope.changeUserPassword = changeUserPassword;

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

		function editUserProfile(username, user) {
			AdminUsersData.editUser(username, user)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				});
		}

		function changeUserPassword(username, user) {
			var newUserData = {
				username: username,
				newPassword: user.newPassword,
				confirmPassword: user.confirmPassword
			};

			AdminUsersData.changeUserPassword(newUserData)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				});
		}

	}
])
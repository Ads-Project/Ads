app.controller('ConfirmDeleteUserController', ['$scope', '$modalInstance', 'user',

	function($scope, $modalInstance, user) {

		$scope.user = user;

		$scope.delete = function(user) {
			$modalInstance.close(user);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

	}
])
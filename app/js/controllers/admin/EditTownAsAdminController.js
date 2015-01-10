app.controller('EditTownAsAdminController', ['$scope', '$modalInstance', 'town',

	function($scope, $modalInstance, town) {
		$scope.town = angular.copy(town);

		$scope.edit = function(town) {
			$modalInstance.close(town);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}
])
app.controller('AddTownAsAdminController', ['$scope','$modalInstance',

	function($scope, $modalInstance) {

		$scope.add = function(town) {
			$modalInstance.close(town);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}

])
app.controller('AddCategoryAsAdminController', ['$scope','$modalInstance',

	function($scope, $modalInstance) {

		$scope.add = function(category) {
			$modalInstance.close(category);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}

])
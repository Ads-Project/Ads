app.controller('EditCategoryAsAdminController', ['$scope', '$modalInstance', 'category',

	function($scope, $modalInstance, category) {
		$scope.category = angular.copy(category);

		$scope.edit = function(category) {
			$modalInstance.close(category);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}
])
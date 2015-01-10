app.controller('ConfirmDeleteAdController', ['$scope', '$modalInstance', 'adId', 'AdsData',

	function($scope, $modalInstance, adId, AdsData) {

		$scope.ad = AdsData.getById(adId);

		$scope.delete = function() {
			$modalInstance.close($scope.ad);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};

	}
])
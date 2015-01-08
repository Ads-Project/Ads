app.controller('EditAdController', ['$scope', '$modalInstance', 'adId', 'AdsData', 'categoriesAndTownsData',
	function($scope, $modalInstance, adId, AdsData, categoriesAndTownsData) {

		$scope.ad = AdsData.getById(adId);
		$scope.towns = categoriesAndTownsData.getAllTowns();
		$scope.categories = categoriesAndTownsData.getAllCategories();

		$scope.fileSelected = function(fileInputField) {
			if ($scope.ad.imageDataURL) {
				delete $scope.ad.imageDataURL;
			} else {
				delete $scope.ad.imageDataUrl;
			}
			var file = fileInputField.files[0];
			if (file.type.match(/image\/.*/)) {
				var reader = new FileReader();
				reader.onload = function() {
					$scope.ad.imageDataURL = reader.result;
					$scope.ad.changeImage = true;
				};
				reader.readAsDataURL(file);
			} else {
				$(".image-box").html("<p>File type not supported!</p>");
			}
		};

		$scope.deleteImage = function() {
			if ($scope.ad.imageDataURL) {
				delete $scope.ad.imageDataURL;
			} else {
				delete $scope.ad.imageDataUrl;
			}
		}

		$scope.edit = function() {
			$modalInstance.close($scope.ad);
		};

		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}
]);
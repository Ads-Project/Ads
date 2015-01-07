app.controller('addNewAdController', ['$scope', 'Auth', 'categoriesAndTownsData', 'AdsData', 'toaster', '$location',
	function($scope, Auth, categoriesAndTownsData, AdsData, toaster, $location) {

		$scope.towns = categoriesAndTownsData.getAllTowns();
		$scope.categories = categoriesAndTownsData.getAllCategories();
		$scope.create = createNewAd;
		$scope.cancelAdd = cancelAdd;
		$scope.ad = {};

		$scope.fileSelected = function(fileInputField) {
			delete $scope.ad.imageDataUrl;
			var file = fileInputField.files[0];
			if (file.type.match(/image\/.*/)) {
				var reader = new FileReader();
				reader.onload = function() {
					$scope.ad.imageDataUrl = reader.result;
					$(".image-box").html("<img width='100%' src='" + reader.result + "'>");
				};
				reader.readAsDataURL(file);
			} else {
				$(".image-box").html("<p>File type not supported!</p>");
			}
		};

		function createNewAd(ad) {
			console.log(ad);
			AdsData.create(ad)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					$location.path('/myAds');
				}, function(err) {
					var message = '';
					err.data.modelState['model.Text'].forEach(function(element, index) {
						message += element + ' ';
					});

					toaster.pop('error', 'Error!', message, 2000);
				});
		}

		function cancelAdd() {
			$location.path('/');
		}
	}
])
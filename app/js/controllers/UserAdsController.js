'use strict';

app.controller('UserAdsController', ['$scope', 'AdsData', 'toaster', '$modal', '$log',

	function($scope, AdsData, toaster, $modal, $log) {

		var adFilters = {
			role: 'user'
		};


		$scope.pages = [];
		$scope.currentPage = 1;
		$scope.delete = deleteAd;
		$scope.publishAgain = publishAgainAd;
		$scope.deactivate = deactivateAd;
		$scope.edit = editAd;

		AdsData.getAllByFilter(adFilters)
			.$promise
			.then(function(data) {
				$scope.data = data;

				if (!$scope.data.ads.length) {
					$scope.noResults = true;
				} else {
					$scope.noResults = false;
				}

				// Fill pages in array
				for (var i = 1; i <= $scope.data.numPages; i++) {
					$scope.pages.push(i);
				};

			}, function(err) {
				toaster.pop('error', 'Error!', err.data.message);
			});


		/*$scope.$on("categorySelectorClicked", function(event, selectedCategoryId) {

			// Check filter for all categories
			if (selectedCategoryId) {
				adFilters.categoryId = selectedCategoryId;
			} else {
				delete adFilters.categoryId;
			}
			reloadAds();
		});

		$scope.$on("townSelectorClicked", function(event, selectedTownId) {

			// Check filter for all towns
			if (selectedTownId) {
				adFilters.townId = selectedTownId;
			} else {
				delete adFilters.townId;
			}
			reloadAds();
		});*/

		$scope.$on('newPageClicked', function(event, selectedPageNum) {

			if (selectedPageNum) {
				adFilters.pageNum = selectedPageNum;
				$scope.currentPage = selectedPageNum;
			} else {
				delete adFilters.pageNum;
			}
			reloadAds();
		});


		function reloadAds() {
			AdsData.getAllByFilter(adFilters)
				.$promise
				.then(function(respData) {
					$scope.data = respData;

					if (!$scope.data.ads.length) {
						$scope.noResults = true;
					} else {
						$scope.noResults = false;
					}

					$scope.data
						.$promise
						.then(function() {
							$scope.pages = [];
							for (var i = 1; i <= $scope.data.numPages; i++) {
								$scope.pages.push(i);
							};
						});


				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 1500);
				});
		}

		function deleteAd(adId) {
			AdsData.delete(adId)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					reloadAds();
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				})
		}

		function publishAgainAd(id) {
			AdsData.publishAgain(id)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					reloadAds();
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				})
		}

		function deactivateAd(id) {
			AdsData.deactivate(id)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					reloadAds();
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				})
		}

		function editAd(argument) {
			/* body... */
		}

		$scope.items = ['item1', 'item2', 'item3'];

		$scope.open = function(size) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/modal.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				resolve: {
					items: function() {
						return $scope.items;
					}
				}
			});

			modalInstance.result.then(function(selectedItem) {
				$scope.selected = selectedItem;
			}, function() {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};

	}
])

app.controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.ok = function() {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
});
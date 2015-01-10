'use strict';

app.controller('Ads-Controller', ['$scope', 'AdsData', 'toaster', '$document',
	function($scope, AdsData, toaster, $document) {

		var adFilters = {};

		$scope.pages = [];
		$scope.currentPage = 1;
		$scope.prevPage = prevPage;
		$scope.nextPage = nextPage;

		// Initial Load Ads without filters
		reloadAds();

		$scope.$on("categorySelectorClicked", function(event, selectedCategoryId) {

			// Check filter for all categories
			if (selectedCategoryId) {
				adFilters.categoryId = selectedCategoryId;
			} else {
				delete adFilters.categoryId;
			}

			// Reset Page
			delete adFilters.pageNum;
			$scope.currentPage = 1;
			reloadAds();
		});

		$scope.$on("townSelectorClicked", function(event, selectedTownId) {

			// Check filter for all towns
			if (selectedTownId) {
				adFilters.townId = selectedTownId;
			} else {
				delete adFilters.townId;
			}

			// Reset Page
			delete adFilters.pageNum;
			$scope.currentPage = 1;
			reloadAds();
		});

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
			AdsData.getAds(adFilters.pageNum, adFilters.categoryId, adFilters.townId)
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
					toaster.pop('error', err.data.error_description, 1500);
				});
		}


		function nextPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				if (!adFilters.pageNum) {
					adFilters.pageNum = 1;
				}
				adFilters.pageNum++;
				$scope.currentPage++;
				reloadAds();
			});
		}

		function prevPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				adFilters.pageNum--;
				$scope.currentPage--;
				reloadAds();
			});
		}



	}
]);
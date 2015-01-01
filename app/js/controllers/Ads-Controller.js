'use strict';

app.controller('Ads-Controller', ['$scope', 'AdsData', '$rootScope', function($scope, AdsData, $rootScope) {

	var adFilters = {};

	$scope.data = AdsData.getAll();
	$scope.pages = [];
	$scope.currentPage = 1;

	// Fill pages array
	$scope.data
		.$promise
		.then(function() {
			for (var i = 1; i <= $scope.data.numPages; i++) {
				$scope.pages.push(i);
			};
		});

	$scope.$on("categorySelectorClicked", function(event, selectedCategoryId) {

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
	});

	$scope.$on('newPageClicked', function(event, selectedPageNum) {

		adFilters.pageNum = selectedPageNum;
		$scope.currentPage = selectedPageNum;
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
				console.log(err);
				alert(err);
			});
	}


}]);
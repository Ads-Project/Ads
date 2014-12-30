'use strict';

app.controller('Ads-Controller', ['$scope', 'AdsData', '$rootScope', function($scope, AdsData, $rootScope) {

	var data = AdsData.getAll();
	var adFilters = {};

	$scope.$on("categorySelectorClicked", function(event, selectedCategoryId) {
		if (selectedCategoryId) {
			adFilters.categoryId = selectedCategoryId;
		} else{
			// Filter for all categories (remove filter)
			delete adFilters.categoryId;
		}
		reloadAds();
	});

	$scope.$on("townSelectorClicked", function(event, selectedTownId) {

		if (selectedTownId) {
			adFilters.townId = selectedTownId;
		} else{
			// Filter for all towns (remove filter)
			delete adFilters.townId;
		}
		reloadAds();
	});

	function reloadAds() {
		AdsData.getAllByFilter(adFilters)
			.$promise
			.then(function(respData) {
				data = respData;

				if (!data.ads.length) {
					$scope.noResults = true;
				} else {
					$scope.noResults = false;
				}
				$scope.data = data;

			}, function(err) {
				console.log(err);
				alert(err);
			});
	}

	$scope.data = data;

}]);
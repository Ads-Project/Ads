app.controller('Ads-Controller', ['$scope', 'AdsData', 'categoriesAndTownsData', function($scope, AdsData, categoriesAndTownsData) {

	$scope.data = AdsData.getAll();
	$scope.categories = categoriesAndTownsData.getAllCategories();
	$scope.towns = categoriesAndTownsData.getAllTowns();
	
}]);
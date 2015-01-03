app.controller('SideBarController', ['$scope', 'categoriesAndTownsData', function($scope, categoriesAndTownsData) {

	$scope.categories = categoriesAndTownsData.getAllCategories();
	$scope.towns = categoriesAndTownsData.getAllTowns();

}])
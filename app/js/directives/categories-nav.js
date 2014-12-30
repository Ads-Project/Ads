app.directive('categoriesNav', [function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'templates/directives/categories-nav.html',
		controller: 'SideBarController',
		link: function(scope, iElement, iAttrs) {
			
		}
	};
}])
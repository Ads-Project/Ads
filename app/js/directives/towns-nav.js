app.directive('townsNav', [function() {
	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'templates/directives/towns-nav.html',
		controller: 'SideBarController',
		link: function(scope, iElement, iAttrs) {
			
		}
	};
}])
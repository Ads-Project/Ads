app.directive('page', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			iElement.on('click', function() {
				$rootScope.$broadcast('newPageClicked', iAttrs.pageNum);
			});
		}
	};
}])
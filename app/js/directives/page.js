app.directive('page', ['$rootScope', '$document', function($rootScope, $document) {
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			iElement.on('click', function() {
				$document.scrollTopAnimated(0, 1000).then(function() {
					$rootScope.$broadcast('newPageClicked', iAttrs.pageNum);
				});
			});
		}
	};
}])
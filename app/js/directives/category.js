app.directive('category', ['$rootScope', '$anchorScroll', '$document', function($rootScope, $anchorScroll, $document) {
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			iElement.on('click', function() {
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');

				var categoryId = iAttrs.categoryId;

				$document.scrollTopAnimated(0, 1000).then(function() {
					$rootScope.$broadcast('categorySelectorClicked', categoryId);
				});
			})
		}
	};
}])
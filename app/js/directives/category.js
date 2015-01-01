app.directive('category', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			iElement.on('click', function (){
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');

				var categoryId = iAttrs.categoryId;
				$rootScope.$broadcast('categorySelectorClicked', categoryId);
			})
		}
	};
}])
app.directive('category', [function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			iElement.on('click', function (){
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');
				scope.categoryQuery = iAttrs.categoryId;
				console.log(scope);
			})
		}
	};
}])
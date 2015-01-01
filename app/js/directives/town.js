app.directive('town', ['$rootScope', function ($rootScope) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			iElement.on('click', function (){
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');

				var townId = iAttrs.townId;
				$rootScope.$broadcast('townSelectorClicked', townId);
			});
		}
	};
}])
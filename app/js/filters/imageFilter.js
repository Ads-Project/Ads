app.filter('adImage', function (){
	var DEFAULT_IMAGE = 'http://placehold.it/150x150&text=No%20Image';

	return function (inputImage){
		var image = DEFAULT_IMAGE;

		if (inputImage) {
			image = inputImage;
		};

		return image;
	}
})
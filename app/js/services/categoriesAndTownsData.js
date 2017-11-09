app.factory('categoriesAndTownsData', ['$http', '$resource', function($http, $resource) {

	//$http.defaults.headers.common['Authorization'] = 'Bearer drgYkEoKSxEYzY1CCuL03c92cRKnW0ejhKu1gxvFGdOrtC1_gxImYf_9btlcnJFJ8He66BJsdFFrREWWc5JdkLaZKAoeAL4Lz5CzAIX-sTh62a8pcdqDhGG9L-iVucpMsSsaorl8aaOeEdXk0KQJS8w-CSJdm6qb3oTI6JTWuU216kSMexGS6vhadVyHilXcN_BflxpNKuUPfmRY_xelXhRA38kdOGlcvVkblbQ1fa08j4joIy9Eot3U6IMXAo61ipVV5LjC3jigfi8EkoZJN5ZIAS3ZNgazWP0dKynyLFu3-szapIfmnvs_VMLM-4OUjyADnZVq_bLOIlK1DL83jKkeMLqJeIKaDD7qrOkzQ--dk9K3ObA6G2XFfxb6PDBlD_rj19E2r5-U_0i21xSodARZ_deXOg00KLWcdl-9j-Kio147QhUaZPKp9g7qi8ZwOslszsJA7uoRgTJ_-YifeJx32uDoBML6CfvG8BX9CwU';


	var townsResource = $resource('http://online-listings.apphb.com/api/towns');
	var categoriesResource = $resource('http://online-listings.apphb.com/api/categories');

	function getAllTowns(success, error) {
		return townsResource.query();
	}

	function getAllCategories(success, error) {
		return categoriesResource.query();
	}

	return {
		getAllTowns: getAllTowns,
		getAllCategories: getAllCategories
	}
}])
'use strict';

app.factory('Auth', ['$http', '$resource', function($http, $resource) {
	
	var loginResource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/login'
	);

	var registerResource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/register'
	);

	function IsLoggedIn (){
		if (sessionStorage['username']) {
			return true;
		} else{
			return false;
		}
	}

	function registerUser (user){
		return registerResource.save(user);
	}

	function loginUser (user){
		return loginResource.save(user);
	}

	return {
		IsLoggedIn: IsLoggedIn,
		registerUser: registerUser,
		loginUser: loginUser
	};
}])
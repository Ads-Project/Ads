app.factory('UserDataService', ['$resource', function($resource) {

	var userInfoResource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/Profile', null, {
			update: {
				method: 'PUT'
			}
		});

	var userPassResource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/ChangePassword', null, {
			update: {
				method: 'PUT'
			}
		});

	function getUserProfile() {
		return userInfoResource.get();
	}

	function editUserProfile(userData) {
		return userInfoResource.update(userData);
	}

	function changePassword(passwordData) {
		return userPassResource.update(passwordData)
	}


	return {
		getUser: getUserProfile,
		editProfile: editUserProfile,
		changePassword: changePassword

	};
}])
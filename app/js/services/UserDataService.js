app.factory('UserDataService', ['$resource', function($resource) {

	var userInfoResource = $resource(
		'http://online-listings.apphb.com/api/user/Profile', null, {
			update: {
				method: 'PUT'
			}
		});

	var userPassResource = $resource(
		'http://online-listings.apphb.com/api/user/ChangePassword', null, {
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
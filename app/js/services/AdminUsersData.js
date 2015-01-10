app.factory('AdminUsersData', ['$resource', function($resource) {

	var usersResource = $resource(
		'http://softuni-ads.azurewebsites.net/api/admin/users?StartPage=:page', {
			page: '1'
		}, {
			update: {
				method: 'PUT'
			}
		});

	function getAllUsers(page) {
		return usersResource.get({
			page: page
		});
	}

	function editUser(username, user) {
		return $resource('http://softuni-ads.azurewebsites.net/api/admin/user/:username', {
			username: username
		}, {
			update: {
				method: 'PUT'
			}
		}).update({
			username: username
		}, user);
	}

	function changeUserPassword(userData) {
		return $resource('http://softuni-ads.azurewebsites.net/api/admin/setPassword', null, {
			update: {
				method: 'PUT'
			}
		}).update(userData);
	}

	function deleteUser(username) {
		return $resource('http://softuni-ads.azurewebsites.net/api/admin/user/:username', {
			username: username
		}).delete({
			username: username
		});
	}

	return {
		getAllUsers: getAllUsers,
		editUser: editUser,
		changeUserPassword: changeUserPassword,
		deleteUser: deleteUser
	};
}])
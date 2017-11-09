app.factory('AdminUsersData', ['$resource', function($resource) {

	var usersResource = $resource(
		'http://online-listings.apphb.com/api/admin/users?StartPage=:page', {
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
		return $resource('http://online-listings.apphb.com/api/admin/user/:username', {
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
		return $resource('http://online-listings.apphb.com/api/admin/setPassword', null, {
			update: {
				method: 'PUT'
			}
		}).update(userData);
	}

	function deleteUser(username) {
		return $resource('http://online-listings.apphb.com/api/admin/user/:username', {
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
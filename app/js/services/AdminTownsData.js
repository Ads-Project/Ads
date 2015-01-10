app.factory('AdminTownsData', ['$resource',
	function($resource) {

		function getTowns(page) {
			return $resource(
				'http://softuni-ads.azurewebsites.net/api/admin/towns?startPage=:page', {
					page: '1'
				}).get({
				page: page
			});
		}

		function editTown(townId, town) {
			return $resource(
				'http://softuni-ads.azurewebsites.net/api/admin/towns/:id', {
					id: '@id'
				}, {
					update: {
						method: 'PUT'
					}
				}).update({
				id: townId
			}, town);
		}

		function deleteTown(townId) {
			return $resource(
				'http://softuni-ads.azurewebsites.net/api/admin/towns/:id', {
					id: '@id'
				}).delete({
				id: townId
			});
		}

		function addTown(town) {
			return $resource(
				'http://softuni-ads.azurewebsites.net/api/admin/towns'
			).save(town);
		}

		return {
			getTowns: getTowns,
			editTown: editTown,
			deleteTown: deleteTown,
			addTown: addTown
		};
	}
])
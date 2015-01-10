app.factory('AdminCategoriesData', ['$resource',

	function($resource) {

		function getCategories(page) {
			return $resource(
				'http://softuni-ads.azurewebsites.net/api/admin/categories?startPage=:page', {
					page: '1'
				}, {
					update: {
						method: 'PUT'
					}
				}).get({
				page: page
			});
		}

		function editCategory(categoryId, category) {
			return $resource(
				'http://softuni-ads.azurewebsites.net/api/admin/categories/:id', {
					id: '@id'
				}, {
					update: {
						method: 'PUT'
					}
				}).update({
				id: categoryId
			}, category);
		}

		function deleteCategory(categoryId) {
			return $resource(
				'http://softuni-ads.azurewebsites.net/api/admin/categories/:id', {
					id: '@id'
				}).delete({
				id: categoryId
			});
		}

		function addCategory(category) {
			return $resource(
				'http://softuni-ads.azurewebsites.net/api/admin/categories'
			).save(category);
		}

		return {
			getCategories: getCategories,
			editCategory: editCategory,
			deleteCategory: deleteCategory,
			addCategory: addCategory
		};
	}
])
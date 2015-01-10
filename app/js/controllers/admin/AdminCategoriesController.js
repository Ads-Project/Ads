app.controller('AdminCategoriesController', ['$scope', 'AdminCategoriesData', '$document', '$modal', 'toaster',

	function($scope, AdminCategoriesData, $document, $modal, toaster) {


		$scope.data = AdminCategoriesData.getCategories(1);
		$scope.pages = [];
		$scope.currentPage = 1;
		$scope.nextPage = nextPage;
		$scope.prevPage = prevPage;
		$scope.openEditModal = openEditModal;
		$scope.openDeleteModal = openDeleteModal;
		$scope.openNewCategoryModal = openNewCategoryModal;

		// Fill pages array
		$scope.data
			.$promise
			.then(function() {
				for (var i = 1; i <= $scope.data.numPages; i++) {
					$scope.pages.push(i);
				};
			});

		$scope.$on('newPageClicked', function(event, selectedPageNum) {

			if (selectedPageNum) {
				$scope.currentPage = selectedPageNum;
			} else {
				delete adFilters.pageNum;
			}
			reloadCategories();
		});

		function reloadCategories() {
			AdminCategoriesData.getCategories($scope.currentPage)
				.$promise
				.then(function(respData) {
					$scope.data = respData;

					if (!$scope.data.categories.length) {
						$scope.noResults = true;
					} else {
						$scope.noResults = false;
					}

					$scope.data
						.$promise
						.then(function() {
							$scope.pages = [];
							for (var i = 1; i <= $scope.data.numPages; i++) {
								$scope.pages.push(i);
							};
						});


				}, function(err) {
					toaster.pop('error', err.data.error_description, 1500);
				});
		}

		function openEditModal(category) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/editCategoryAsAdminModal.html',
				size: 'md',
				controller: 'EditCategoryAsAdminController',
				resolve: {
					category: function() {
						return category;
					}
				}
			});


			modalInstance.result.then(function(category) {
				AdminCategoriesData.editCategory(category.id, category)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadCategories();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});
		};

		function openNewCategoryModal (){
			
			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/addCategoryAsAdminModal.html',
				size: 'md',
				controller: 'AddCategoryAsAdminController'
			});


			modalInstance.result.then(function(category) {
				AdminCategoriesData.addCategory(category)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadCategories();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});

		}

		function openDeleteModal(category) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/confirmDeleteCategoryModal.html',
				size: 'md',
				controller: 'EditCategoryAsAdminController',
				resolve: {
					category: function() {
						return category;
					}
				}
			});


			modalInstance.result.then(function(category) {
				AdminCategoriesData.deleteCategory(category.id)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadCategories();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});
		};

		function nextPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				$scope.currentPage++;
				reloadCategories();
			});
		}

		function prevPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				$scope.currentPage--;
				reloadCategories();
			});
		}

	}
])
app.controller('AdminUsersController', ['$scope', 'AdminUsersData', '$document', '$modal', 'toaster',

	function($scope, AdminUsersData, $document, $modal, toaster) {


		$scope.data = AdminUsersData.getAllUsers(1);
		$scope.pages = [];
		$scope.currentPage = 1;
		$scope.nextPage = nextPage;
		$scope.prevPage = prevPage;
		$scope.openEditModal = openEditModal;
		$scope.openDeleteModal = openDeleteModal;

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
			reloadUsers();
		});

		function reloadUsers() {
			AdminUsersData.getAllUsers($scope.currentPage)
				.$promise
				.then(function(respData) {
					$scope.data = respData;

					if (!$scope.data.users.length) {
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

		function openEditModal(user) {

			$modal.open({
				templateUrl: 'templates/admin/editUserAsAdminModal.html',
				size: 'lg',
				controller: 'EditUserAsAdminController',
				resolve: {
					user: function() {
						return user;
					}
				}
			});

		};

		function openDeleteModal(user) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/confirmDeleteUserModal.html',
				size: 'lg',
				controller: 'ConfirmDeleteUserController',
				resolve: {
					user: function() {
						return user;
					}
				}
			});


			modalInstance.result.then(function(user) {
				AdminUsersData.deleteUser(user.username)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadUsers();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});
		};

		function nextPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				$scope.currentPage++;
				reloadUsers();
			});
		}

		function prevPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				$scope.currentPage--;
				reloadUsers();
			});
		}

	}
])
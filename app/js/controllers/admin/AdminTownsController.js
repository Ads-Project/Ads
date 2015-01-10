app.controller('AdminTownsController', ['$scope', 'AdminTownsData', '$document', '$modal', 'toaster',

	function($scope, AdminTownsData, $document, $modal, toaster) {


		$scope.data = AdminTownsData.getTowns(1);
		$scope.pages = [];
		$scope.currentPage = 1;
		$scope.nextPage = nextPage;
		$scope.prevPage = prevPage;
		$scope.openEditModal = openEditModal;
		$scope.openDeleteModal = openDeleteModal;
		$scope.openNewTownModal = openNewTownModal;

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
			reloadTowns();
		});

		function reloadTowns() {
			AdminTownsData.getTowns($scope.currentPage)
				.$promise
				.then(function(respData) {
					$scope.data = respData;

					if (!$scope.data.towns.length) {
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

		function openEditModal(town) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/editTownAsAdminModal.html',
				size: 'md',
				controller: 'EditTownAsAdminController',
				resolve: {
					town: function() {
						return town;
					}
				}
			});


			modalInstance.result.then(function(town) {
				AdminTownsData.editTown(town.id, town)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadTowns();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});
		};

		function openNewTownModal (){
			
			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/addTownAsAdminModal.html',
				size: 'md',
				controller: 'AddTownAsAdminController'
			});


			modalInstance.result.then(function(town) {
				AdminTownsData.addTown(town)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadTowns();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});

		}

		function openDeleteModal(town) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/confirmDeleteTownModal.html',
				size: 'md',
				controller: 'EditTownAsAdminController',
				resolve: {
					town: function() {
						return town;
					}
				}
			});


			modalInstance.result.then(function(town) {
				AdminTownsData.deleteTown(town.id)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadTowns();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});
		};

		function nextPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				$scope.currentPage++;
				reloadTowns();
			});
		}

		function prevPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				$scope.currentPage--;
				reloadTowns();
			});
		}

	}
])
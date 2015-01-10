app.controller('AdminAdsController', ['$scope', 'AdsData', '$modal', 'toaster', '$log',
	function($scope, AdsData, $modal, toaster, $log) {

		var adFilters = {
			role: 'admin'
		};

		$scope.data = AdsData.getAdsAsAdmin(1);
		$scope.reject = rejectAd;
		$scope.approve = approveAd;
		$scope.pages = [];
		$scope.currentPage = 1;
		$scope.prevPage = prevPage;
		$scope.nextPage = nextPage;

		$scope.$on("statusSelectorClicked", function(event, status) {

			// Check filter for all categories
			if (status) {
				adFilters.status = status;
			} else {
				delete adFilters.status;
			}

			// Reset Page
			delete adFilters.pageNum;
			$scope.currentPage = 1;
			reloadAds();
		});

		$scope.$on("categorySelectorClicked", function(event, selectedCategoryId) {

			// Check filter for all categories
			if (selectedCategoryId) {
				adFilters.categoryId = selectedCategoryId;
			} else {
				delete adFilters.categoryId;
			}

			// Reset Page
			delete adFilters.pageNum;
			$scope.currentPage = 1;
			reloadAds();
		});

		$scope.$on("townSelectorClicked", function(event, selectedTownId) {

			// Check filter for all towns
			if (selectedTownId) {
				adFilters.townId = selectedTownId;
			} else {
				delete adFilters.townId;
			}

			// Reset Page
			delete adFilters.pageNum;
			$scope.currentPage = 1;
			reloadAds();
		});

		$scope.$on('newPageClicked', function(event, selectedPageNum) {

			if (selectedPageNum) {
				adFilters.pageNum = selectedPageNum;
				$scope.currentPage = selectedPageNum;
			} else {
				delete adFilters.pageNum;
			}
			reloadAds();
		});


		$scope.openEditModal = function(adId) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/editAdAsAdminModal.html',
				size: 'lg',
				controller: 'EditAdAsAdminController',
				resolve: {
					adId: function() {
						return adId;
					}
				}
			});


			modalInstance.result.then(function(ad) {
				AdsData.editAsAdmin(ad.id, ad)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadAds();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});
		};

		$scope.openDeleteModal = function(adId) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/admin/confirmDeleteAdAsAdminModal.html',
				size: 'lg',
				controller: 'ConfirmDeleteAdAsAdminController',
				resolve: {
					adId: function() {
						return adId;
					}
				}
			});


			modalInstance.result.then(function(ad) {
				AdsData.deleteAdAsAdmin(ad.id)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadAds();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
				console.log(ad);
			});
		};

		function reloadAds() {
			AdsData.getAdsAsAdmin(adFilters.pageNum, adFilters.status, adFilters.categoryId, adFilters.townId)
				.$promise
				.then(function(respData) {
					$scope.data = respData;

					if (!$scope.data.ads.length) {
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
					toaster.pop('error', 'Error!', err.data.message, 1500);
				});
		}

		function rejectAd(id) {
			AdsData.reject(id)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					reloadAds();
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				});
		}

		function approveAd(id) {
			AdsData.approve(id)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					reloadAds();
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				});
		}

		function nextPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				if (!adFilters.pageNum) {
					adFilters.pageNum = 1;
				}
				adFilters.pageNum++;
				$scope.currentPage++;
				reloadAds();
			});
		}

		function prevPage() {
			$document.scrollTopAnimated(0, 1000).then(function() {
				adFilters.pageNum--;
				$scope.currentPage--;
				reloadAds();
			});
		}

	}
])
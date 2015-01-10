'use strict';

app.controller('UserAdsController', ['$scope', 'AdsData', 'toaster', '$modal', '$location', '$document',

	function($scope, AdsData, toaster, $modal, $location, $document) {

		var adFilters = {};

		$scope.pages = [];
		$scope.currentPage = 1;
		$scope.delete = deleteAd;
		$scope.publishAgain = publishAgainAd;
		$scope.deactivate = deactivateAd;
		$scope.prevPage = prevPage;
		$scope.nextPage = nextPage;

		// Initial Load Ads without filters
		reloadAds();


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

		$scope.$on('newPageClicked', function(event, selectedPageNum) {

			if (selectedPageNum) {
				adFilters.pageNum = selectedPageNum;
				$scope.currentPage = selectedPageNum;
			} else {
				delete adFilters.pageNum;
			}
			reloadAds();
		});


		function reloadAds() {
			AdsData.getAdsAsUser(adFilters.pageNum, adFilters.status)
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

		function deleteAd(adId) {
			AdsData.delete(adId)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					reloadAds();
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				})
		}

		function publishAgainAd(id) {
			AdsData.publishAgain(id)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					reloadAds();
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				})
		}

		function deactivateAd(id) {
			AdsData.deactivate(id)
				.$promise
				.then(function(resp) {
					toaster.pop('success', 'Success!', resp.message, 2000);
					reloadAds();
				}, function(err) {
					toaster.pop('error', 'Error!', err.data.message, 2000);
				})
		}

		$scope.openEditModal = function(adId) {

			var modalInstance = $modal.open({
				templateUrl: 'templates/editAdModal.html',
				size: 'lg',
				controller: 'EditAdController',
				resolve: {
					adId: function() {
						return adId;
					}
				}
			});


			modalInstance.result.then(function(ad) {
				AdsData.edit(ad.id, ad)
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
				templateUrl: 'templates/confirmDeleteAdModal.html',
				size: 'lg',
				controller: 'ConfirmDeleteAdController',
				resolve: {
					adId: function() {
						return adId;
					}
				}
			});


			modalInstance.result.then(function(ad) {
				AdsData.delete(ad.id)
					.$promise
					.then(function(resp) {
						toaster.pop('success', 'Success!', resp.message, 2000);
						reloadAds();
					}, function(err) {
						toaster.pop('error', 'Error!', err.data.message, 2000);
					});
			});
		};

	}
]);
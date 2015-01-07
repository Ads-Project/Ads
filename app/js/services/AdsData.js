'use strict';

app.factory('AdsData', ['$http', '$resource', function($http, $resource) {

	var resource = $resource(
		'http://softuni-ads.azurewebsites.net/api/ads/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});

	var userResource = $resource(
		'http://softuni-ads.azurewebsites.net/api/user/ads/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});

	function getAllAds() {
		return resource.get();
	}

	function getUserAds() {
		return userResource.get();
	}

	function getFiltredAds(adFilters) {

		var res = $resource('http://softuni-ads.azurewebsites.net/api/user/ads/')

		// Generate url filters
		var filterUrl;
		if (adFilters.role === 'guest') {
			filterUrl = 'http://softuni-ads.azurewebsites.net/api/ads/?';

			if (adFilters.categoryId || adFilters.townId || adFilters.pageNum) {

				if (adFilters.categoryId) {
					filterUrl += 'categoryid=' + adFilters.categoryId;

					if (adFilters.townId) {
						filterUrl += '&townid=' + adFilters.townId;

						if (adFilters.pageNum) {
							filterUrl += '&startPage=' + adFilters.pageNum;
							return $resource(filterUrl).get();
						}

					} else if (adFilters.pageNum) {
						filterUrl += '&startPage=' + adFilters.pageNum;
						$resource(filterUrl).get();
					}

					return $resource(filterUrl).get();

				} else if (adFilters.townId) {
					filterUrl += 'townid=' + adFilters.townId;

					if (adFilters.pageNum) {
						filterUrl += '&startPage=' + adFilters.pageNum;
						return $resource(filterUrl).get();
					}

					return $resource(filterUrl).get();

				} else {
					filterUrl += 'startPage=' + adFilters.pageNum;

					return $resource(filterUrl).get();
				}

			} else {
				return getAllAds();
			}
		} else {
			filterUrl = 'http://softuni-ads.azurewebsites.net/api/user/ads/?'

			if (adFilters.pageNum) {
				filterUrl += 'startPage=' + adFilters.pageNum;

				if (adFilters.status) {
					filterUrl += '&Status=' + adFilters.status;
					return $resource(filterUrl).get(); 
				}

				return $resource(filterUrl).get();
			} else {
				if (adFilters.status) {
					filterUrl += 'Status=' + adFilters.status;
					return $resource(filterUrl).get();
				};
				return getUserAds();
			}
		}

	}

	function createNewAd(ad) {
		return userResource.save(ad);
	}

	function getAdById(id) {
		return userResource.get({
			id: id
		});
	}


	function editAd(id, ad) {
		return userResource.update({
			id: id
		}, ad);
	}

	function deleteAd(id) {
		return userResource.delete({
			id: id
		});
	}

	function deactivateAd(id) {
		var deactivateResource = $resource(
			'http://softuni-ads.azurewebsites.net/api/user/ads/deactivate/:id', {
				id: '@id'
			}, {
				update: {
					method: 'PUT'
				}
			});

		return deactivateResource.update({
			id: id
		});
	}

	function publishAgainAd(id) {
		var publishAgainResource = $resource(
			'http://softuni-ads.azurewebsites.net/api/user/ads/publishagain/:id', {
				id: '@id'
			}, {
				update: {
					method: 'PUT'
				}
			});

		return publishAgainResource.update({
			id: id
		});
	}

	return {
		getAll: getAllAds,
		create: createNewAd,
		getById: getAdById,
		edit: editAd,
		delete: deleteAd,
		deactivate: deactivateAd,
		publishAgain: publishAgainAd,
		getAllByFilter: getFiltredAds
	}


}]);
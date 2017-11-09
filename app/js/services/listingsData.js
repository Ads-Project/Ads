'use strict';

app.factory('AdsData', ['$http', '$resource', function($http, $resource) {

	var resource = $resource(
		'http://online-listings.apphb.com/api/ads/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});

	var userResource = $resource(
		'http://online-listings.apphb.com/api/user/ads/:id', {
			id: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});

	var adminResource = $resource(
		'http://online-listings.apphb.com/api/admin/ads/:id', {
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

	function getAds(startPage, categoryId, townId) {

		return $resource(
			'http://online-listings.apphb.com/api/ads', {
				startPage: '1',
				categoryId: '@categoryId',
				townId: '@townId'
			}, {
				update: {
					method: 'PUT'
				}
			}).get({
			startPage: startPage,
			categoryId: categoryId,
			townId: townId
		});
	}

	function getAdsAsUser(startPage, statusId) {

		return $resource(
			'http://online-listings.apphb.com/api/user/ads', {
				startPage: '1',
				status: '@status'
			}, {
				update: {
					method: 'PUT'
				}
			}).get({
			startPage: startPage,
			status: statusId
		});
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
			'http://online-listings.apphb.com/api/user/ads/deactivate/:id', {
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
			'http://online-listings.apphb.com/api/user/ads/publishagain/:id', {
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

	function getAdsAsAdmin(startPage, statusId, categoryId, townId) {
		return $resource(
			'http://online-listings.apphb.com/api/admin/ads', {
				startPage: '1',
				status: '@status',
				categoryId: '@categoryId',
				townId: '@townId'
			}, {
				update: {
					method: 'PUT'
				}
			}).get({
			startPage: startPage,
			status: statusId,
			categoryId: categoryId,
			townId: townId
		});
	}

	function rejectAd(id) {
		var rejectAdResource = $resource(
			'http://online-listings.apphb.com/api/admin/ads/reject/:id', {
				id: '@id'
			}, {
				update: {
					method: 'PUT'
				}
			});

		return rejectAdResource.update({
			id: id
		});
	}

	function approveAd(id) {
		var approveAdResource = $resource(
			'http://online-listings.apphb.com/api/admin/ads/approve/:id', {
				id: '@id'
			}, {
				update: {
					method: 'PUT'
				}
			});

		return approveAdResource.update({
			id: id
		});
	}

	function getByIdAsAdmin(id) {
		return adminResource.get({
			id: id
		});
	}

	function editAsAdmin(id, ad) {
		return adminResource.update({
			id: id
		}, ad)
	}

	function deleteAdAsAdmin(id) {
		return adminResource.delete({
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
		getAds: getAds,
		getAdsAsUser: getAdsAsUser,
		getAdsAsAdmin: getAdsAsAdmin,
		reject: rejectAd,
		approve: approveAd,
		getByIdAsAdmin: getByIdAsAdmin,
		editAsAdmin: editAsAdmin,
		deleteAdAsAdmin: deleteAdAsAdmin
	}


}]);
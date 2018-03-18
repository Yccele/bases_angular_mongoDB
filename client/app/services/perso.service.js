angular.module('myApp').factory('persoFactory', ['$resource',
	function($resource) {
		return $resource('/api/users/:id', { id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
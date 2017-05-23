'use strict';

(function () {
    angular.module('app')
        .factory('SpotifySearchService', ['$rootScope', '$http', function ($rootScope, $http) {
            return function(search) {
                return $http({
                    url: 'https://api.spotify.com/v1/search',
                    params: {
                        q: search.string,
                        type: search.type
                    }
                })
                .then(function successCallback(response) {
                    var result = {
                        data: response.data[search.type+'s'].items,
                        type: search.type,
                        searched: search.string
                    }
                    $rootScope.$broadcast('newSearch', result);
                    return response.data;
                }),
                function errorCallback() {
                    $rootScope.$broadcast('failedSearch');
                }
            }
        }]);
})();
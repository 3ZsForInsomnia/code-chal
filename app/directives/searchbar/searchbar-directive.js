(function () {
    angular.module('app')
        .directive('searchBar', function (SpotifySearchService) {
            return {
                templateUrl: 'app/directives/searchbar/searchbar.html',
                link: function (scope, elem, attr) {
                    scope.searchOptions = ['song', 'album', 'artist'];
                    scope.searchValues = {};
                    // TODO move this method into a service - return validity of user's request
                    scope.search = function (searchInput) {
                        if ((searchInput.string && searchInput.string !== '') && searchInput.type) {
                            scope.invalidSearchString = false;
                            scope.invalidSearchType = false;
                            SpotifySearchService(searchInput);
                            return;
                        }
                        if (!searchInput.string || search === '') {
                            scope.invalidSearchString = true;
                        } else {
                            scope.invalidSearchString = false;
                        }
                        if (!searchInput.type) {
                            scope.invalidSearchType = true;
                        } else {
                            scope.invalidSearchType = false;
                        }
                    }
                }
            }
        });
})();
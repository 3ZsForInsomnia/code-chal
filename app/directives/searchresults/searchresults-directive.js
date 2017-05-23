(function () {
    angular.module('app')
        .directive('searchResults', function () {
            return {
                templateUrl: 'app/directives/searchresults/searchresults.html',
                link: function (scope, elem, attr) {
                    scope.searchedFor = '';
                    scope.successfulSearch = true;
                    scope.items = [];
                    // TODO move some of this into a service
                    // retrieve data here, pass to service that returns necessary info
                    scope.$on('newSearch', function (events, args) {
                        scope.searchedFor = args.searched;
                        scope.items = args.data;
                        scope.type = args.type;
                        scope.successfulSearch = true;
                    });
                    scope.$on('failedSearch', function (events, args) {
                        scope.successfulSearch = false;
                    });
                }
            }
        });
})();
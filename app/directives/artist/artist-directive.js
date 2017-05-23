(function () {
    angular.module('app')
        .directive('artist', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'app/directives/artist/artist.html',
                link: function (scope, elem, attr) {
                    scope.name = scope.data.name;
                    if (scope.data.images && scope.data.images.length > 0) {
                        scope.image = scope.data.images[0].url;
                    }
                    else scope.image = '';
                    scope.popularity = scope.data.popularity;
                    scope.followers = scope.data.followers.total;
                    scope.genres = scope.data.genres;
                }
            }
        });
})();
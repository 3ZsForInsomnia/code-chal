(function () {
    angular.module('app')
        .directive('song', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'app/directives/song/song.html',
                link: function (scope, elem, attr) {
                    scope.name = scope.data.name;
                    scope.album = scope.data.album.name;
                    scope.artist = scope.data.artists[0].name;
                    scope.duration = scope.data.duration_ms;
                    if (scope.data.images && scope.data.images.length > 0) {
                        scope.image = scope.data.images[0].url;
                    }
                    else scope.image = '';
                    scope.popularity = scope.data.popularity;
                }
            }
        });
})();
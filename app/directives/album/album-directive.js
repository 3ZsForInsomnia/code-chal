(function () {
    angular.module('app')
        .directive('album', function () {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'app/directives/album/album.html',
                link: function (scope, elem, attr) {
                    if (scope.data.images && scope.data.images.length > 0) {
                        scope.image = scope.data.images[0].url;
                    }
                    else scope.image = '';
                    scope.artist = scope.data.artists[0].name;
                    scope.type = scope.data.album_type;
                }
            }
        });
})();
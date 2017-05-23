(function () {
    angular.module('app')
        .directive('playlistList', function (PlaylistService, SpotifySearchService) {
            return {
                restrict: 'E',
                templateUrl: 'app/directives/playlistList/playlistList.html',
                link: function (scope, elem, attrs) {
                    scope.userPlaylists = PlaylistService.getAllPlaylists();
                }
            }
        });
})();
(function () {
    angular.module('app')
        .directive('playlistInteractions', function (PlaylistService) {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'app/directives/playlistInteractions/playlistInteractions.html',
                link: function (scope, elem, attr) {
                    scope.playlistNames = PlaylistService.getAllPlaylistsNames();
                    scope.isInvalidPlaylist = false;
                    scope.failedToAdd = false;
                    scope.addToPlaylist = function (name) {
                        if (!name || name === '') {
                            scope.isInvalidPlaylist = true;
                            scope.successfullyAdded = false;
                            return;
                        }
                        scope.isInvalidPlaylist = false;
                        var didAddSuccessfully = PlaylistService.addSongToPlaylist(scope.data, name);
                        if(didAddSuccessfully) {
                            scope.failedToAdd = true;
                        } else {
                            scope.failedToAdd = false;
                        }
                    }
                }
            }
        });
})();
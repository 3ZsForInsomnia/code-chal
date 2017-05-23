(function () {
    angular.module('app')
        .directive('newPlaylist', function (PlaylistService) {
            return {
                templateUrl: 'app/directives/newPlaylist/newPlaylist.html',
                link: function (scope, elem, attrs) {
                    scope.failedAddition = false;
                    scope.createNewPlaylist = function (name) {
                        var successfulAddition = PlaylistService.addNewPlaylist(name);
                        if (!successfulAddition) {
                            scope.failedAddition = true;
                        }
                        else {
                            scope.failedAddition = false;
                            scope.name = ''; // clear out text for next new playlist
                        }
                        
                    }
                }
            }
        });
})();
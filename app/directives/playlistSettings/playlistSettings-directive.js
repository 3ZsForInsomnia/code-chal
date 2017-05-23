(function () {
    angular.module('app')
        .directive('playlistSettings', function (PlaylistService) {
            return {
                restrict: 'E',
                scope: {
                    name: '='
                },
                templateUrl: 'app/directives/playlistSettings/playlistSettings.html',
                link: function (scope, elem, attr) {
                    scope.settings = ['Rename', 'Export'];
                    scope.areSettingsOpen = false;
                    scope.playlist = PlaylistService.getPlaylistByName(scope.name);
                    scope.exportString = JSON.stringify(scope.playlist);
                    scope.openSettings = function () {
                        scope.areSettingsOpen = !scope.areSettingsOpen;
                    }
                    scope.onChange = function (option) {
                        scope.option = option;
                    }
                    scope.changeName = function (newName) {
                        var returnedValue = PlaylistService.changePlaylistName(scope.name, newName);
                        if (!returnedValue) {
                            scope.invalidName = true;
                        } else {
                            scope.invalidName = false;
                        }
                    }
                }
            }
        });
})();
(function () {
    angular.module('app')
        .directive('playlist', function (PlaylistService) {
            return {
                restrict: 'E',
                scope: {
                    data: '='
                },
                templateUrl: 'app/directives/playlist/playlist.html',
                link: function (scope, elem, attr) {
                    exposeData(scope.data);
                    scope.areSongsExpanded = false;

                    scope.expandSongs = function () {
                        scope.areSongsExpanded = !scope.areSongsExpanded;
                    }
                    scope.$on('SongAddedTo' + scope.name, function (events, args) {
                        exposeData(args);
                    });

                    scope.$on('NameChangedFor' + scope.name, function (events, args) {
                        exposeData(args);
                    });

                    function exposeData(data) {
                        scope.name = scope.data.name;
                        scope.image = scope.data.image;
                        scope.note = scope.data.note;
                        scope.songs = scope.data.songs;
                        scope.songCount = scope.data.songs.length;
                    }
                }
            }
        });
})();
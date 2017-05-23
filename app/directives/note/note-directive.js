(function () {
    angular.module('app')
        .directive('note', function (PlaylistService) {
            return {
                restrict: 'E',
                scope: {
                    note: '=',
                    name: '='
                },
                templateUrl: 'app/directives/note/note.html',
                link: function (scope, elem, attr) {
                    scope.isNoteExpanded = false;
                    if (!scope.note) {
                        scope.note = '';
                    }
                    scope.text = scope.note;

                    scope.expandNote = function () {
                        scope.isNoteExpanded = !scope.isNoteExpanded;
                    }

                    scope.saveNote = function (text) {
                        PlaylistService.addNoteToPlaylist(text, scope.name);
                        updateLocalPlaylistAfterModification();
                        scope.expandNote();
                    }

                    function updateLocalPlaylistAfterModification() {
                        var data = PlaylistService.getPlaylistByName(scope.name);
                        scope.note = data.note;
                        scope.text = scope.note;
                    }
                }
            }
        });
})();
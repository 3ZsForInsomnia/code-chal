// Most of this is probably commented out, but left here for posterity
// It helps show some of my workflow/exploratory steps before moving forward

// For example, I created something that would use the search service
// Then some directives to consume the results of those API calls

// Here, I needed to figure out how to construct a playlist in a way I could easily change and use
// So, I created a basic playlist service, then created this set of API calls to get fake data
// With this fake data, I have a very good, tangible idea of what a playlist directive will need to show
// And since I have a few playlists, I can see how multiple appear on the screen together

// I find that having something tangible early on, before most directives or services exist
// is really helpful in determing how to manage things later, and also informs decisions on
// import/export features in this project.

(function () {
    angular.module('app').controller('AppCtrl', ['$scope', 'SpotifySearchService', 'PlaylistService',
        function ($scope, SpotifySearchService, PlaylistService) {
            SpotifySearchService({
                string: 'motley',
                type: 'track'
            });
            SpotifySearchService({
                string: 'iggy',
                type: 'track'
            });
            SpotifySearchService({
                string: 'iron maiden',
                type: 'track'
            });
            var z = 0;
            $scope.$on('newSearch', function (events, args) {
                var names = ['mutley cruh', 'iguanapop', 'ern merdern'];
                PlaylistService.addNewPlaylist(names[z]);
                for (var i = 0; i < 5; i++) {
                    PlaylistService.addSongToPlaylist(args.data[i], names[z]);
                }
                PlaylistService.addNoteToPlaylist('This is a note. Here is some default text to fill it. You know what? Here is even more.', names[z]);
                PlaylistService.addImageToPlaylist('https://i.scdn.co/image/52c4b2e93f533056a878fede107de09945fa18bf', names[z]);
                var list = PlaylistService.getAllPlaylists();
                z += 1;
                // if (z === 2) {
                //     console.log('list: ', JSON.stringify(list));
                // }
            });
        }
    ]);
})();
'use strict';

/*
    Approach here is to have this service *own* all state. In that, no changes should be made to state directly.
    
    This service should be used to retrieve pieces of state, and pass the name of the playlist to an action method
    that will then actually make the modification to state. Then, either state is emitted or returned by the method.
    
    This keeps a single source of truth for all less-transient data (aka less transient than search) and all
    workings of state are, as much as possible, abstracted away from all other entities within the app.

    It also means that there is a single chain of events
        1. Entities reach out for pieces of state/data, retrieved from this service
        2. That data is then presented to the user as something that can be acted upon
        3. When acted upon, entities provide an action (by calling a particular method)
            as well as the information necessary to identify what to change (playlist name)
            and what is to be added/removed/modified.
    
    To make this even more effective, maintainable and higher performing, RxJS (a library for which exists in AngularJS/ng 1) 
    and its Observables would likely be of great help. Not too sure how well a full redux framework would work with
    AngularJS, however there are several implementations for Vanillajs, React, and Angular 2+.
*/

(function () {
    angular.module('app')
        .service('PlaylistService', function ($rootScope) {
            var playlists = [];
            var maxSongCount = 10;

            this.addNewPlaylist = function (playlistName) {                
                var index = this.findPlaylistByName(playlistName);
                if (index === -1) {
                    playlists.push({
                        name: playlistName,
                        songs: [],
                        note: '',
                        image: ''
                    });
                    return true;
                }
                return false;
            }

            this.getAllPlaylists = function () {
                return playlists;
            }

            this.getAllPlaylistsNames = function () {
                var names = [];
                for (var i = 0; i < playlists.length; i++) {
                    names.push(playlists[i].name);
                }
                return names;
            }

            this.deletePlaylist = function (playlistName) {
                var index = this.findPlaylistByName(playlistName);
                if (index >= 0) {
                    playlists = playlists.splice(index, 1);
                    return true;
                }
                return false;
            }

            this.changePlaylistName = function (playlistName, newPlaylistName) {
                var isUnique = this.findPlaylistByName(newPlaylistName);
                if (isUnique) {
                    var index = this.findPlaylistByName(playlistName);
                    playlists[index].name = newPlaylistName;
                    $rootScope.$broadcast('NameChangedFor' + playlistName, playlists[index]);
                    return true;
                }
                return false;
            }

            // Sadly ng-repeat has "issues" with duplicates, so you can't include your favorite song twice
            this.addSongToPlaylist = function (song, playlistName) {
                var index = this.findPlaylistByName(playlistName);
                var playlist = playlists[index];
                for (var i = 0; i < playlist.songs.length; i++) {
                    if (song.name === playlist.songs[i].name) {
                        return false;
                    }
                }
                if (playlist.songs.length < maxSongCount) {
                    playlist.songs.push(song);
                    $rootScope.$broadcast('SongAddedTo' + playlistName, playlist);
                    return true;
                }
                return false;
            }

            this.removeSongFromPlaylist = function (songName, playlistName) {
                var index = this.findPlaylistByName(playlistName);
                var songIndex = -1;
                for (var i = 0; i < playlists[index].songs.length; i++) {
                    if (songName === playlists[index].songs[i]) {
                        songIndex = i;
                    }
                }
                if (songIndex >= 0) {
                    playlists[index].songs.splice(songIndex, 1);
                    return true;
                }
                return false;
            }

            this.addNoteToPlaylist = function (note, playlistName) {
                var index = this.findPlaylistByName(playlistName);
                playlists[index].note = note;
            }

            this.addImageToPlaylist = function (imageSrc, playlistName) {
                var index = this.findPlaylistByName(playlistName);
                playlists[index].image = imageSrc;
                $rootScope.$broadcast('ImageAddedTo' + playlistName, imageSrc);
            }

            this.removeImageFromPlaylist = function (playListName) {
                var index = this.findPlaylistByName(playlistName);
                playlists[index].image = '';
            }

            this.findPlaylistByName = function (playlistName) {
                for (var i = 0; i < playlists.length; i++) {
                    if (playlists[i].name === playlistName) {
                        return i;
                    }
                }
                return -1;
            }

            this.getPlaylistByName = function (playlistName) {
                var index = this.findPlaylistByName(playlistName);
                return playlists[index];
            }
        });
})();
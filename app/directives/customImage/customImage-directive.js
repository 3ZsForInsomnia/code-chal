(function () {
    angular.module('app')
        .directive('customImage', function (PlaylistService) {
            return {
                restrict: 'E',
                scope: {
                    src: '=',
                    type: '=',
                    name: '='
                },
                templateUrl: 'app/directives/customImage/customImage.html',
                link: function (scope, elem, attrs) {
                    if (!scope.src || scope.src === '') {
                        scope.isImagePresent = false;
                    } else scope.isImagePresent = true;
                    if (!scope.isImagePresent && scope.type === 'playlist') {
                        scope.text = 'Choose an image!';
                    } else scope.text = 'No image was found.';

                    scope.isAddingImage = false;
                    scope.addingImage = function () {
                        scope.isAddingImage = true;
                    }

                    scope.saveImageSource = function (imageSrc) {
                        PlaylistService.addImageToPlaylist(imageSrc, scope.name);
                        scope.src = PlaylistService.getPlaylistByName(scope.name).image;
                        if (scope.src && scope.src !== '') {
                            scope.isImagePresent = true;
                        }
                        scope.isAddingImage = false;
                    }
                }
            }
        });
})();
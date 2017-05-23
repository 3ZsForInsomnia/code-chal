(function () {
    angular.module('app')
        .directive('contentItem', function () {
            return {
                restrict: 'E',
                scope: {
                    content: '=',
                },
                templateUrl: 'app/directives/contentItem/contentItem.html',
                link: function (scope, elem, attrs) {
                }
            }
        });
})();
(function () {
    angular.module('app')
        .directive('navigation', function () {
            return {
                templateUrl: 'app/directives/nav/nav.html'
            }
        });
})();
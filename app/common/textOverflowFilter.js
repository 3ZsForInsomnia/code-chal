(function () {
    angular.module('app')
        .filter('textOverflowFilter', function () {
            return function (text) {
                if (typeof text === 'string') {
                    if (text.length > 150) {
                        return text.slice(0, 150) + '...';
                    }
                    else return text;
                }
            };
        });
})();
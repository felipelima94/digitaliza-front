(function () {
    "use strict";

    angular.module('app').service('date_Helper', function () {
        return {
            timestampToDate: (date) => {
                date = date.split(" ")[0];
                date = date.split("-");
                return `${date[2]}/${date[1]}/${date[0]}`;
            }
        }
    })
})();
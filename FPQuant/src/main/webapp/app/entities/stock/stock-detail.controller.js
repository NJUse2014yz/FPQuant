(function() {
    'use strict';

    angular
        .module('fpQuantApp')
        .controller('StockDetailController', StockDetailController);

    StockDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Stock'];

    function StockDetailController($scope, $rootScope, $stateParams, previousState, entity, Stock) {
        var vm = this;

        vm.stock = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('fpQuantApp:stockUpdate', function(event, result) {
            vm.stock = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

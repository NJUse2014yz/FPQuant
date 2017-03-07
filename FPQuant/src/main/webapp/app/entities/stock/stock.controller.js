(function() {
    'use strict';

    angular
        .module('fpQuantApp')
        .controller('StockController', StockController);

    StockController.$inject = ['Stock'];

    function StockController(Stock) {

        var vm = this;

        vm.stocks = [];

        loadAll();

        function loadAll() {
            Stock.query(function(result) {
                vm.stocks = result;
                vm.searchQuery = null;
            });
        }
    }
})();

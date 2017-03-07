(function() {
    'use strict';

    angular
        .module('fpQuantApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('stock', {
            parent: 'entity',
            url: '/stock',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'fpQuantApp.stock.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/stock/stocks.html',
                    controller: 'StockController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('stock');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('stock-detail', {
            parent: 'stock',
            url: '/stock/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'fpQuantApp.stock.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/stock/stock-detail.html',
                    controller: 'StockDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('stock');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Stock', function($stateParams, Stock) {
                    return Stock.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'stock',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('stock-detail.edit', {
            parent: 'stock-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/stock/stock-dialog.html',
                    controller: 'StockDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Stock', function(Stock) {
                            return Stock.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('stock.new', {
            parent: 'stock',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/stock/stock-dialog.html',
                    controller: 'StockDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                sid: null,
                                sname: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('stock', null, { reload: 'stock' });
                }, function() {
                    $state.go('stock');
                });
            }]
        })
        .state('stock.edit', {
            parent: 'stock',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/stock/stock-dialog.html',
                    controller: 'StockDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Stock', function(Stock) {
                            return Stock.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('stock', null, { reload: 'stock' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('stock.delete', {
            parent: 'stock',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/stock/stock-delete-dialog.html',
                    controller: 'StockDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Stock', function(Stock) {
                            return Stock.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('stock', null, { reload: 'stock' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

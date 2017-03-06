(function() {
    'use strict';

    angular
        .module('fpQuantApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,/*抽象模板*/
            views: {/*视图*/
                'navbar@': {/*绝对视图*/
                    templateUrl: 'app/layouts/navbar/navbar.html',/*模板*/
                    controller: 'NavbarController',/*控制器*/
                    controllerAs: 'vm'/*控制器别名*/
                }
            },
            resolve: {/*解析要注入到控制器中的依赖列表*/
                authorize: ['Auth',
                    function (Auth) {
                        return Auth.authorize();
                    }
                ],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                }]
            }
        });
    }
})();

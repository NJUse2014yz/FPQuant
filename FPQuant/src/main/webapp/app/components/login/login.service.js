(function() {
    'use strict';

    angular
        .module('fpQuantApp')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$uibModal'];

    function LoginService ($uibModal) {
        var service = {
            open: open
        };

        var modalInstance = null;
        var resetModal = function () {
            modalInstance = null;
        };

        return service;

        function open () {
            if (modalInstance !== null) return;
            /*弹出模态窗口*/
            modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/login/login.html',/*模板*/
                controller: 'LoginController',/*控制器*/
                controllerAs: 'vm',/*控制器别名*/
                resolve: {/*解析依赖*/
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('login');
                        return $translate.refresh();
                    }]
                }
            });
            modalInstance.result.then(
                resetModal,
                resetModal
            );
        }
    }
})();

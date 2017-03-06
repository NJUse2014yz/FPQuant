(function() {
    'use strict';

    angular
        .module('fpQuantApp')
        .controller('ActivationController', ActivationController);

    /*相关文件：
      services/auth/auth.service.js
      components/login/login.service.js
    */
    ActivationController.$inject = ['$stateParams', 'Auth', 'LoginService'];

    function ActivationController ($stateParams, Auth, LoginService) {
        var vm = this;

        // $stateParams是路由传递参数
        Auth.activateAccount({key: $stateParams.key}).then(function () {//处理异常
            vm.error = null;
            vm.success = 'OK';
        }).catch(function () {
            vm.success = null;
            vm.error = 'ERROR';
        });

        vm.login = LoginService.open;
    }
})();

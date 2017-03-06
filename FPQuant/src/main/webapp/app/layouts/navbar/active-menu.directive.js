(function() {
    'use strict';

    angular
        .module('fpQuantApp')
        .directive('activeMenu', activeMenu);

    activeMenu.$inject = ['$translate', '$locale', 'tmhDynamicLocale'];

    function activeMenu($translate, $locale, tmhDynamicLocale) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        // 隔离域中的连接函数
        function linkFunc(scope, element, attrs) {
            var language = attrs.activeMenu;

            scope.$watch(function() {
                return $translate.use();//是否采用国际化
            }, function(selectedLanguage) {
                if (language === selectedLanguage) {
                    tmhDynamicLocale.set(language);//设置语言
                    element.addClass('active');//添加样式类active
                } else {
                    element.removeClass('active');
                }
            });
        }
    }
})();

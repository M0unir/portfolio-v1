(function () {
  'use strict';

  angular
    .module('mounirApp')
    .directive('siteNavbar', siteNavbar)
    .directive('siteFooter', siteFooter);

  /** @ngInject */
  function siteNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/partials/header.html',
      controller: siteNavbarController,
      controllerAs: 'menu'
    };

    return directive;

    /** @ngInject */
    function siteNavbarController() {
      var vm = this;
      //   console.log('Directive siteNavbar loaded...');
      vm.showNavbar = false;

      vm.toggleNavbar = function () {
        if (!vm.bodyClass) {
          vm.bodyClass = 'nav-open';
        } else {
          vm.bodyClass = '';
        }

        vm.showNavbar = !vm.showNavbar;
      };
    }
  }


  /** @ngInject */
  function siteFooter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/partials/footer.html',
      controller: siteFooterController,
      controllerAs: 'footer'
    };

    return directive;

    /** @ngInject */
    function siteFooterController() {
      var vm = this;
      vm.year = 2017;
        console.log('Directive siteFooter loaded...');
    }
  }


})();

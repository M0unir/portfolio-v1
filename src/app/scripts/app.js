'use strict';

// create the module and name it scotchApp
angular.module('mounirApp', ['ui.router', 'ngAnimate', 'duScroll'])
  .config(routesConfig)
  .value('duScrollEasing', easeInOutQuad)
  .run(run);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
    .state('home', {
      url: '/',
      templateUrl: 'app/partials/home.html',
    })

    // PROJECTS PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('projects', {
      url: '/projects',
      abstract: true,
      templateUrl: 'app/partials/projects.html',
      resolve: {
        projects: function (ProjectsService) {
          return ProjectsService.getAllProjects();
        }
      }
    })

    .state('projects.list', {
      url: '/list',
      templateUrl: 'app/partials/projects.list.html',
      controller: 'ProjectsController'
    })
    // INDIVIDUAL PROJECT PAGE =================================
    .state('projects.details', {
      url: '/:projectId',
      templateUrl: 'app/partials/project.details.html',
      controller: 'ProjectController',
      resolve: {
        project: function (ProjectsService, $stateParams) {
          return ProjectsService.getProject($stateParams.projectId);
          console.log('STATE PARAMS' + $stateParams.projectId);

        }
      }
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
      url: '/about',
      controller: 'AboutController',
      views: {
        // the main template will be placed here (relatively named)
        '': {
          templateUrl: 'app/partials/about.html'
        },
        // the child views will be defined here (absolutely named)
        'aboutDetails@about': {
          templateUrl: 'app/partials/about.details.html'
        },
      }
    })

    // CONTACT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('contact', {
      url: '/contact',
      views: {
        // the main template will be placed here (relatively named)
        '': {
          templateUrl: 'app/partials/contact.html'
        },
        // the child views will be defined here (absolutely named)
        'contactForm@contact': {
          templateUrl: 'app/partials/contact.form.html',
          controller: 'ContactsController'
        },
      }
    });

}

/** @ngInject */
function easeInOutQuad(t) {
  return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

/** @ngInject */
function run($rootScope, $location, $window, $http) {
  $rootScope.$on('$stateChangeSuccess', function () {
    FastClick.attach(document.body);
    $window.ga('send', 'pageview', $location.path());

    var body = angular.element(document.querySelector('body'));
    // console.log(body);

    //  scroll on body
    var hasScrolled = false;
    angular.element(window).bind("scroll", function () {
      if (this.pageYOffset >= 100) {
        // console.log('Scrolled below header.');
        // console.log(body);
        body.removeClass('scrolled-out').addClass('scrolled');
        hasScrolled = true;
        // console.log(body);

      } else {
        // console.log('Header is in view.');
        body.removeClass('scrolled');
        if (hasScrolled) {
          body.addClass('scrolled-out');
        }
      }
      // scope.$apply();
    });

  });

  $http.get('app/data/projects.json', {
    cache: true
  });

}

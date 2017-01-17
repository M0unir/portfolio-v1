(function () {
  'use strict';

  angular.module('mounirApp')
    .controller('MainController', MainController)
    .controller('ProjectsController', ProjectsController)
    .controller('ProjectController', ProjectController)
    .controller('AboutController', AboutController)
    .controller('ContactsController', ContactsController);

  /** @ngInject */
  function ProjectsController($scope, projects) {
    console.log('ProjectsController loaded...');
    // $scope.message = 'About!';

    $scope.pageClass = 'projects-page';

    $scope.projects = projects;

    console.log("----- LIST CONTROLLER LAUNCHED... ----");
    console.log(projects);
  }

  /** @ngInject */
  function ProjectController($scope, project, $timeout, $anchorScroll, $stateParams) {
    console.log('ProjectController loaded...');

    $scope.pageClass = 'project-page';

    $timeout(function () {
      $anchorScroll('section-projects');
    });

    console.log("----- DETAILS CONTROLLER LAUNCHED... ----");
    $scope.project = project;
    console.log(project);
  }

  /** @ngInject */
  function AboutController($scope) {
    console.log('about loaded...');

    $scope.message = 'About!';
    $scope.pageClass = 'about-page';
  }

  /** @ngInject */
  function ContactsController($scope, $http) {
    console.log('Contact Controller loaded...');

    $scope.message = 'Contact';
    $scope.pageClass = 'contact-page';

    $scope.loading = false;
    $scope.send = function (mail) {
      $scope.loading = true;
      $http.post('/send', {
        from: mail.from,
        name: mail.name,
        message: mail.message
      }).then(function (res) {
        $scope.loading = false;
        $scope.serverMessage = 'Email sent successfully';
        console.log('RES...' + res);
      });
    };

  }

  /** @ngInject */
  function MainController($scope) {
    console.log('main loaded...');

    $scope.test = "World";
  }

})();

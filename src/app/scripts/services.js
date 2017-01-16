'use strict';

angular.module('mounirApp')
  .factory('ProjectsService', ProjectsService);

/** @ngInject */
function ProjectsService($http) {
  var service = {
    getAllProjects: function() {
      return $http.get('app/data/projects.json', { cache: true }).then(function(resp) {
        return resp.data;
      });
    },
    
    getProject: function(id) {
      function projectMatchesParam(project) {
        return project.id === id;
      }
      
      return service.getAllProjects().then(function (projects) {
        return projects.find(projectMatchesParam);
      });
    }
  };
  
  return service;

}

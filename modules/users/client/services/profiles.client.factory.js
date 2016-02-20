angular.module('users').factory('Profiles', ['$http', 
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:8080/api/profiles');
      },

      create: function(profile) {
        return $http.post('http://localhost:8080/api/profiles', profile);
      }, 

      read: function(id) {
        return $http.get('http://localhost:8080/api/profiles/' + id);
      }, 

      update: function(id, profile) {
        return $http.put('http://localhost:8080/api/profiles/' + id, profile);
      }, 

      delete: function(id) {
        return $http.delete('http://localhost:8080/api/profiles/' + id);
      }
    };

    return methods;
  }
]);
angular.module('users').factory('Profiles', ['$http', 
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('http://localhost:8080/api/users');
      },

      create: function(profile) {
        return $http.post('http://localhost:8080/api/users', profile);
      }, 

      read: function(id) {
        return $http.get('http://localhost:8080/api/users/' + id);
      }, 

      update: function(id, profile) {
        return $http.put('http://localhost:8080/api/users/' + id, profile);
      }, 

      delete: function(id) {
        return $http.delete('http://localhost:8080/api/users/' + id);
      }
    };

    return methods;
  }
]);
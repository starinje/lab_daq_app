angular.module('apiService', [])

.factory('execute_api_call', function($http) {

    // create the object
    var api_call_instance = {};
    
    api_call_instance.execute = function(api_call_id) {
        return $http.get('/api/' + api_call_id);
    };
    
    return api_call_instance;

});
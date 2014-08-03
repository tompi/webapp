webapp.factory('socket', ['$rootScope',
function($rootScope, $routeParams) {
    var socket = window.io.connect();
    var me = {};
    me.join = function(room) {
        me.emit('join', room);
    };
    me.on = function(eventName, callback) {
        socket.on(eventName, function() {
            var args = arguments;
            $rootScope.$apply(function() {
                callback.apply(socket, args);
            });
        });
    };
    me.emit = function(eventName, data, callback) {
        socket.emit(eventName, data, function() {
            var args = arguments;
            $rootScope.$apply(function() {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        });
    };
    return me;
}]);
var webapp = angular.module('webapp', ['ngRoute', 'restangular', 'ui.bootstrap']);

webapp.config(
  ['$routeProvider', 'RestangularProvider',
    function($routeProvider, RestangularProvider) {
      $routeProvider.
        when('/',
             {
               templateUrl: 'home/index.html',
               controller: 'HomeCtrl'
             }).
        when('/forms',
             {
                templateUrl: 'forms/index.html',
                controller: 'FormsCtrl'
             }).
        when('/dialogs',
             {
                templateUrl: 'dialogs/index.html',
                controller: 'DialogsCtrl'
             }).
        when('/tables',
             {
                templateUrl: 'tables/index.html',
                controller: 'TablesCtrl'
             }).
        when('/mongodb',
             {
                templateUrl: 'mongodb/index.html',
                controller: 'MongodbCtrl'
             }).
        when('/passport',
             {
                templateUrl: 'passport/index.html',
                controller: 'PassportCtrl'
             }).
        when('/about',
             {
                templateUrl: 'about/index.html',
                //controller: 'AboutCtrl'
             }).
        otherwise(
             {
                redirectTo: '/'
             });
      RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
        return response.payload;
      });
      RestangularProvider.setRestangularFields({
        id: "_id",
      });
    }
]);

// Nicking the bsNavbar directive from angular strap
// (only 1 needed not in angular.ui)
webapp.directive('bsNavbar', 
  ['$location',
  function($location) {
  'use strict';

  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs, controller) {
      // Watch for the $location
      scope.$watch(function() {
        return $location.path();
      }, function(newValue, oldValue) {

        $('li[data-match-route]', element).each(function(k, li) {
          var $li = angular.element(li),
          // data('match-rout') does not work with dynamic attributes
          pattern = $li.attr('data-match-route'),
          regexp = new RegExp('^' + pattern + '$', ['i']);

          if(regexp.test(newValue)) {
            $li.addClass('active');
          } else {
            $li.removeClass('active');
          }

        });
      });
    }
  };
}]);

var app = angular.module('myapp', ['ngRoute', 'ngMaterial', 'fb', 'gp']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/landing.html',
        controller: 'LandingController'
    }).when('/votingpanel', {
        templateUrl: 'views/panel.html',
        controller: 'VotingPanelController'
    }).when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultController'
    }).when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
    }).otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
});
app.run(function($rootScope, $location) {
    $rootScope.socket = io.connect();
    if (localStorage.getItem("token") !== null) {
        $rootScope.token = localStorage.getItem("token");
    }
    
    $rootScope.logOut = function() {
        localStorage.removeItem('token');
        $location.path('/');
    }
})

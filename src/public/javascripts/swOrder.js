var swOrder = angular
    .module('swOrder', ['ngRoute', 'ngResource'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'Home'
            })
            .when('/menu', {
                templateUrl: 'views/menu/html'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'Login'
            })
            .when('/order', {
                templateUrl: 'views/order.html',
                controller: 'OrderCtrl',
                controllerAs: 'Order'
            })
            .when('/order/:id', {
                templateUrl: 'views/orderPicked.html',
                controller: 'OrderPickedCtrl',
                controllerAs: 'OrderPickedCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    })
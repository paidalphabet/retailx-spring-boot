/**
 * Angular app file. 
 */
var routerApp = angular.module('retailx', ['ngRoute']);

routerApp.config(function($routeProvider) {
    $routeProvider
    .when("/product/", {
        templateUrl : "/pages/jsp/product/productDetails"
    })
    });
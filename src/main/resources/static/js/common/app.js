/**
 * Angular app file. 
 */
var routerApp = angular.module('retailx', ['ngRoute', 'ui.bootstrap']);

routerApp.config(function($routeProvider) {
    $routeProvider
    .when("/product/", {
        templateUrl : "/pages/jsp/product/productDetails"
    }).when("/productList/", {
              templateUrl : "/pages/jsp/product/productList"
          })
          .when("/sale/", {
                        templateUrl : "/pages/jsp/sale/saleDetails"
                    })
    });
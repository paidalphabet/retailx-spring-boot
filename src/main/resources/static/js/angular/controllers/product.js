routerApp.controller("product", function($scope, $http, $location, $window, $routeParams) {
    $scope.product = {};
    $scope.products  = [];

    $scope.saveProduct = function(){
        var saveProductURL = webserviceURL['saveProduct'];
        var response = postAjaxJSON($http,saveProductURL,$scope.product);
        response.success(function(data){
                $scope.updateProduct(data)
                });
        response.error(console.log("error"));
    }

    $scope.updateProduct = function (product){
        $scope.product = product;
    }

    $scope.viewProductDetails = function(code){
        window.location = "#/product?code=" + code;
    }

    $scope.loadProductDetails = function(code){
        var productDetailsURL = webserviceURL['getProductByID'] + "/" + code;
        var response = getAjaxJSON($http, productDetailsURL);
        response.success(function(data){
                 $scope.updateProduct(data)
         });
         response.error(function(data){console.log("error " + data )});

    }

    $scope.loadProducts = function(){
        var loadProductURL = webserviceURL['allProducts'];
        var response = getAjaxJSON($http,loadProductURL);
        response.success(function(data){
                $scope.products = data.products;
                });
        response.error(console.log("error"));
    }


    var code = $routeParams.code;
    if(code != -123){
        $scope.loadProductDetails(code);
    }



});
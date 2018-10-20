/**
 *  Controller js for footer.
 */
routerApp.controller('footerController', function($scope, $http, $location, $window, $stateParams) {
	$scope.footer = {};
	$scope.footer.emailID = "";
	$scope.footer.isUserSubscribed = false;
	$scope.footer.isUserAlreadySubscribed = false;
	$scope.subscribe = function(){
		var data = {
				emailID : $scope.footer.emailID
		};
		var url = webserviceURL['subscribe'];
		var formdata = $.param(data);		
		var webserviceResponse = postAjax($http, url, formdata);		
		webserviceResponse.success(function(data){
			
			if(data.isSubscriptionSaved == SUBSCRIPTION_SAVED){
				$scope.footer.isUserSubscribed = true;
				$scope.footer.isUserAlreadySubscribed = false;
			}
			if(data.isSubscriptionSaved == SUBSCRIPTION_NOT_SAVED){
				$scope.footer.isUserSubscribed = false;
				$scope.footer.isUserAlreadySubscribed = true;
			}
		});
	};
});
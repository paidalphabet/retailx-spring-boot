routerApp.controller("loginController", function($scope, $http, $location, $window, $state) {
	$('#invalidCredentialsMsg').hide();
	$('#enterCredentialsMsg').hide();
	
    $scope.secureLogin = function(){
    	if($scope.emailId == undefined || $scope.password == undefined){
    		$('#enterCredentialsMsg').show();
    	}else{
    		$('#enterCredentialsMsg').hide();
	    	var dataObj = {
	    		emailId : $scope.emailId,
				password : $scope.password
			};
			var res = $http.post('login', dataObj);
			res.success(function(data, status, headers, config) {
				console.log('Login Check Status : '+data.login);
				if(data.login == true){
					/*
					
					Commented this code. Please keep this code, please do not delete. 
					
					$('#invalidCredentialsMsg').hide();
					$('#closeLoginPopup').click();
					$('#loginInfo').html('<ul><li><a href="#">Hello, ' + data.user + '</a></li><li><a href="logout">Logout</a></li></ul>');
					$('#header_goalSummary').removeClass('hide');
					$('#userID').val(data.userId);
					
					*/
					
					window.location.reload();
				}else{
					$('#invalidCredentialsMsg').show();
				}
			});
			res.error(function(data, status, headers, config) {
				console.log( "failure message: " + JSON.stringify({data: data}));
			});
		}
    };
    
    $scope.register = function(){
    	$('#closeLoginPopup').click();
    	$location.path('/register');
    };
    
    $scope.navigateToResetPassword = function(){
    	$('#closeLoginPopup').click();
    	$location.path('/resetPassword');
    };
});


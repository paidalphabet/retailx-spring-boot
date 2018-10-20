routerApp.controller('changePassword', function($scope, $http, $location) {
	
	$scope.passwordResetCodeSendMessage = false;
	$scope.accountDetailsDoesNotMatchError = false;
	$scope.passwordDoesNotMatchError = false;
	$scope.resetCodeBlock = false;
	$scope.validateResetCodeButton = false;
	$scope.changePasswordButton = false;
	$scope.codeValidationError = false;
	$scope.passwordBlock = false;
	$scope.sendResetCodeButton = true;
	$scope.emailId = "";
	$scope.resetCode =  "";
	
    $scope.sendResetCode = function(){
	var emailId = $scope.emailId;
	var data = { emailId: emailId};
	
	var url = 'sendResetPasswordCode';
	var resp = postAjaxJSON($http, url, data);
		resp.success(function(response){
		if(response == "SUCCESS"){
			$scope.accountDetailsDoesNotMatchError = false;
			$scope.sendResetCodeButton = false;
			$scope.resetCodeBlock = true;
			$scope.validateResetCodeButton = true;
			$('#emailId').attr('disabled','disabled');
			$('#username').attr('disabled','disabled');
		}else{
			$scope.accountDetailsDoesNotMatchError = true;
			$scope.resetCodeBlock = false;
			$scope.sendResetCodeButton = true;
			$('#emailId').removeAttr('disabled');
			$('#username').removeAttr('disabled');
		}
		});
		resp.error(function(data){
			console.log(data);
		});
    };

$scope.validateResetCode = function(){
	var emailId = $scope.emailId;
	var resetCode = $scope.resetCode;
	var data = {  emailId: emailId, resetCode: resetCode}; 
	var url  =  "validateResetCode";
	var resp = postAjaxJSON($http, url, data);
	resp.success(function(data){
		if(data == "SUCCESS"){
			$scope.codeValidationError = false;
			$scope.passwordBlock = true;
			$scope.validateResetCodeButton = false;
			$scope.changePasswordButton = true;
			$('#resetCode').attr('disabled','disabled');
		}else{
			$scope.codeValidationError = true;
			$scope.passwordBlock = false;
			$scope.changePasswordButton = false;
			$scope.validateResetCodeButton = true;
			$('#resetCode').removeAttr('disabled');
		}
	});
	resp.error(function(data){
		console.log(data);
	});
  };

   $scope.checkPasswords = function(){
	   var password = $scope.password;
	   var confirmPassword = $scope.confirmPassword;
	   return password == confirmPassword;
   };


	$scope.resetUserPassword = function(){
		var emailId = $scope.emailId;
		var password = $scope.password;
		var confirmPassword = $scope.confirmPassword;
		var resetCode = $scope.resetCode;
		var data = { emailId: emailId, password: password, confirmPassword: confirmPassword, resetCode: resetCode}; 
		var url = "setNewPassword";
		var validate = $scope.checkPasswords();
		if(validate){
			var response = postAjaxJSON($http, url, data);
			response.success(function(data){
				if(data == "SUCCESS"){
					$scope.passwordDoesNotMatchError = false;
					$location.path('/homeContent');
					//window.location = homePage;
				}else{
					$scope.passwordDoesNotMatchError = true;
				}
			});
			response.error(function(data){
				console.log(data);
			});
		}else{
			$scope.passwordDoesNotMatchError = true;
		}
	};

$scope.goToHome = function(){
	window.location = appUrl;
}

$scope.initialize = function(){
	$scope.passwordResetCodeSendMessage = false;
	$scope.accountDetailsDoesNotMatchError = false;
	$scope.passwordDoesNotMatchError = false;
	$scope.resetCodeBlock = false;
	$scope.validateResetCodeButton = false;
	$scope.changePasswordButton = false;
	$scope.codeValidationError = false;
	$scope.passwordBlock = false;
	$scope.sendResetCodeButton = true;
}

});
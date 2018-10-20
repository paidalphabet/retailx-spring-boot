routerApp.controller('registrationController', function($scope, $http, $location, $window) {
	$scope.registrationForm = {};
	var validators = [];
	$scope.initializePage = function() {
		$scope.registrationForm.firstName = "";
		$scope.registrationForm.lastName = "";
		$scope.registrationForm.emailId = "";
		$scope.registrationForm.password = "";
		$scope.registrationForm.reTypePassword = "";
		$('#submitForm').attr('disabled', 'disabled');
		$scope.duplicateUserNameError = false; 
	};
	
	$scope.initializePage();
	
	$scope.checkPasswordMatch = function(){
		var matches = true;
		var password = $scope.registrationForm.password;
		var reTypePassword = $scope.registrationForm.reTypePassword;
		if(password != "" && reTypePassword != ""){
			if(password == reTypePassword){
				$('#submitForm').removeAttr('disabled');
				$scope.passwordMisMatchError = false;
				matches = true;
			}else{
				$('#submitForm').attr('disabled', 'disabled');
				$scope.passwordMisMatchError = true;
				matches = false;
			}
		}
		return matches;
	};

	$scope.register = function(){
		var url = userRegister;		
		var doesPasswordsMatch = $scope.checkPasswordMatch();
		var validEmailID = validateEmailID($scope.registrationForm.emailId);
		if(doesPasswordsMatch && validEmailID){
			var emailID = $scope.registrationForm.emailId;
			var data = {
					emailId : emailID
			};
			var checkEmailURL = 'checkDuplicateUsername';
			var duplicateEmailIDResponse = postAjaxJSON($http, checkEmailURL, data);
			duplicateEmailIDResponse.success(function(res){
				if(res == "SUCCESS"){
					var formData =   $.param($scope.registrationForm);
					var response = postAjax($http,url,formData);
					$scope.postProcessForm(response);
				}else{
					alert('Account already exist with this email-id, please login to proceed.');
				}
			});
		}
		$scope.passwordMisMatchError = !doesPasswordsMatch;
		$scope.invalidEmailID = !validEmailID;
	};

	$scope.postProcessForm = function(response) {
		    response.success(function(data, status, headers, config) {
		    	if(data.view=="home"){
		    		$('#loginInfo').html('<ul><li><a href="#">Hello, ' + data.user + '</a></li><li><a href="logout">Logout</a></li></ul>');
					$('#header_goalSummary').removeClass('hide');
		    		$location.path('/homeContent');
		    	}else if(data.view=="summary"){
		    		$('#loginInfo').html('<ul><li><a href="#">Hello, ' + data.user + '</a></li><li><a href="logout">Logout</a></li></ul>');
					$('#header_goalSummary').removeClass('hide');
		    		$location.path('/goalSummary');
		    	}
		    });
		    response.error(function(data, status, headers, config) {
		        alert("Exception details: ");
		    });
	};

	$scope.chkPasswordStrength = function(strengthMsg) {
		var txtpass = $scope.registrationForm.password;
		var desc = new Array();
		desc[0] = "Very Weak";
		desc[1] = "Weak";
		desc[2] = "Better";
		desc[3] = "Medium";
		desc[4] = "Strong";
		desc[5] = "Strongest";
		var meter = document.getElementById("meter");
		var score = 0;
		document.getElementById("meter").innerHTML = "";
		// if txtpass bigger than 6 give 1 point
		if (txtpass.length > 6) {
			$("#meter").animate({}, 300);

			score++;
		}

		// if txtpass has both lower and uppercase characters give 1 point
		if ((txtpass.match(/[a-z]/)) && (txtpass.match(/[A-Z]/))) {
			$("#meter").animate({}, 300);
			score++;
		}

		// if txtpass has at least one number give 1 point
		if (txtpass.match(/\d+/)) {
			$("#meter").animate({}, 300);
			score++;
		}

		// if txtpass has at least one special caracther give 1 point
		if (txtpass.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) {
			$("#meter").animate({}, 300);
			score++;
		}

		// if txtpass bigger than 12 give another 1 point
		if (txtpass.length > 12)
			$("#meter").animate({}, 400);
		score++;

		meter.innerHTML = desc[score];

		if (txtpass.length < 6) {
			// errorMsg.innerHTML = "Password Should be Minimum 6 Characters"
			// errorMsg.className = "errorclass"
		}
	};

	
	
	/* For login form on register page - code starts here */
	
	$('#invalidCredentialsMsgReg').hide();
	$('#enterCredentialsMsgReg').hide();
	
    $scope.secureLoginOnReg = function(){
    	if($scope.emailId == undefined || $scope.password == undefined){
    		$('#enterCredentialsMsgReg').show();
    	}else{
    		$('#enterCredentialsMsgReg').hide();
	    	var dataObj = {
	    		emailId : $scope.emailId,
				password : $scope.password
			};
			var res = $http.post('loginReg', dataObj);
			res.success(function(data, status, headers, config) {
				console.log('Login Check '+data.login);
				if(data.login == true){
					$('#invalidCredentialsMsgReg').hide();
					$('#loginInfo').html('<ul><li><a href="#">Hello, ' + data.user + '</a></li><li><a href="logout">Logout</a></li></ul>');
					$('#header_goalSummary').removeClass('hide');
					if(data.view == "home"){
						$location.path('/homeContent');
					}else{
						$location.path('/goalSummary');
					}
				}else{
					$('#invalidCredentialsMsgReg').show();
				}
			});
			res.error(function(data, status, headers, config) {
				console.log( "failure message: " + JSON.stringify({data: data}));
			});
		}
    };
});

/**
 * $(document).ready(function() {
	$('#submitForm').attr('disabled', 'disabled');
	$('#duplicateUsernameError').hide();
	$('#passwordMisMatchError').hide();
});

function checkDuplicateEmailID() {
	var emailID = $('#emailId').val();
	var data = {
		emailId : emailID
	};

	$.ajax({
		type : "POST",
		contentType : "application/json; charset=utf-8",
		url : "checkDuplicateUsername",
		async : false,
		data : JSON.stringify(data),
		success : function(response) {
			if (response == "SUCCESS") {
				$('#submitForm').removeAttr('disabled');
				$('#duplicateUsernameError').hide();
			} else {
				$('#submitForm').attr('disabled', 'disabled');
				$('#duplicateUsernameError').show();
			}
		},
		error : function(e) {
			console.log(e);
		}
	});
}

function goToHome() {
	window.location = appUrl;
}


 * 
 */
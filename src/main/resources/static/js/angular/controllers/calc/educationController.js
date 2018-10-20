routerApp.controller('educationController', function($scope, $http, $location, $window, $stateParams,loginService) {

	$('#navigatorMain .active').removeClass('active');
	$("#education").addClass("active");
	$("#calculators").addClass("active");

	$('#rootwizard').bootstrapWizard({'nextSelector': '.button-next', 'previousSelector': '.button-previous'});	
	window.prettyPrint && prettyPrint();

	$scope.goalIDValue = $stateParams.goalID;
	$scope.educationPlanner = {};
	$scope.educationPlanner.currentCostOfEducation = 1800000;
	$scope.educationPlanner.id = $scope.goalIDValue;
	$scope.educationPlanner.calculatorType = "a9be17b3-902a-4c9f-a4a4-c65f0802628f";
	$scope.educationPlanner.userID = $('#userID').val();
	$scope.educationPlanner.goalName = "";		
	$scope.educationPlanner.currentAge = 3;
	$scope.educationPlanner.educationStartAge = 18; 
	$scope.educationPlanner.inflationInCostOfEducation = 8;
	$scope.educationPlanner.educationExpensesMonthly = 0;
	$scope.educationPlanner.returnExpectedOnInvestment = 1;
	$scope.riskCategoryList;
	$('#riskCategory').val($scope.educationPlanner.returnExpectedOnInvestment);
	
	var roiManualSetFlg = true;
	
	$('#currentAge').val($scope.educationPlanner.currentAge);
	$('#educationStartAge').val($scope.educationPlanner.educationStartAge);
	$('#inflationInCostOfEducation').val($scope.educationPlanner.inflationInCostOfEducation);

	$scope.rangeChangeCurrentAge = function(obj){ 
		$scope.educationPlanner.currentAge  = obj.from;
		$('#currentAge').val(obj.from); 
		$scope.processDataForEducation();
	};

	$scope.rangeChangeEducationStartAge = function(obj){
		$scope.educationPlanner.educationStartAge  = obj.from;
		$('#educationStartAge').val(obj.from); 
		$scope.processDataForEducation();
	};

	$scope.rangeChangeInflationCostOfEducation = function(obj){
		$scope.educationPlanner.inflationInCostOfEducation = obj.from;
		$('#inflationInCostOfEducation').val(obj.from);
		$scope.processDataForEducation();
	};

	$scope.loadRiskCategory = function(){
		var url = webserviceURL['riskCategoryList'];
		var webServiceResponse = getAjaxJSON($http, url);
		webServiceResponse.success(function(response) {
			$scope.riskCategoryList = response;
		});
	};
	
	$scope.loadRiskCategory();
	
	$scope.initializeCalculator = function(){
		if($scope.goalIDValue != null && $scope.goalIDValue != ""){
			var url = webserviceURL['goal'] + "/" + $scope.goalIDValue;
			var webServiceResponse = getCachedAjaxJSON($http, url, true);
			webServiceResponse.success(function(res){
				$scope.educationPlanner.currentCostOfEducation = res.currentCostOfEducation;
				$scope.educationPlanner.id = res.id;
				$scope.educationPlanner.calculatorType = res.calculatorType;
				$scope.educationPlanner.goalName = res.goalName;		
				$scope.educationPlanner.currentAge = res.currentAge;
				$scope.educationPlanner.educationStartAge = res.educationStartAge; 
				$scope.educationPlanner.inflationInCostOfEducation = res.inflationInCostOfEducation;
				$scope.educationPlanner.returnExpectedOnInvestment = res.returnExpectedOnInvestment;
				$scope.educationPlanner.userID = res.userID;
				
				$('#submitFormUpdateGoal').removeClass('hide');
				$('#submitFormSaveGoal').addClass('hide');
				
				$('#riskCategory').val($scope.educationPlanner.returnExpectedOnInvestment);
				roiManualSetFlg = false;
			});
	
			webServiceResponse.error(function(data){
				logMessageAndData("INTERNAL SERVER ERROR OCCURED",data);
			});
		}
	};
	
	$scope.initializeCalculator();
	

	$scope.defineROI = function(ageDiff){
		var j=0;
		var riskCategoryObj = $scope.riskCategoryList;
		for(j=0; j<riskCategoryObj.length ; j++){
			var obj = riskCategoryObj[j];
			if(ageDiff > obj.from && ageDiff <= obj.to){
				$scope.educationPlanner.returnExpectedOnInvestment = obj.value;
				$('#riskCategory').val($scope.educationPlanner.returnExpectedOnInvestment);
				break;
			}
		}
	};
	
	$scope.changeROI = function(){
		var value = $("#riskCategory option:selected").attr("value");
		$scope.educationPlanner.returnExpectedOnInvestment = value;
		$('#riskCategory').val($scope.educationPlanner.returnExpectedOnInvestment);
		roiManualSetFlg = false;
		$scope.processDataForEducation();
	};
	
	
	$scope.processDataForEducation = function(){
		var currentAge = $scope.educationPlanner.currentAge;
		var educationStartAge = $scope.educationPlanner.educationStartAge;
		var currentCostOfEducation = $scope.educationPlanner.currentCostOfEducation;
		var inflationInCostOfEducation = ($scope.educationPlanner.inflationInCostOfEducation)/100;
		
		var educationCorpusRequired = 0;
		var monthlyInvestmentRequired = 0;
		var yearlyInvestmentRequired = 0;
		var tmp = 0;
		var ageDifference = parseFloat(educationStartAge - currentAge);
		
		if($scope.riskCategoryList != undefined && roiManualSetFlg == true){
			$scope.defineROI(ageDifference);
		};
		
		var returnExpectedOnInvestment = ($scope.educationPlanner.returnExpectedOnInvestment)/100;
		
		if(!isNaN(currentCostOfEducation) && !isNaN(inflationInCostOfEducation)){
			$scope.educationPlanner.educationExpensesMonthly = currentCostOfEducation * Math.pow( (1 + inflationInCostOfEducation), (ageDifference));
		}else{
			$scope.educationPlanner.educationExpensesMonthly = 0;
		}
		tmp = $scope.educationPlanner.educationExpensesMonthly;
		
		/* Calculate Education Corpus Required */
		var temp1 = parseFloat( 1 + (parseFloat(inflationInCostOfEducation)));
		var temp2 = Math.pow(parseFloat(temp1), parseFloat(ageDifference));
		educationCorpusRequired = parseFloat(currentCostOfEducation * parseFloat(temp2));
		$('#educationCorpusRequired').val(educationCorpusRequired.format(2));

		/* Calculate Monthly Investment Requirement */
		var temp3 = parseFloat(Math.pow((1+returnExpectedOnInvestment), (ageDifference))) - 1;
		monthlyInvestmentRequired = parseFloat(educationCorpusRequired * (returnExpectedOnInvestment / temp3))/12;
		$('#monthlyInvestmentRequired').val(monthlyInvestmentRequired.format(2));
		
		/* Calculate Yearly Investment Requirement */
		yearlyInvestmentRequired = parseFloat(monthlyInvestmentRequired) * 12;
		$('#yearlyInvestmentRequired').val(yearlyInvestmentRequired.format(2));
		
		$('#educationExpensesMonthly').html(tmp.format(0));
		$('#educationCorpusRequired').html('<i class="fa fa-inr"></i> '+educationCorpusRequired.format(0));
		$('#monthlyInvestmentRequired').html('<i class="fa fa-inr"></i> '+monthlyInvestmentRequired.format(0));
		$('#yearlyInvestmentRequired').html('<i class="fa fa-inr"></i> '+yearlyInvestmentRequired.format(0));
		
		//Draw Chart
		var lineChartData = [];
		var lineChartLabels = [];
		var i = 0;
		var tmp1 = (1 + returnExpectedOnInvestment);
		var divideFactor = 100000;
		
		var fixedAmount = parseFloat(yearlyInvestmentRequired);
		var previousValue = parseFloat(yearlyInvestmentRequired);
		lineChartData.push((previousValue/divideFactor).toFixed(2) * 1);
		lineChartLabels.push(i);
		
		for(var i=1; i<ageDifference; i++){
			previousValue = (((previousValue * tmp1) + fixedAmount)) * 1;
			lineChartLabels.push(i);
			lineChartData.push((previousValue/divideFactor).toFixed(2) * 1);
		}
		$scope.labels = lineChartLabels;
		$scope.series = ['Years'];
		$scope.data = [lineChartData];
    };

    
	$scope.submitForm = function(){
		var goalName = $scope.educationPlanner.goalName;
		if(null == goalName || '' == goalName){
			$('#goalName').addClass('erroralert');
			return false;
		}
		
		var formdata = $.param($scope.educationPlanner);
		var url = webserviceURL['saveEducationGoal'];
		var response = postAjax($http, url, formdata);
		response.success(function(data, status, headers, config) {
			if(data.view == "register"){
				$location.path('/register');
			}else if(data.view == "summary"){
				$location.path('/goalSummary');
			}
	    });
	    response.error(function(data, status, headers, config) {
	        alert("Error - Please try later");
	    });
	};

	$scope.resetField = function(field1, field2){
		$('#'+field1).val('');
		$('#'+field2).text('0.00');
		$scope.educationPlanner.currentCostOfEducation = 0;
		$scope.processDataForEducation();
	};
	
});
routerApp.controller('vacationController', function($scope, $http, $location, $window, $stateParams,loginService) {

	$('#navigatorMain .active').removeClass('active');
	$("#vacation").addClass("active");
	$("#calculators").addClass("active");

	$('#rootwizard').bootstrapWizard({'nextSelector': '.button-next', 'previousSelector': '.button-previous'});	
	window.prettyPrint && prettyPrint();

	$scope.goalIDValue = $stateParams.goalID;
	$scope.vacationPlanner = {};
	$scope.vacationPlanner.currentCost = 500000;
	$scope.vacationPlanner.id = $scope.goalIDValue;
	$scope.vacationPlanner.calculatorType = "e306acb4-af52-4216-968c-cec2266d6134";
	$scope.vacationPlanner.userID = $('#userID').val();
	$scope.vacationPlanner.goalName = "";		
	$scope.vacationPlanner.yearForVacation = 5;
	$scope.vacationPlanner.inflationRate = 3;
	$scope.vacationPlanner.vacationFutureCost = 0;
	$scope.vacationPlanner.returnExpectedOnInvestment = 1;
	$scope.riskCategoryList;
	$('#riskCategory').val($scope.vacationPlanner.returnExpectedOnInvestment);
	
	var roiManualSetFlg = true;
	
	$('#yearForVacation').val($scope.vacationPlanner.yearForVacation);
	$('#inflationRate').val($scope.vacationPlanner.inflationRate);

	$scope.rangeChangeYearsToVacation = function(obj){ 
		$scope.vacationPlanner.yearForVacation  = obj.from;
		$('#yearForVacation').val(obj.from); 
		$scope.processDataForVacation();
	};

	$scope.rangeChangeInflationRate = function(obj){
		$scope.vacationPlanner.inflationRate = obj.from;
		$('#inflationRate').val(obj.from);
		$scope.processDataForVacation();
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
				$scope.vacationPlanner.currentCost = res.currentCost;
				$scope.vacationPlanner.id = res.id;
				$scope.vacationPlanner.calculatorType = res.calculatorType;
				$scope.vacationPlanner.goalName = res.goalName;		
				$scope.vacationPlanner.yearForVacation = res.yearsToVacation;
				$scope.vacationPlanner.inflationRate = res.inflationRate;
				$scope.vacationPlanner.returnExpectedOnInvestment = res.returnExpectedOnInvestment;
				$scope.vacationPlanner.userID = res.userID;
				
				$('#submitFormUpdateGoal').removeClass('hide');
				$('#submitFormSaveGoal').addClass('hide');
				
				$('#riskCategory').val($scope.vacationPlanner.returnExpectedOnInvestment);
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
				$scope.vacationPlanner.returnExpectedOnInvestment = obj.value;
				$('#riskCategory').val($scope.vacationPlanner.returnExpectedOnInvestment);
				break;
			}
		}
	};
	
	$scope.changeROI = function(){
		var value = $("#riskCategory option:selected").attr("value");
		$scope.vacationPlanner.returnExpectedOnInvestment = value;
		$('#riskCategory').val($scope.vacationPlanner.returnExpectedOnInvestment);
		roiManualSetFlg = false;
		$scope.processDataForVacation();
	};
	
	
	
	$scope.processDataForVacation = function(){
		var yearForVacation = $scope.vacationPlanner.yearForVacation;
		var currentCost = $scope.vacationPlanner.currentCost;
		var inflationRate = ($scope.vacationPlanner.inflationRate)/100;
		
		var vacationCorpusRequired = 0;
		var monthlyInvestmentRequired = 0;
		var yearlyInvestmentRequired = 0;
		var tmp = 0;
		var ageDifference =  yearForVacation;

		if($scope.riskCategoryList != undefined && roiManualSetFlg == true){
			$scope.defineROI(ageDifference);
		};

		var returnExpectedOnInvestment = ($scope.vacationPlanner.returnExpectedOnInvestment)/100;
		
		if(!isNaN(currentCost) && !isNaN(inflationRate)){
			$scope.vacationPlanner.vacationFutureCost = currentCost * Math.pow( (1 + inflationRate), (ageDifference));
		}else{
			$scope.vacationPlanner.vacationFutureCost = 0;
		}
		tmp = $scope.vacationPlanner.vacationFutureCost;

		/* Calculate Vacation Corpus Required */
		var temp1 = parseFloat( 1 + (parseFloat(inflationRate)));
		var temp2 = Math.pow(parseFloat(temp1), parseFloat(ageDifference));
		vacationCorpusRequired = parseFloat(currentCost * parseFloat(temp2));
		$('#vacationCorpusRequired').val(vacationCorpusRequired.format(2));
		
		console.log("vacationCorpusRequired : "+vacationCorpusRequired);

		/* Calculate Monthly Investment Requirement */
		var temp3 = parseFloat(Math.pow((1+returnExpectedOnInvestment), (ageDifference))) - 1;
		monthlyInvestmentRequired = parseFloat(vacationCorpusRequired * (returnExpectedOnInvestment / temp3))/12;
		$('#monthlyInvestmentRequired').val(monthlyInvestmentRequired.format(2));
		
		console.log("returnExpectedOnInvestment : "+returnExpectedOnInvestment);
		console.log("temp3 : "+temp3);
		console.log("monthlyInvestmentRequired : "+monthlyInvestmentRequired);
		
		/* Calculate Yearly Investment Requirement */
		yearlyInvestmentRequired = parseFloat(monthlyInvestmentRequired) * 12;
		$('#yearlyInvestmentRequired').val(yearlyInvestmentRequired.format(2));
		
		console.log("yearlyInvestmentRequired : "+yearlyInvestmentRequired);
		
		$('#vacationFutureCost').html(tmp.format(0));
		$('#vacationCorpusRequired').html('<i class="fa fa-inr"></i> '+vacationCorpusRequired.format(0));
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

	
	$scope.updateCurrentCost = function() {
		var ageDiff =  parseFloat($scope.vacationPlanner.yearForVacation);
		if(!isNaN($scope.vacationPlanner.currentCost) && !isNaN($scope.vacationPlanner.inflationRate)){
			$scope.vacationPlanner.vacationFutureCost = $scope.vacationPlanner.currentCost * Math.pow( (1+$scope.vacationPlanner.inflationRate), (ageDiff));
		}else{
			$scope.vacationPlanner.vacationFutureCost = 0;
		}
		var expenses = $scope.vacationPlanner.vacationFutureCost;
		document.getElementById("vacationFutureCost").innerHTML = parseFloat(expenses.format(2));
	};


	$scope.submitForm = function(){
		var goalName = $scope.vacationPlanner.goalName;
		if(null == goalName || '' == goalName){
			$('#goalName').addClass('erroralert');
			return false;
		}
		var formData = $.param($scope.vacationPlanner);
		console.log(formData);
		var formSaveUrl = webserviceURL['saveVacationGoal'];
		
		var webserviceResponse = postAjax($http, formSaveUrl, formData);
		webserviceResponse.success(function(data, status, headers, config) {
			if(data.view == "register"){
				$location.path('/register');
			}else if(data.view == "summary"){
				$location.path('/goalSummary');
			}
	    });
		webserviceResponse.error(function(data, status, headers, config) {
	        alert("Error - Please try later");
	    });
	};

	$scope.resetField = function(field1, field2){
		$('#'+field1).val('');
		$('#'+field2).text('0.00');
		$scope.vacationPlanner.vacationFutureCost = 0;
		$scope.processDataForVacation();
	};

});
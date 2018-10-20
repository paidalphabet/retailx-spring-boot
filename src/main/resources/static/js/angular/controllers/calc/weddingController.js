routerApp.controller('weddingController', function($scope, $http, $location, $window, $stateParams,loginService) {

	$('#navigatorMain .active').removeClass('active');
	$("#wedding").addClass("active");
	$("#calculators").addClass("active");

	$('#rootwizard').bootstrapWizard({'nextSelector': '.button-next', 'previousSelector': '.button-previous'});	
	window.prettyPrint && prettyPrint();

	$scope.goalIDValue = $stateParams.goalID;
	$scope.weddingPlanner = {};
	$scope.weddingPlanner.currentCost = 1800000;
	$scope.weddingPlanner.id = $scope.goalIDValue;
	$scope.weddingPlanner.calculatorType = "8f0e0e3a-93a8-4475-b6cd-aa551caa6895";
	$scope.weddingPlanner.userID = $('#userID').val();
	$scope.weddingPlanner.goalName = "";		
	$scope.weddingPlanner.currentAge = 4;
	$scope.weddingPlanner.maturityAge = 25; 
	$scope.weddingPlanner.inflationRate = 8;
	$scope.weddingPlanner.weddingFutExp = 0;
	$scope.weddingPlanner.returnExpectedOnInvestment = 1;
	$scope.riskCategoryList;
	$('#riskCategory').val($scope.weddingPlanner.returnExpectedOnInvestment);
	
	var roiManualSetFlg = true;
	
	$('#currentAge').val($scope.weddingPlanner.currentAge);
	$('#maturityAge').val($scope.weddingPlanner.maturityAge);
	$('#inflationRate').val($scope.weddingPlanner.inflationRate);

	$scope.rangeChangeCurrentAge = function(obj){ 
		$scope.weddingPlanner.currentAge  = obj.from;
		$('#currentAge').val(obj.from); 
		$scope.processDataForWedding();
	};

	$scope.rangeChangeMaturityAge = function(obj){
		$scope.weddingPlanner.maturityAge  = obj.from;
		$('#maturityAge').val(obj.from); 
		$scope.processDataForWedding();
	};

	$scope.rangeChangeInflationRate = function(obj){
		$scope.weddingPlanner.inflationRate = obj.from;
		$('#inflationRate').val(obj.from);
		$scope.processDataForWedding();
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
				$scope.weddingPlanner.currentCost = res.currentCost;
				$scope.weddingPlanner.id = res.id;
				$scope.weddingPlanner.calculatorType = res.calculatorType;
				$scope.weddingPlanner.goalName = res.goalName;		
				$scope.weddingPlanner.currentAge = res.currentAge;
				$scope.weddingPlanner.maturityAge = res.maturityAge; 
				$scope.weddingPlanner.inflationRate = res.inflationRate;
				$scope.weddingPlanner.returnExpectedOnInvestment = res.returnExpectedOnInvestment;
				$scope.weddingPlanner.userID = res.userID;
				
				$('#submitFormUpdateGoal').removeClass('hide');
				$('#submitFormSaveGoal').addClass('hide');
				
				$('#riskCategory').val($scope.weddingPlanner.returnExpectedOnInvestment);
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
				$scope.weddingPlanner.returnExpectedOnInvestment = obj.value;
				$('#riskCategory').val($scope.weddingPlanner.returnExpectedOnInvestment);
				break;
			}
		}
	};
	
	$scope.changeROI = function(){
		var value = $("#riskCategory option:selected").attr("value");
		$scope.weddingPlanner.returnExpectedOnInvestment = value;
		$('#riskCategory').val($scope.weddingPlanner.returnExpectedOnInvestment);
		roiManualSetFlg = false;
		$scope.processDataForWedding();
	};
	
	
	
	$scope.processDataForWedding = function(){

		var currentAge = $scope.weddingPlanner.currentAge;
		var maturityAge = $scope.weddingPlanner.maturityAge;
		var currentCost = $scope.weddingPlanner.currentCost;
		var inflationRate = ($scope.weddingPlanner.inflationRate)/100;
		
		var weddingCorpusRequired = 0;
		var monthlyInvestmentRequired = 0;
		var yearlyInvestmentRequired = 0;
		var tmp = 0;
		var ageDifference = parseFloat(maturityAge - currentAge);

		if($scope.riskCategoryList != undefined && roiManualSetFlg == true){
			$scope.defineROI(ageDifference);
		};
		
		var returnExpectedOnInvestment = ($scope.weddingPlanner.returnExpectedOnInvestment)/100;
		
		if(!isNaN(currentCost) && !isNaN(inflationRate)){
			$scope.weddingPlanner.weddingFutExp = currentCost * Math.pow( (1 + inflationRate), (ageDifference));
		}else{
			$scope.weddingPlanner.weddingFutExp = 0;
		}
		tmp = $scope.weddingPlanner.weddingFutExp;

		/* Calculate Wedding Corpus Required */
		var temp1 = parseFloat( 1 + (parseFloat(inflationRate)));
		var temp2 = Math.pow(parseFloat(temp1), parseFloat(ageDifference));
		weddingCorpusRequired = parseFloat(currentCost * parseFloat(temp2));
		$('#weddingCorpusRequired').val(weddingCorpusRequired.format(2));

		/* Calculate Monthly Investment Requirement */
		var temp3 = parseFloat(Math.pow((1+returnExpectedOnInvestment), (ageDifference))) - 1;
		monthlyInvestmentRequired = parseFloat(weddingCorpusRequired * (returnExpectedOnInvestment / temp3))/12;
		$('#monthlyInvestmentRequired').val(monthlyInvestmentRequired.format(2));
		
		/* Calculate Yearly Investment Requirement */
		yearlyInvestmentRequired = parseFloat(monthlyInvestmentRequired) * 12;
		$('#yearlyInvestmentRequired').val(yearlyInvestmentRequired.format(2));
		
		$('#weddingFutExp').html(tmp.format(0));
		$('#weddingCorpusRequired').html('<i class="fa fa-inr"></i> '+weddingCorpusRequired.format(0));
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
		var goalName = $scope.weddingPlanner.goalName;
		if(null == goalName || '' == goalName){
			$('#goalName').addClass('erroralert');
			return false;
		}
		var formData = $.param($scope.weddingPlanner);
		console.log(formData);
		var formSaveUrl = webserviceURL['saveWeddingGoal'];
		
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
		$scope.weddingPlanner.currentCost = 0;
		$scope.processDataForWedding();
	};

});
routerApp.controller('carPurchaseController', function($scope, $http, $location, $window, $stateParams,loginService) {

	$('#navigatorMain .active').removeClass('active');
	$("#car").addClass("active");
	$("#calculators").addClass("active");

	$('#rootwizard').bootstrapWizard({'nextSelector': '.button-next', 'previousSelector': '.button-previous'});	
	window.prettyPrint && prettyPrint();

	$scope.goalIDValue = $stateParams.goalID;
	$scope.carPurchasePlanner = {};
	$scope.carPurchasePlanner.currentCost = 1800000;
	$scope.carPurchasePlanner.id = $scope.goalIDValue;
	$scope.carPurchasePlanner.calculatorType = "d619ea0c-5c30-472d-b5f4-c0c08850786f";
	$scope.carPurchasePlanner.userID = $('#userID').val();
	$scope.carPurchasePlanner.goalName = "";		
	$scope.carPurchasePlanner.yearsWantDreamCar = 5;
	$scope.carPurchasePlanner.inflationRate = 3;
	$scope.carPurchasePlanner.carFuturePrice = 0;
	$scope.carPurchasePlanner.returnExpectedOnInvestment = 1;
	$scope.riskCategoryList;
	$('#riskCategory').val($scope.carPurchasePlanner.returnExpectedOnInvestment);
	
	var roiManualSetFlg = true;
	
	$('#yearsWantDreamCar').val($scope.carPurchasePlanner.yearsWantDreamCar);
	$('#inflationRate').val($scope.carPurchasePlanner.inflationRate);

	$scope.rangeChangeYearsWantDreamCar = function(obj){ 
		$scope.carPurchasePlanner.yearsWantDreamCar  = obj.from;
		$('#yearsWantDreamCar').val(obj.from); 
		$scope.processDataForCarPurchase();
	};

	$scope.rangeChangeInflationRate = function(obj){
		$scope.carPurchasePlanner.inflationRate = obj.from;
		$('#inflationRate').val(obj.from);
		$scope.processDataForCarPurchase();
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
				$scope.carPurchasePlanner.currentCost = res.currentCost;
				$scope.carPurchasePlanner.id = res.id;
				$scope.carPurchasePlanner.calculatorType = res.calculatorType;
				$scope.carPurchasePlanner.goalName = res.goalName;		
				$scope.carPurchasePlanner.yearsWantDreamCar = res.yearsWantDreamCar;
				$scope.carPurchasePlanner.inflationRate = res.inflationRate;
				$scope.carPurchasePlanner.returnExpectedOnInvestment = res.returnExpectedOnInvestment;
				$scope.carPurchasePlanner.userID = res.userID;
				
				$('#submitFormUpdateGoal').removeClass('hide');
				$('#submitFormSaveGoal').addClass('hide');
				
				$('#riskCategory').val($scope.carPurchasePlanner.returnExpectedOnInvestment);
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
				$scope.carPurchasePlanner.returnExpectedOnInvestment = obj.value;
				$('#riskCategory').val($scope.carPurchasePlanner.returnExpectedOnInvestment);
				break;
			}
		}
	};
	
	$scope.changeROI = function(){
		var value = $("#riskCategory option:selected").attr("value");
		$scope.carPurchasePlanner.returnExpectedOnInvestment = value;
		$('#riskCategory').val($scope.carPurchasePlanner.returnExpectedOnInvestment);
		roiManualSetFlg = false;
		$scope.processDataForCarPurchase();
	};
	
	
	
	$scope.processDataForCarPurchase = function(){
		var yearsWantDreamCar = $scope.carPurchasePlanner.yearsWantDreamCar;
		var currentCost = $scope.carPurchasePlanner.currentCost;
		var inflationRate = ($scope.carPurchasePlanner.inflationRate)/100;
		
		var carCorpusRequired = 0;
		var monthlyInvestmentRequired = 0;
		var yearlyInvestmentRequired = 0;
		var tmp = 0;
		var ageDifference =  yearsWantDreamCar;

		if($scope.riskCategoryList != undefined && roiManualSetFlg == true){
			$scope.defineROI(ageDifference);
		};

		var returnExpectedOnInvestment = ($scope.carPurchasePlanner.returnExpectedOnInvestment)/100;
		
		if(!isNaN(currentCost) && !isNaN(inflationRate)){
			$scope.carPurchasePlanner.carFuturePrice = currentCost * Math.pow( (1 + inflationRate), (ageDifference));
		}else{
			$scope.carPurchasePlanner.carFuturePrice = 0;
		}
		tmp = $scope.carPurchasePlanner.carFuturePrice;

		/* Calculate car Corpus Required */
		var temp1 = parseFloat( 1 + (parseFloat(inflationRate)));
		var temp2 = Math.pow(parseFloat(temp1), parseFloat(ageDifference));
		carCorpusRequired = parseFloat(currentCost * parseFloat(temp2));
		$('#carCorpusRequired').val(carCorpusRequired.format(2));

		/* Calculate Monthly Investment Requirement */
		var temp3 = parseFloat(Math.pow((1+returnExpectedOnInvestment), (ageDifference))) - 1;
		monthlyInvestmentRequired = parseFloat(carCorpusRequired * (returnExpectedOnInvestment / temp3))/12;
		$('#monthlyInvestmentRequired').val(monthlyInvestmentRequired.format(2));
		
		/* Calculate Yearly Investment Requirement */
		yearlyInvestmentRequired = parseFloat(monthlyInvestmentRequired) * 12;
		$('#yearlyInvestmentRequired').val(yearlyInvestmentRequired.format(2));
		
		$('#carFuturePrice').html(tmp.format(0));
		$('#carCorpusRequired').html('<i class="fa fa-inr"></i> '+carCorpusRequired.format(0));
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
		var ageDiff =  parseFloat($scope.carPurchasePlanner.yearsWantDreamCar);
		if(!isNaN($scope.carPurchasePlanner.currentCost) && !isNaN($scope.carPurchasePlanner.inflationRate)){
			$scope.carPurchasePlanner.carFuturePrice = $scope.carPurchasePlanner.currentCost * Math.pow( (1+$scope.carPurchasePlanner.inflationRate), (ageDiff));
		}else{
			$scope.carPurchasePlanner.carFuturePrice = 0;
		}
		var expenses = $scope.carPurchasePlanner.carFuturePrice;
		document.getElementById("carFuturePrice").innerHTML = parseFloat(expenses.format(2));
	};


	$scope.submitForm = function(){
		var goalName = $scope.carPurchasePlanner.goalName;
		if(null == goalName || '' == goalName){
			$('#goalName').addClass('erroralert');
			return false;
		}
		var formData = $.param($scope.carPurchasePlanner);
		console.log(formData);
		var formSaveUrl = webserviceURL['saveCarPurchaseGoal'];
		
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
		$scope.carPurchasePlanner.carFuturePrice = 0;
		$scope.processDataForCarPurchase();
	};

});
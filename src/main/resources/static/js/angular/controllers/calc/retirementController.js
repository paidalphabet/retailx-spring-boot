routerApp.controller('retirementController', function($scope, $http, $location, $window, $stateParams) {
	
	$('#navigatorMain .active').removeClass('active');
	$("#retirement").addClass("active");
	$("#calculators").addClass("active");
	
	$('#rootwizard').bootstrapWizard({'nextSelector': '.button-next', 'previousSelector': '.button-previous'});	
	window.prettyPrint && prettyPrint();
	
	$scope.goalIDValue = $stateParams.goalID;
	var lineChartData = [];
	var lineChartLabels = [];
	
	$scope.retirementPlanner = {};
	$scope.retirementPlanner.currentAge = 30;
	$scope.retirementPlanner.maturityAge = 60;
	$scope.retirementPlanner.lifeExpectancy = 85;
	$scope.retirementPlanner.foodExp = 10000;
	$scope.retirementPlanner.rentExp = 17000;
	$scope.retirementPlanner.travelExp = 6000;
	$scope.retirementPlanner.entertainmentExp = 5000;
	$scope.retirementPlanner.mallExp = 2500;
	$scope.retirementPlanner.otherExp = 3000;
	$scope.retirementPlanner.postRetSavingsRate = 3;
	$scope.retirementPlanner.postRetInflationMonthlyExp = 4;
	$scope.retirementPlanner.inflationRateInExp = 0;
	$scope.retirementPlanner.currentMonthlyExp = 0;
	$scope.retirementPlanner.calculatorType = "afcc52cd-5f72-47a4-b727-c8f79a0dde22";
	$scope.retirementPlanner.userID = $('#userID').val();
	$scope.retirementPlanner.goalName;
	$scope.retirementPlanner.other = "Utilities";
	$scope.retirementPlanner.foodInflSlider = 8;
	$scope.retirementPlanner.rentInflSlider = 5;
	$scope.retirementPlanner.travelInflSlider = 4;
	$scope.retirementPlanner.entertainmentInflSlider = 7;
	$scope.retirementPlanner.mallInflSlider = 6;
	$scope.retirementPlanner.otherInflSlider = 3;
	$scope.retirementPlanner.id = $scope.goalIDValue;
	$scope.riskCategoryList;
	$scope.retirementPlanner.returnExpectedOnInvestmentAmount = 1;
	$('#riskCategory').val($scope.retirementPlanner.returnExpectedOnInvestmentAmount);
	
	var roiManualSetFlg = true;
	
	$('#currentAge').val($scope.retirementPlanner.currentAge);
	$('#maturityAge').val($scope.retirementPlanner.maturityAge);
	$('#lifeExpectancy').val($scope.retirementPlanner.lifeExpectancy);
	$('#foodInflSlider').val($scope.retirementPlanner.foodInflSlider);
	$('#rentInflSlider').val($scope.retirementPlanner.rentInflSlider);
	$('#travelInflSlider').val($scope.retirementPlanner.travelInflSlider);
	$('#entertainmentInflSlider').val($scope.retirementPlanner.entertainmentInflSlider);
	$('#mallInflSlider').val($scope.retirementPlanner.mallInflSlider);
	$('#otherInflSlider').val($scope.retirementPlanner.otherInflSlider);
	$('#postRetInflationMonthlyExp').val($scope.retirementPlanner.postRetInflationMonthlyExp);
	
	$scope.rangeChangeCurrentAge = function(obj){ $scope.retirementPlanner.currentAge = obj.from; $('#currentAge').val(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeMaturityAge = function(obj){ $scope.retirementPlanner.maturityAge = obj.from; $('#maturityAge').val(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeLifeExpectancy = function(obj){ $scope.retirementPlanner.lifeExpectancy = obj.from; $('#lifeExpectancy').val(obj.from); $('#lifeExpectancyDisp').text(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeFoodInflSlider = function(obj){ $scope.retirementPlanner.foodInflSlider = obj.from; $('#foodInflSlider').val(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeRentInflSlider = function(obj){ $scope.retirementPlanner.rentInflSlider = obj.from; $('#rentInflSlider').val(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeTravelInflSlider = function(obj){ $scope.retirementPlanner.travelInflSlider = obj.from; $('#travelInflSlider').val(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeEntertainmentInflSlider = function(obj){ $scope.retirementPlanner.entertainmentInflSlider = obj.from; $('#entertainmentInflSlider').val(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeMallInflSlider = function(obj){ $scope.retirementPlanner.mallInflSlider = obj.from; $('#mallInflSlider').val(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeOtherInflSlider = function(obj){ $scope.retirementPlanner.otherInflSlider = obj.from; $('#otherInflSlider').val(obj.from); $scope.processRetirementInfo();};
	$scope.rangeChangeInflationRate = function(obj){ $scope.retirementPlanner.postRetInflationMonthlyExp = obj.from; $('#postRetInflationMonthlyExp').val(obj.from); $('#inflationRateDisp').text(obj.from); $scope.processRetirementInfo();};
	
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
			var url = webserviceURL['getGoalObjectDetails'] + "/" + $scope.goalIDValue;
			var webServiceResponse = getAjaxJSON($http, url);
			webServiceResponse.success(function(res) {
				if(res=="NF"){
					console.log('Record Not Found');
				}else{
					$scope.retirementPlanner.foodExp = res.foodExp;
					$scope.retirementPlanner.rentExp = res.rentExp;
					$scope.retirementPlanner.travelExp = res.travelExp;
					$scope.retirementPlanner.entertainmentExp = res.entertainmentExp;
					$scope.retirementPlanner.mallExp = res.mallExp;
					$scope.retirementPlanner.otherExp = res.otherExp;
					$scope.retirementPlanner.other = res.other;
					
					$scope.retirementPlanner.foodInflSlider = res.foodInflSlider;
					$scope.retirementPlanner.rentInflSlider = res.rentInflSlider;
					$scope.retirementPlanner.travelInflSlider = res.travelInflSlider;
					$scope.retirementPlanner.entertainmentInflSlider = res.entertainmentInflSlider;
					$scope.retirementPlanner.mallInflSlider = res.mallInflSlider;
					$scope.retirementPlanner.otherInflSlider = res.otherInflSlider;
					
					$scope.retirementPlanner.currentAge = res.currentAge;
					$scope.retirementPlanner.maturityAge = res.maturityAge;
					$scope.retirementPlanner.lifeExpectancy = res.lifeExpectancy;
					
					$scope.retirementPlanner.goalName = res.goalName;
					$scope.retirementPlanner.returnExpectedOnInvestmentAmount = res.returnExpectedOnInvestment;
					$scope.retirementPlanner.postRetInflationMonthlyExp = res.postRetInflationMonthlyExp;
					$scope.retirementPlanner.postRetSavingsRate = res.postRetSavingsRate;
					
					$scope.retirementPlanner.inflationRateInExp = res.inflationRateInExp;
					$scope.retirementPlanner.currentMonthlyExp = res.currentMonthlyExp;
					$scope.retirementPlanner.userID = res.userID;
					$scope.retirementPlanner.id = res.id;
					
					$('#currentAge').val($scope.retirementPlanner.currentAge);
					$('#maturityAge').val($scope.retirementPlanner.maturityAge);
					$('#lifeExpectancy').val($scope.retirementPlanner.lifeExpectancy);
					$('#foodInflSlider').val($scope.retirementPlanner.foodInflSlider);
					$('#rentInflSlider').val($scope.retirementPlanner.rentInflSlider);
					$('#travelInflSlider').val($scope.retirementPlanner.travelInflSlider);
					$('#entertainmentInflSlider').val($scope.retirementPlanner.entertainmentInflSlider);
					$('#mallInflSlider').val($scope.retirementPlanner.mallInflSlider);
					$('#otherInflSlider').val($scope.retirementPlanner.otherInflSlider);
					
					$('#riskCategory').val($scope.retirementPlanner.returnExpectedOnInvestmentAmount);
					roiManualSetFlg = false;
							
					$('#submitFormUpdateGoal').removeClass('hide');
					$('#submitFormSaveGoal').addClass('hide');
				}
			});
		}
	};
	
	$scope.initializeCalculator();

	$scope.saveGoal = function(){
		var goalName = $scope.retirementPlanner.goalName;
		if(null == goalName || '' == goalName){
			$('#goalName').addClass('erroralert');
			return false;
		}
		var formSaveUrl = saveRetirement;
		var returnExpectedOnInvestment = $scope.retirementPlanner.returnExpectedOnInvestmentAmount;
		
		var formData = $.param($scope.retirementPlanner);
		formData = formData +"&returnExpectedOnInvestment="+returnExpectedOnInvestment;

		var response = postAjax($http, formSaveUrl, formData);
		
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
		$scope.processRetirementInfo();
	};
	
	//Set default values
	$('#ageDiff').text($scope.retirementPlanner.maturityAge - $scope.retirementPlanner.currentAge);
	
	
	$scope.defineROI = function(ageDiff){
		var j=0;
		var riskCategoryObj = $scope.riskCategoryList;
		for(j=0; j<riskCategoryObj.length ; j++){
			var obj = riskCategoryObj[j];
			if(ageDiff > obj.from && ageDiff <= obj.to){
				$scope.retirementPlanner.returnExpectedOnInvestmentAmount = obj.value;
				$('#riskCategory').val($scope.retirementPlanner.returnExpectedOnInvestmentAmount);
				break;
			}
		}
	};
	
	$scope.changeROI = function(){
		var value = $("#riskCategory option:selected").attr("value");
		$scope.retirementPlanner.returnExpectedOnInvestmentAmount = value;
		$('#riskCategory').val($scope.retirementPlanner.returnExpectedOnInvestmentAmount);
		roiManualSetFlg = false;
		$scope.processRetirementInfo();
	};
	
	$scope.processRetirementInfo = function(){
		var foodFutMonthlyExp = 0;
		var rentFutMonthlyExp = 0;
		var travelFutMonthlyExp = 0;
		var entertainmentFutMonthlyExp = 0;
		var mallFutMonthlyExp = 0;
		var otherMonthlyExp = 0;
		var monthlyExpAtRetirement = 0;
		var retirementCorpusRequired = 0;
		var currentYearlyInvestmentRequired = 0;
		var monthlySIP = 0;
		var replacementRatio = parseFloat(0.8);
		
		var lifeExpectancy = (isNaN(parseFloat($('#lifeExpectancy').val()))) ? 0 : parseFloat($('#lifeExpectancy').val());
		var currentAge = (isNaN(parseFloat($('#currentAge').val()))) ? 0 : parseFloat($('#currentAge').val());
		var retirementAge =(isNaN(parseFloat($('#maturityAge').val()))) ? 0 : parseFloat($('#maturityAge').val());
		var ageDiff =  parseFloat(retirementAge - currentAge);
		
		if($scope.riskCategoryList != undefined && roiManualSetFlg == true){
			$scope.defineROI(ageDiff);
		};

		var postRetSavingsRate = (isNaN(parseFloat($('#postRetSavingsRate').val()))) ? 0 : parseFloat($('#postRetSavingsRate').val())/100;
		var postRetInflationMonthlyExp = (isNaN(parseFloat($('#postRetInflationMonthlyExp').val()))) ? 0 : parseFloat($('#postRetInflationMonthlyExp').val())/100;
		var returnExpectedOnInvestmentAmount = ($scope.retirementPlanner.returnExpectedOnInvestmentAmount)/100;
		
		var foodExp = (isNaN(parseFloat($('#foodExp').val()))) ? 0 : parseFloat($('#foodExp').val());
		var foodInfl = (isNaN(parseFloat($('#foodInflSlider').val()))) ? 0 : parseFloat($('#foodInflSlider').val()/100);
		var travelExp = (isNaN(parseFloat($('#travelExp').val()))) ? 0 : parseFloat($('#travelExp').val()); 
		var travelInfl = (isNaN(parseFloat($('#travelInflSlider').val()))) ? 0 : parseFloat($('#travelInflSlider').val()/100);
		var entertainmentExp = (isNaN(parseFloat($('#entertainmentExp').val()))) ? 0 : parseFloat($('#entertainmentExp').val()); 
		var entertainmentInfl = (isNaN(parseFloat($('#entertainmentInflSlider').val()))) ? 0 : parseFloat($('#entertainmentInflSlider').val()/100);
		var rentExp = (isNaN(parseFloat($('#rentExp').val()))) ? 0 : parseFloat($('#rentExp').val()); 
		var rentInfl = (isNaN(parseFloat($('#rentInflSlider').val()))) ? 0 : parseFloat($('#rentInflSlider').val()/100);
		var mallExp = (isNaN(parseFloat($('#mallExp').val()))) ? 0 : parseFloat($('#mallExp').val()); 
		var mallInfl = (isNaN(parseFloat($('#mallInflSlider').val()))) ? 0 : parseFloat($('#mallInflSlider').val()/100);
		var otherExp = (isNaN(parseFloat($('#otherExp').val()))) ? 0 : parseFloat($('#otherExp').val()); 
		var otherInfl = (isNaN(parseFloat($('#otherInflSlider').val()))) ? 0 : parseFloat($('#otherInflSlider').val()/100);
		
		if(!isNaN(foodExp) && !isNaN(foodInfl)){
			foodFutMonthlyExp = foodExp * Math.pow( (1+foodInfl), (ageDiff));
		}else{
			foodFutMonthlyExp = 0;
		}
		
		if(!isNaN(travelExp) && !isNaN(travelInfl)){
			travelFutMonthlyExp = travelExp * Math.pow( (1+travelInfl), (ageDiff));
		}else{
			travelFutMonthlyExp = 0;
		}
		
		if(!isNaN(entertainmentExp) && !isNaN(entertainmentInfl)){
			entertainmentFutMonthlyExp = entertainmentExp * Math.pow( (1+entertainmentInfl), (ageDiff));
		}else{
			entertainmentFutMonthlyExp = 0;
		}
		
		if(!isNaN(rentExp) && !isNaN(rentInfl)){
			rentFutMonthlyExp = rentExp * Math.pow( (1+rentInfl), (ageDiff));
		}else{
			rentFutMonthlyExp = 0;
		}

		if(!isNaN(mallExp) && !isNaN(mallInfl)){
			mallFutMonthlyExp = mallExp * Math.pow( (1+mallInfl), (ageDiff));
		}else{
			mallFutMonthlyExp = 0;
		}
		
		if(!isNaN(otherExp) && !isNaN(otherInfl)){
			otherMonthlyExp = otherExp * Math.pow( (1+otherInfl), (ageDiff));
		}else{
			otherMonthlyExp = 0;
		}
		
		
		var currentMonthlyExp = foodExp + otherExp + travelExp + entertainmentExp + mallExp + rentExp;
		var totalFutMonthlyExp = foodFutMonthlyExp + otherMonthlyExp + travelFutMonthlyExp + entertainmentFutMonthlyExp + mallFutMonthlyExp + rentFutMonthlyExp;
		var totalInfl = (Math.pow((totalFutMonthlyExp/currentMonthlyExp), (1/ageDiff)) - 1);


		/* Calculate monthlyExpAtRetirement*/
		var temp1 = parseFloat( 1 + (parseFloat(totalInfl)) );
		var temp3 = Math.pow(parseFloat(temp1), parseFloat(ageDiff));
		var temp4 = parseFloat(currentMonthlyExp) * temp3;
		monthlyExpAtRetirement = (temp4 * parseFloat(replacementRatio));
		/*
		console.log("totalInfl = "+totalInfl);
		console.log("temp1 = "+temp1);
		console.log("temp3 ="+temp3);
		console.log("temp4 ="+temp4);
		console.log("monthlyExpAtRetirement ="+monthlyExpAtRetirement);
		*/
		/* Calculate retirementCorpusRequired*/
		if(postRetSavingsRate != postRetInflationMonthlyExp){
			retirementCorpusRequired = (monthlyExpAtRetirement * 12 * (1 + postRetInflationMonthlyExp) / (postRetSavingsRate - postRetInflationMonthlyExp) * (1 - (Math.pow(((1 + postRetInflationMonthlyExp) / (1 + postRetSavingsRate)), (lifeExpectancy-retirementAge)))));
		}else{
			retirementCorpusRequired = (monthlyExpAtRetirement * 12 * (lifeExpectancy-retirementAge));
		}
		/*
		console.log("postRetSavingsRate = "+postRetSavingsRate);
		console.log("postRetInflationMonthlyExp = "+postRetInflationMonthlyExp);
		console.log("1 + postRetInflationMonthlyExp ="+(1 + postRetInflationMonthlyExp));
		console.log("postRetSavingsRate - postRetInflationMonthlyExp ="+ (postRetSavingsRate - postRetInflationMonthlyExp));
		console.log("monthlyExpAtRetirement * 12 * (1 + postRetInflationMonthlyExp) = "+(monthlyExpAtRetirement * 12 * (1 + postRetInflationMonthlyExp)));
		console.log("((1 + postRetInflationMonthlyExp) / (1 + postRetSavingsRate)) = "+((1 + postRetInflationMonthlyExp) / (1 + postRetSavingsRate)));
		console.log("(lifeExpectancy-retirementAge) = "+(lifeExpectancy-retirementAge));
		console.log("(Math.pow(((1 + postRetInflationMonthlyExp) / (1 + postRetSavingsRate)), (lifeExpectancy-retirementAge))) = "+(Math.pow(((1 + postRetInflationMonthlyExp) / (1 + postRetSavingsRate)), (lifeExpectancy-retirementAge))));
		console.log("retirementCorpusRequired = "+retirementCorpusRequired);
		*/
		/* Calculate currentYearlyInvestmentRequired*/
		var a2 = parseFloat( 1 + returnExpectedOnInvestmentAmount );
		var a3 = parseFloat( Math.pow(parseFloat(a2), parseFloat(ageDiff))-1 );
		currentYearlyInvestmentRequired = (retirementCorpusRequired * (returnExpectedOnInvestmentAmount / a3));

		
		/* Calculate monthlySIP*/
		monthlySIP = (currentYearlyInvestmentRequired / 12);
		
		
		/* Set all the values */
		$('#ageDiff').text(ageDiff);
		if(ageDiff < 0){
			$('#ageError').removeClass('hide');
			$('#ageCorrect').addClass('hide');
		}else{
			$('#ageError').addClass('hide');
			$('#ageCorrect').removeClass('hide');
		}
		
		$('#foodExpAmt').text(foodFutMonthlyExp.format(0));
		$('#rentExpAmt').text(rentFutMonthlyExp.format(0));
		$('#travelExpAmt').text(travelFutMonthlyExp.format(0));
		$('#entertainmentExpAmt').text(entertainmentFutMonthlyExp.format(0));
		$('#mallExpAmt').text(mallFutMonthlyExp.format(0));
		$('#otherExpAmt').text(otherMonthlyExp.format(0));

		$('#totalExpenseAmount').text(totalFutMonthlyExp.format(0));
		
		$('#monthlyExpAtRetirement').html('<i class="fa fa-inr"></i> '+monthlyExpAtRetirement.format(0));
		$('#retirementCorpusRequiredInBank').html('<i class="fa fa-inr"></i> '+retirementCorpusRequired.format(0));
		$('#currentYearlyInvestmentRequired').html('<i class="fa fa-inr"></i> '+currentYearlyInvestmentRequired.format(0));
		$('#monthlySIP').html('<i class="fa fa-inr"></i> '+monthlySIP.format(0));

		$('#currentMonthlyExpDisplay').text(currentMonthlyExp.format(0));
		$('#inflationRateInExpDisplay').text((totalInfl * 100).format(2));
		
		//Set hidden fileds values
		$scope.retirementPlanner.currentMonthlyExp = currentMonthlyExp;
		$scope.retirementPlanner.inflationRateInExp = totalInfl;
		
		//Draw Chart
		lineChartData = [];
		lineChartLabels = [];
		var i = 0;
		var tmp1 = (1 + returnExpectedOnInvestmentAmount);
		var divideFactor = 100000;
		
		var fixedAmount = parseFloat(currentYearlyInvestmentRequired);
		var previousValue = parseFloat(currentYearlyInvestmentRequired);
		lineChartData.push((previousValue/divideFactor).toFixed(2) * 1);
		lineChartLabels.push(i);
		
		for(var i=1; i<ageDiff; i++){
			previousValue = (((previousValue * tmp1) + fixedAmount)) * 1;
			lineChartLabels.push(i);
			lineChartData.push((previousValue/divideFactor).toFixed(2) * 1);
		}
		$scope.labels = lineChartLabels;
		$scope.series = ['Years'];
		$scope.data = [lineChartData];
		
	};
	
	$scope.processRetirementInfo();
	
	$scope.updatePostRetSavingsRate = function(operation){
		if(operation == '+'){
			$scope.retirementPlanner.postRetSavingsRate  = ($scope.retirementPlanner.postRetSavingsRate * 1) + 1;
			$('#postRetSavingsRate').val($scope.retirementPlanner.postRetSavingsRate);
			$scope.processRetirementInfo();
		}
		if(operation == '-'){
			if($scope.retirementPlanner.postRetSavingsRate > 1){
				$scope.retirementPlanner.postRetSavingsRate = ($scope.retirementPlanner.postRetSavingsRate * 1) - 1;
				$('#postRetSavingsRate').val($scope.retirementPlanner.postRetSavingsRate);
			}
			$scope.processRetirementInfo();
		}
	};
	
	$scope.updatePostRetInflationMonthlyExp = function(operation){
		if(operation == '+'){
			$scope.retirementPlanner.postRetInflationMonthlyExp  = ($scope.retirementPlanner.postRetInflationMonthlyExp * 1) + 1;
			$('#postRetInflationMonthlyExp').val($scope.retirementPlanner.postRetInflationMonthlyExp);
			$scope.processRetirementInfo();
		}
		if(operation == '-'){
			if($scope.retirementPlanner.postRetInflationMonthlyExp > 1){
				$scope.retirementPlanner.postRetInflationMonthlyExp = ($scope.retirementPlanner.postRetInflationMonthlyExp * 1) - 1;
				$('#postRetInflationMonthlyExp').val($scope.retirementPlanner.postRetInflationMonthlyExp);
			}
			$scope.processRetirementInfo();
		}
	};
});

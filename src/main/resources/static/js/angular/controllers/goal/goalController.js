routerApp.controller("goalController", function($scope, $http, $location, $window) {

	$(document).ready(function() {
		$('#navigatorMain .active').removeClass('active');
		$("#summary").addClass("active");	
	});

	$scope.goalDetails = {};
	$scope.goalDetails.goals = [];
	$scope.noGoals = false;

	$scope.initialize = function(){
		var url = webserviceURL['getGoalDetailsList'];
	
		var webServiceResponse = getAjaxJSON($http, url);
	
		webServiceResponse.success(function(response) {
			if(response.length == 0){
				$scope.noGoals = true;
			}else{
				$scope.goalDetails.goals = response;
				$scope.noGoals = false;
			}
		});
	};

	$scope.initialize();

	$scope.deleteGoal = function(goalId, index){
		var ans = confirm('Are you sure to delete this goal?');
		if(ans){
			var url = webserviceURL["deleteGoal"] + "/" + goalId;
			var webServiceResponse = getAjaxJSON($http, url);
			webServiceResponse.success(function(data){
				if(data=="SUCCESS"){
					$scope.goalDetails.goals.splice(index, 1);
					if($scope.goalDetails.goals == 0){
						$scope.noGoals = true;
					}
				}else{
					alert("Please try later");
				}
			});
		}
	};
	
	$scope.drawGraph = function(name, roi, currentYearlyInvestmentRequired, ageDiff){
		//var chart = document.createElement('summaryPageGraph');
		//chart.removeData();
		var lineChartData = [];
		var lineChartLabels = [];
		var i = 0;
		var tmp1 = (1 + roi);
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
		$scope.summaryLabels = lineChartLabels;
		$scope.summarySeries = ['Years'];
		$scope.summaryData = [lineChartData];
		$('#popupHeader').text(name);
	};

});
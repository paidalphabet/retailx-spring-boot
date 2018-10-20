routerApp.controller('homePageController', function($scope, $http) {
	
	$(document).ready(function() {
		$('#navigatorMain .active').removeClass('active');
		$("#homeid").addClass("active");	
	});
});

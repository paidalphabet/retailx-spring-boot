function processData(){
	var currentAge = (isNaN(parseFloat($('#currentAge').val()))) ? 0 : parseFloat($('#currentAge').val());
	var retirementAge =(isNaN(parseFloat($('#retirementAge').val()))) ? 0 : parseFloat($('#retirementAge').val());
	var ageDiff =  parseFloat(retirementAge - currentAge);
	
	var foodFutMonthlyExp = 0;
	var healthFutMonthlyExp = 0;
	var travelFutMonthlyExp = 0;
	var entertainmentFutMonthlyExp = 0;
	var utilitiesFutMonthlyExp = 0;
	var rentFutMonthlyExp = 0;
	
	
	var foodExp = (isNaN(parseFloat($('#foodExp').val()))) ? 0 : parseFloat($('#foodExp').val()); 
	var foodInfl = (isNaN(parseFloat($('#foodInfl').val()))) ? 0 : parseFloat($('#foodInfl').val()/100);
	if(!isNaN(foodExp) && !isNaN(foodInfl)){
		foodFutMonthlyExp = foodExp * Math.pow( (1+foodInfl), (ageDiff));
	}else{
		foodFutMonthlyExp = 0;
	}
	
	var healthExp = (isNaN(parseFloat($('#healthExp').val()))) ? 0 : parseFloat($('#healthExp').val()); 
	var healthInfl = (isNaN(parseFloat($('#healthInfl').val()))) ? 0 : parseFloat($('#healthInfl').val()/100);
	if(!isNaN(healthExp) && !isNaN(healthInfl)){
		healthFutMonthlyExp = healthExp * Math.pow( (1+healthInfl), (ageDiff));
	}else{
		healthFutMonthlyExp = 0;
	}
	
	var travelExp = (isNaN(parseFloat($('#travelExp').val()))) ? 0 : parseFloat($('#travelExp').val()); 
	var travelInfl = (isNaN(parseFloat($('#travelInfl').val()))) ? 0 : parseFloat($('#travelInfl').val()/100);
	if(!isNaN(travelExp) && !isNaN(travelInfl)){
		travelFutMonthlyExp = travelExp * Math.pow( (1+travelInfl), (ageDiff));
	}else{
		travelFutMonthlyExp = 0;
	}
	
	var entertainmentExp = (isNaN(parseFloat($('#entertainmentExp').val()))) ? 0 : parseFloat($('#entertainmentExp').val()); 
	var entertainmentInfl = (isNaN(parseFloat($('#entertainmentInfl').val()))) ? 0 : parseFloat($('#entertainmentInfl').val()/100);
	if(!isNaN(entertainmentExp) && !isNaN(entertainmentInfl)){
		entertainmentFutMonthlyExp = entertainmentExp * Math.pow( (1+entertainmentInfl), (ageDiff));
	}else{
		entertainmentFutMonthlyExp = 0;
	}
	
	
	var utilitiesExp = (isNaN(parseFloat($('#utilitiesExp').val()))) ? 0 : parseFloat($('#utilitiesExp').val()); 
	var utilitiesInfl = (isNaN(parseFloat($('#utilitiesInfl').val()))) ? 0 : parseFloat($('#utilitiesInfl').val()/100);
	if(!isNaN(utilitiesExp) && !isNaN(utilitiesInfl)){
		utilitiesFutMonthlyExp = utilitiesExp * Math.pow( (1+utilitiesInfl), (ageDiff));
	}else{
		utilitiesFutMonthlyExp = 0;
	}
	
	var rentExp = (isNaN(parseFloat($('#rentExp').val()))) ? 0 : parseFloat($('#rentExp').val()); 
	var rentInfl = (isNaN(parseFloat($('#rentInfl').val()))) ? 0 : parseFloat($('#rentInfl').val()/100);
	if(!isNaN(rentExp) && !isNaN(rentInfl)){
		rentFutMonthlyExp = rentExp * Math.pow( (1+rentInfl), (ageDiff));
	}else{
		rentFutMonthlyExp = 0;
	}
	
	
	var totalExp = foodExp + healthExp + travelExp + entertainmentExp + utilitiesExp + rentExp;
	var totalFutMonthlyExp = foodFutMonthlyExp + healthFutMonthlyExp + travelFutMonthlyExp + entertainmentFutMonthlyExp + utilitiesFutMonthlyExp + rentFutMonthlyExp;
	var totalInfl = (Math.pow((totalFutMonthlyExp/totalExp), (1/ageDiff)) - 1) * 100;

	/* Set all the values */
	$('#foodFutMonthlyExp').val(foodFutMonthlyExp.toFixed(2));
	$('#healthFutMonthlyExp').val(healthFutMonthlyExp.toFixed(2));
	$('#travelFutMonthlyExp').val(travelFutMonthlyExp.toFixed(2));
	$('#entertainmentFutMonthlyExp').val(entertainmentFutMonthlyExp.toFixed(2));
	$('#utilitiesFutMonthlyExp').val(utilitiesFutMonthlyExp.toFixed(2));
	$('#rentFutMonthlyExp').val(rentFutMonthlyExp.toFixed(2));
	
	$('#totalExp').val(totalExp.toFixed(2));
	$('#totalFutMonthlyExp').val(totalFutMonthlyExp.toFixed(0));
	$('#totalInfl').val(totalInfl.toFixed(2));
}

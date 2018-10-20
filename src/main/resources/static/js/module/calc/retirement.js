/* Old calculator function kept for referance, please do not remove until new calculator get stabled - start */
function processData(){
	var currentAge = (isNaN(parseFloat($('#currentAge').val()))) ? 0 : parseFloat($('#currentAge').val());
	var retirementAge = (isNaN(parseFloat($('#retirementAge').val()))) ? 0 : parseFloat($('#retirementAge').val());
	var currentMonthlyExp = (isNaN(parseFloat(getNumber($('#currentMonthlyExp').val())))) ? 0 : parseFloat(getNumber($('#currentMonthlyExp').val()));
	var inflationRateInExp = (isNaN(parseFloat($('#inflationRateInExp').val()))) ? 0 : parseFloat($('#inflationRateInExp').val())/100;
	var lifeExpectancy = (isNaN(parseFloat($('#lifeExpectancy').val()))) ? 0 : parseFloat($('#lifeExpectancy').val());
	var postRetSavingsRate = (isNaN(parseFloat($('#postRetSavingsRate').val()))) ? 0 : parseFloat($('#postRetSavingsRate').val())/100;
	var postRetInflationMonthlyExp = (isNaN(parseFloat($('#postRetInflationMonthlyExp').val()))) ? 0 : parseFloat($('#postRetInflationMonthlyExp').val())/100;
	var returnExpectedOnInvestment = (isNaN(parseFloat($('#returnExpectedOnInvestment').val()))) ? 0 : parseFloat($('#returnExpectedOnInvestment').val())/100;
	var replacementRatio = parseFloat(0.8);
	var existingInvestmentTowardsGoal = (isNaN(parseFloat(getNumber($('#existingInvestmentTowardsGoal').val())))) ? 0 : parseFloat(getNumber($('#existingInvestmentTowardsGoal').val()));
	var expectedReturnOnExistingInvestment = (isNaN(parseFloat($('#expectedReturnOnExistingInvestment').val()))) ? 0 :  parseFloat($('#expectedReturnOnExistingInvestment').val())/100;
	var monthlyExpAtRetirement = 0;
	var retirementCorpusRequired = 0;
	var currentYearlyInvestmentRequired = 0;
	var monthlySIP = 0;
	var ageDiffrance =  parseFloat(retirementAge - currentAge);
	
	console.log("original inflationRateInExp >>>>>>>: "+inflationRateInExp);

	/* Calculate monthlyExpAtRetirement*/
	var temp1 = parseFloat( 1 + (parseFloat(inflationRateInExp)) );
	var temp3 = Math.pow(parseFloat(temp1), parseFloat(ageDiffrance));
	var temp4 = parseFloat(currentMonthlyExp) * temp3;
	monthlyExpAtRetirement = (temp4 * parseFloat(replacementRatio));
	$('#monthlyExpAtRetirement').val(monthlyExpAtRetirement.format(2));
	
	console.log('--------------------------------------Original---------------------------------------');
	console.log("monthlyExpAtRetirement : "+monthlyExpAtRetirement.format(2));
	console.log('postRetSavingsRate - '+postRetSavingsRate);
	console.log('postRetInflationMonthlyExp - '+postRetInflationMonthlyExp);
	console.log('lifeExpectancy - '+lifeExpectancy);
	
	/* Calculate retirementCorpusRequired*/
	if(postRetSavingsRate != postRetInflationMonthlyExp){
		retirementCorpusRequired = (monthlyExpAtRetirement * 12 * (1 + postRetInflationMonthlyExp) / (postRetSavingsRate - postRetInflationMonthlyExp) * (1 - (Math.pow(((1 + postRetInflationMonthlyExp) / (1 + postRetSavingsRate)), (lifeExpectancy-retirementAge)))));
	}else{
		retirementCorpusRequired = (monthlyExpAtRetirement * 12 * (lifeExpectancy-retirementAge));
	}
	$('#retirementCorpusRequired').val(retirementCorpusRequired.format(2));
	console.log('retirementCorpusRequired - '+retirementCorpusRequired);
	console.log('--------------------------------------Original---------------------------------------');
	
	/* Calculate currentYearlyInvestmentRequired*/
	var a2 = parseFloat( 1 + returnExpectedOnInvestment );
	var a3 = parseFloat( Math.pow(parseFloat(a2), parseFloat(ageDiffrance))-1 );
	currentYearlyInvestmentRequired = (retirementCorpusRequired * (returnExpectedOnInvestment / a3));
	$('#currentYearlyInvestmentRequired').val(currentYearlyInvestmentRequired.format(2));
	
	
	/* Calculate monthlySIP*/
	monthlySIP = (currentYearlyInvestmentRequired / 12);
	$('#monthlySIP').val(monthlySIP.format(2));
	
	
	/* Calculate future value of existing investments */
	var futureValueOfExistingInvestment = parseFloat(existingInvestmentTowardsGoal) * parseFloat(Math.pow((1+expectedReturnOnExistingInvestment),(ageDiffrance)));
	$('#futureValueOfExistingInvestment').val(futureValueOfExistingInvestment.format(2));
	
	
	/* Calculate retirement corpus required after factoring in for existing investments */
	var retirementCorpusRequiredExistingInvestment = parseFloat(retirementCorpusRequired) - parseFloat(futureValueOfExistingInvestment);
	$('#retirementCorpusRequiredExistingInvestment').val(retirementCorpusRequiredExistingInvestment.format(2));
	
	
	/* Calculate current Yearly Investment required for existing investments */
	var currentYearlyInvestmentRequiredExistingInvestment = (retirementCorpusRequiredExistingInvestment * (returnExpectedOnInvestment / ( Math.pow(parseFloat( 1 + returnExpectedOnInvestment ), parseFloat(ageDiffrance))-1 )));
	$('#currentYearlyInvestmentRequiredExistingInvestment').val(currentYearlyInvestmentRequiredExistingInvestment.format(2));
	
	
	/* Monthly SIP for existing investments */
	monthlySIPExistingInvestment = (currentYearlyInvestmentRequiredExistingInvestment / 12);
	$('#monthlySIPExistingInvestment').val(monthlySIPExistingInvestment.format(2));
	
}
/* Old calculator function kept for referance, please do not remove until new calculator get stabled - end */
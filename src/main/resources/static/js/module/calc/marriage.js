function processData(){
	var currentAge = (isNaN(parseFloat($('#currentAge').val()))) ? 0 : parseFloat($('#currentAge').val());
	var marriageAge = (isNaN(parseFloat($('#marriageAge').val()))) ? 0 : parseFloat($('#marriageAge').val());
	var currentCostOfWedding = (isNaN(parseFloat(getNumber($('#currentCostOfWedding').val())))) ? 0 : parseFloat(getNumber($('#currentCostOfWedding').val()));
	var inflationCostOfWedding = (isNaN(parseFloat($('#inflationCostOfWedding').val()))) ? 0 : parseFloat($('#inflationCostOfWedding').val())/100;
	var returnExpectedOnInvestment = (isNaN(parseFloat($('#returnExpectedOnInvestment').val()))) ? 0 : parseFloat($('#returnExpectedOnInvestment').val())/100;

	var weddingCorpusRequired = 0;
	var monthlyInvestmentRequired = 0;
	var yearlyInvestmentRequired = 0;
	var ageDiffrance =  parseFloat(marriageAge - currentAge);
	

	/* Calculate Marriage Corpus Required */
	var temp1 = parseFloat( 1 + (parseFloat(inflationCostOfWedding)) );
	var temp2 = Math.pow(parseFloat(temp1), parseFloat(ageDiffrance));
	weddingCorpusRequired = parseFloat(currentCostOfWedding * parseFloat(temp2));
	$('#weddingCorpusRequired').val(weddingCorpusRequired.format(2));
	
	
	/* Calculate Monthly Investment Requirement */
	var temp3 = parseFloat(Math.pow((1+returnExpectedOnInvestment),(ageDiffrance))) - 1;
	monthlyInvestmentRequired = parseFloat(weddingCorpusRequired * (returnExpectedOnInvestment / temp3))/12;
	$('#monthlyInvestmentRequired').val(monthlyInvestmentRequired.format(2));
	
	/* Calculate Yearly Investment Requirement */
	yearlyInvestmentRequired = parseFloat(monthlyInvestmentRequired) * 12;
	$('#yearlyInvestmentRequired').val(yearlyInvestmentRequired.format(2));
}



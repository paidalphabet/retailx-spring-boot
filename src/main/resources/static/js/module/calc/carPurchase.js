function processData(){
	var yearsWantDreamCar = (isNaN(parseFloat($('#yearsWantDreamCar').val()))) ? 0 : parseFloat($('#yearsWantDreamCar').val());
	var currentCarPrice = (isNaN(parseFloat(getNumber($('#currentCarPrice').val())))) ? 0 : parseFloat(getNumber($('#currentCarPrice').val()));
	var inflationInCarPrices = (isNaN(parseFloat($('#inflationInCarPrices').val()))) ? 0 : parseFloat($('#inflationInCarPrices').val())/100;
	var returnExpectedOnInvestment = (isNaN(parseFloat($('#returnExpectedOnInvestment').val()))) ? 0 : parseFloat($('#returnExpectedOnInvestment').val())/100;

	var priceOfCarInYears = 0;
	var monthlyInvestmentRequired = 0;
	var yearlyInvestmentRequired = 0;
	
	if(yearsWantDreamCar > 0){
		$('#years').text(yearsWantDreamCar);
	}

	/* Calculate Price of car in provided years */
	var temp1 = parseFloat( 1 + (parseFloat(inflationInCarPrices)) );
	var temp2 = Math.pow(parseFloat(temp1), parseFloat(yearsWantDreamCar));
	priceOfCarInYears = parseFloat(currentCarPrice * parseFloat(temp2));
	$('#priceOfCarInYears').val(priceOfCarInYears.format(2));
	
	
	/* Calculate Monthly Investment Requirement */
	var temp3 = parseFloat(Math.pow((1+returnExpectedOnInvestment),(yearsWantDreamCar))) - 1;
	monthlyInvestmentRequired = parseFloat(priceOfCarInYears * (returnExpectedOnInvestment / temp3))/12;
	$('#monthlyInvestmentRequired').val(monthlyInvestmentRequired.format(2));
	
	/* Calculate Yearly Investment Requirement */
	yearlyInvestmentRequired = parseFloat(monthlyInvestmentRequired) * 12;
	$('#yearlyInvestmentRequired').val(yearlyInvestmentRequired.format(2));
}



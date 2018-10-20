function processData() {
	var yearsToVacation = (isNaN(parseFloat($('#yearsToVacation').val()))) ? 0	: parseFloat($('#yearsToVacation').val());
	var costOfVacationInYears = (isNaN(parseFloat(getNumber($('#costOfVacationInYears ').val())))) ? 0 : parseFloat(getNumber($('#costOfVacationInYears ').val()));
	var returnExpectedOnInvestment = (isNaN(parseFloat($('#returnExpectedOnInvestment').val()))) ? 0 : parseFloat($('#returnExpectedOnInvestment').val())/100;

	var investMonthly = costOfVacationInYears*(returnExpectedOnInvestment/(Math.pow((1+returnExpectedOnInvestment),(yearsToVacation))-1))/12;
	var investYearly = investMonthly * 12;
	
	$("#monthlyInvestmentRequired").val(investMonthly.format(2));
	$("#yearlyInvestmentRequired").val(investYearly.format(2));

}

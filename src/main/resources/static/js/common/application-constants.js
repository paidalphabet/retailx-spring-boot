/**
 * this file will contain all the application related constants 
 */
var educationCalculator    = "EDUCATION";
var retirementCalculator   = "RETIREMENT";
var vacationCalculator     = "VACATION";
var SUBSCRIPTION_SAVED     = "SUBSCRIPTION_SAVED";
var SUBSCRIPTION_NOT_SAVED = "SUBSCRIPTION_NOT_SAVED";

var calculatorsTypes = {
	EDUCATION :{
		templateURL    : "#/education",
		calculatorType : "EDUCATION",
		icon           : "images/graduate.png"
	},
	RETIREMENT :{
		templateURL    : "#/retirement",
		calculatorType : "RETIREMENT",
		icon           : "images/retirement.png"
	},

	GOALSUMMARY :{
		templateURL    : "/goalSummary",
		icon           : "images/goals.png"
	},
	
	VACATION :{
		templateURL    : "#vacation",
		icon           : "images/vacation.png"
	},

	REGISTER :{
		templateURL    : "/register",
		icon           : "images/register.png"
	},
	elements : 4	
};
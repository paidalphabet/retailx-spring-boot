
var SAVE_CONSOLE_LOG_TO_DB = false;
var calculators = {
		elements : 0
};

Number.prototype.format = function(n, x) {
    var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
};

function formatNumber(object) {
	if(object.value != undefined){
		var a = parseFloat(getNumber(object.value));
		if(!isNaN(a)){
			document.getElementById(object.id).value = a.format(0);
		}
	}
}

function getNumber(value){
	if(value != undefined && value != null && value != ""){
		return value.split(',').join("");
	}else{
		return "";
	}
}

$(document).ready(function(){
	$("input.amount").keyup(function(obj){
		formatNumber(this);
	});
	
	$("input.amount").each(function(obj){
		formatNumber(this);
	});	
});

function populateValidators(clazz) {
	var claz = "." + clazz;
	var validators = [];
	$(claz).each(function(control) {
		var currentControl = this;
		var value = currentControl.value;
		var type = currentControl.getAttribute("datatype");
		var validationDiv = currentControl.getAttribute("validationDiv");
		var mandatory = currentControl.getAttribute("required");
		var identity = currentControl.getAttribute("id");
		var validator = new Validator(value, type, validationDiv, mandatory);
		validator.setIdentity(identity);
		validators.push(validator);
	});
	return validators;
}

function validateEmailID(emailID){
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
	return emailID.match(mailformat);
}

function logMessage(message){
	if(SAVE_CONSOLE_LOG_TO_DB){
		var url = appUrl + "logRequest";
		var msg = {message:message};
		$.ajax({
		    type: "POST",
		    url: url,
		    data: $.param(msg),
		    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		});
	}
	console.log(message);
}

function logMessageAndData(message,data){
	logMessage(message);
	var url = appUrl + "logRequest";
	var msg = {
				message:message,
				data   :data
			};
	if(SAVE_CONSOLE_LOG_TO_DB){
		$.ajax({
		    type: "POST",
		    url: url,
		    data: $.param(msg),
		    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
		});

	}
	console.log(data);
}
/*
function getCalculatorsJSON(){
	if (calculators.elements <= 0) {/*
		$.ajax({
	        'async': false,
	        'global': false,
	        'url': 'js/common/calculators.json',
	        'dataType': "json",
	        'success': function (data) {
	        	calculators = data;
	        }
	    });
	}
	return calculators;
}

getCalculatorsJSON();
*/
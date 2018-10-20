/**
 * 
 */
function Validator(value,type,validationDiv,mandatory){
	this.elementValue = value;
	this.elementType = type;
	this.elementValidationDiv = validationDiv;	
	this.elementMandatory = mandatory;
}

Validator.prototype.getElementValue = function(){
	return this.elementValue;
}
Validator.prototype.getElementType = function(){
	return this.elementType;
}
Validator.prototype.getValidationDiv = function(){
	return this.elementValidationDiv;
}
Validator.prototype.isMandatory = function(){
	return  this.elementMandatory;
}

Validator.prototype.setIdentity = function(identity){
	this.elementIdentity = identity;
}


Validator.prototype.getIdentity = function(){
	return this.elementIdentity;
}



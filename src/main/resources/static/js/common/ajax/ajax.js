/**
  * Consists of common code for ajax. 
 */
function postAjax($http,url,formdata){
	  var response = $http({
			   method  : 'POST',
			   url     : url,
			   headers : { 'Access-Control-Allow-Origin': '*' },
			   data    : formdata,  // pass in data as strings
			   headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	   });
	  return response;
	//return $http.post(url,formdata);
}

function postAjaxJSON($http,url,formdata){
	  var response = $http({
			   method  : 'POST',
			   url     : url,
			   headers : { 'Access-Control-Allow-Origin': '*' },
			   data    : formdata,  // pass in data as strings
			   contentType: "application/json; charset=utf-8"
	   });
	  return response;
	//return $http.post(url,formdata);
}


function getAjaxJSON($http,url){
	  var response = $http({
			   method  : 'GET',
			   url     : url,
			   headers : { 'Access-Control-Allow-Origin': '*' }
	   });
	  return response;
	//return $http.post(url,formdata);
}

function getCachedAjaxJSON($http,url,cache){
	  var response = $http({
			   method  : 'GET',
			   url     : url,
			   headers : { 'Access-Control-Allow-Origin': '*' },
			   cache   : cache
	   });
	  return response;
	//return $http.post(url,formdata);
}



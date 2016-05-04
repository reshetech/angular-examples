// Format the time string into European date format.
app.filter('ilDateFormat', function ($filter){
  return function(text){
    var  tempdate= new Date(text.replace(/-/g,"/"));
    return $filter('date')(tempdate, "dd-MM-yyyy");
  }
});


// Get items from array that have the propertyId.
app.filter('byPropertyType', function() {

    return function(res,propertyTypeId) {
        var out = [];
		
		if(propertyTypeId == null || typeof propertyTypeId == "undefined") return res;
		
	    var count = res.length;
	    for(var i=0; i<count;i++) {
		    if(res[i].property_type == propertyTypeId) {
				out.push(res[i]);
			}
        }
	  
        return out;
    }

});

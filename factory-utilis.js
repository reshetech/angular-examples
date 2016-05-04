app.factory('utilis', function() {
	var obj = {};
	
	
	obj.indexof = function(array, item) {
		var index = -1;
		var count = array.length;
		for(var i=0; i<count; i++){
			if(item == array[i]) index = i;
		}
		
		return index;
	}
		
	obj.inArray = function(array, value) {
		return obj.indexof(array, value) !== -1;
	}
		
	obj.removeArrayItem = function(array, item) { 
		var index = obj.indexof(array, item);
	    return array.splice(index, 1);     
    }
	
	
	return obj;
});

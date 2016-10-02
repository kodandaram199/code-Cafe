var app = angular.module('instantsearch',[]);
 
app.controller('instantSearchCtrl',function($scope,$http,$filter){
	$scope.status = {Accepted: false};
	$scope.search=[];
	$http.get('http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1').success(function(data, status, headers, config) {
		$scope.items = data.websites;
	}).error(function(data, status, headers, config) {
		console.log("No data found..");
  });
});
 
 app.filter('myfilter', function() {
   return function( items, status) {
    var filtered = [];
    
    angular.forEach(items, function(item) {
		if(status.Accepted == false)
		{
			filtered.push(item);
		}
       else if( status.Accepted==true && item.compiler_status=='Accepted') {
          filtered.push(item);
        }
        
    });
  
    return filtered;
  };
});

app.controller('totalCtrl',function($scope,$http,$filter){
	
	
	
	
	
	
	
});

 
 
app.filter('searchFor', function(){
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString = searchString.toLowerCase();
		angular.forEach(arr, function(item){
			if(item.title.toLowerCase().indexOf(searchString) !== -1 || item.language.toLowerCase().indexOf(searchString) !== -1 || item.metadata.level.toLowerCase().indexOf(searchString) !== -1){
			result.push(item);
		}
		});
		return result;
	};
});



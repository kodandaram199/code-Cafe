var app = angular.module('code-cafe',[]);
 
 
 
 
 
/* search filter*/

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






/* Multiple data filter using check boxes*/

app.filter('check', function() {
   return function( items, compileStatus) {
    var filtered = [];
    
    angular.forEach(items, function(item) {
       if(compileStatus.Accepted == false ) {
          filtered.push(item);
        }
        else if(compileStatus.Accepted == true && item.compiler_status == 'Accepted'){
          filtered.push(item);
        }
    });
  
    return filtered;
  };
});




/* To controll the app data*/

app.controller('AppController', function($scope, $filter,$http)
            {       
              
              $scope.compileStatus = {Accepted: false};
              
             $http.get('http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1').success(function(data, status, headers, config) {
		$scope.items = data.websites;
	}).error(function(data, status, headers, config) {
		console.log("No data found..");
  });
            });   




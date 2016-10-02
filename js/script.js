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
      if(compileStatus.Accepted == false && compileStatus.Error == false &&   compileStatus.Wrong == false && compileStatus.Time==false) {
          filtered.push(item);
        }
        else if(compileStatus.Accepted == true && compileStatus.Error == false && item.compiler_status == 'Accepted' &&  compileStatus.Wrong==false && compileStatus.Time==false){
          filtered.push(item);
        }
        else if(compileStatus.Error == true && compileStatus.Accepted == false && item.compiler_status == 'Compilation error' &&  compileStatus.Wrong==false && compileStatus.Time==false){
          filtered.push(item);
        }
		else if(compileStatus.Error == false && compileStatus.Accepted == false && compileStatus.Wrong==true && item.compiler_status.toLowerCase().indexOf("wrong")!=-1 && compileStatus.Time==false){
          filtered.push(item);
        }
		
		else if(compileStatus.Error == false && compileStatus.Accepted == false && compileStatus.Time==true && compileStatus.Wrong==false && item.compiler_status.toLowerCase().indexOf("limit")!=-1){
          filtered.push(item);
        }
		
    });
  
    return filtered;
  };		
});




/* To controll the app data*/

app.controller('AppController', function($scope, $filter,$http)
            {       
              
              $scope.compileStatus = {Accepted: false, Error: false, Wrong:false, Time:false };
              
             $http.get('http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1347').success(function(data, status, headers, config) {
		$scope.items = data.websites;
	}).error(function(data, status, headers, config) {
		console.log("No data found..");
  });
            });   




app.controller('AdminController',function($scope,$http,Modal,$rootScope){
   $scope.deleteVotes=function(ev){
       Modal.confirm('Alert','Are you sure?',function(){
           $http({
               url:'api/cleanvotes',
               method:'delete'
           }).then(function(){
               Modal.alert('Success','Successfully deleted votes');
               $rootScope.socket.emit('newvote', {
                    vote: '1'
                });
           })
       },function(){
           
       },ev)
   }
});
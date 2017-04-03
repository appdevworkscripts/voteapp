app.controller('ResultController', function($rootScope, $scope, $http, $q) {
    $rootScope.socket.connect();
    $rootScope.socket.on('logged', function(data) {
        console.log(data)
        $scope.loggedNumber = data;
        $scope.$apply();
    });
    $http({
        url: 'api/votes'
    }).then(function(response) {

        $scope.movies = response.data.data;
    });
    $rootScope.socket.on('votedata', function(data) {
        console.log(data)
        $scope.movies = data;
        $scope.movies.map(function(item) {
        getmovieData(item._id).then(function(img) {
            item.image = img;
        }, function(resp) {
            item.image = 'n/a';
            console.log(resp)
        });
        return item;
    })
        $scope.$apply();
    });

    function getmovieData(name) {
        return $q(function(resolve, reject) {
            $http({
                url: 'https://www.omdbapi.com/',
                params: {
                    s: name
                },
                method: 'GET'
            }).then(function(response) {
                //console.log(response)
                if (response.data.Search) {
                    var imagepath = response.data.Search[0].Poster;
                    resolve(imagepath);
                } else {
                    reject('not found')
                }
            }, function(resp) {
                reject(resp);
            })
        });
    }
    

});

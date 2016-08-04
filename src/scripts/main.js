var app = angular.module( 'dribbble', [ 'ngRoute', 'ngSanitize' ] );

app.config( function( $routeProvider ) {
  $routeProvider
  .when('/', {
    templateUrl: 'page.html',
    controller: 'MainCtrl'
  })
   .when('/shot/:shot_id', {
    templateUrl: 'info.html',
    controller: 'SecondCtrl'
  })
  .otherwise({
    redirectTo: "/"
  });
});

app.controller( 'MainCtrl', function( $scope, $http, $rootScope ) {
  $rootScope.CLIENT_TOKEN = '9a8cd815163e5e68aa4ab4a9be9519c54f851ec2de320e365dc5e591fbfc95fd';
  $rootScope.API_URL = 'https://api.dribbble.com/v1/';

  $scope.listShots = function() {
    'use strict';

    if ( $rootScope.actualPage === undefined ) {
      $rootScope.actualPage = 0;
    }

    $rootScope.actualPage += 1;

    if ( $rootScope.pop_shots === undefined || $rootScope.pop_shots.length === 0 ) {
      $rootScope.pop_shots = [];
      console.log( 'Vazio');
    } else {
      console.log( 'Temos algo' );
    }

    $http({
      method: 'GET',
      url: $rootScope.API_URL + 'shots/' + '?page=' + $rootScope.actualPage + '&access_token=' + $rootScope.CLIENT_TOKEN
    }).then( function successCallback( response ) {

      let res = response.data;

      for ( let i = 0, items = res.length; i < items; i++ ) {
        $rootScope.pop_shots.push( res[ i ] );
      }
      // return response.data;
    }, function errorCallback( response ) {
      console.log( response );
    })
    // .then( lazyImageLoader )
    .catch( function( error ) {
      console.log( 'request failed', error );
    });
  }
  
  $scope.listShots();
});

app.controller( 'SecondCtrl', function( $scope, $http, $routeParams, $rootScope ) {
  $scope.shotInfo = function() {
    'use strict';

    $http({
      method: 'GET',
      url: $rootScope.API_URL + 'shots/' + $routeParams.shot_id + '?access_token=' + $rootScope.CLIENT_TOKEN
    }).then( function successCallback( response ) {
      $scope.shot = response.data;
      // return response.data;
    }, function errorCallback( response ) {
      console.log( response );
    })
    // .then( lazyImageLoader )
    .catch( function( error ) {
      console.log( 'request failed', error );
    });
  }

  $scope.shotInfo();
});

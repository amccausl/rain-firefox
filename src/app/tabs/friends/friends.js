angular.module( 'rain.tabs.friends', [
  'rain.tabs.friends.index',
  //'rain.tabs.friends.detail',

  'rain.tabs.friends.root'
])

;

angular.module( 'rain.tabs.friends.root', [
  'rain.tabs.root'
])

.config( function( $stateProvider ) {
  console.info('config friends');
  $stateProvider
    .state('tab.friends', {
      url: '/friends',
      abstract: true,
      views: {
        'tab-friends': {
          templateUrl: 'tabs/friends/friends.tpl.html',
          controller: function( $scope, Friends ) {
            console.info('tab.friends');
            $scope.friends = Friends.all();
          }
        }
      }
    });
});

angular.module( 'rain.tabs.friends.index', [
  'rain.tabs.friends.index.root'
])

;

angular.module( 'rain.tabs.friends.index.root', [
  'rain.tabs.friends.root'
])

.config( function( $stateProvider ) {
  console.info('config friends index');
  $stateProvider
    .state('tab.friends.index', {
      url: '',
      views: {
        'content': {
          templateUrl: 'tabs/friends/friends.tpl.html',
          controller: function( $scope, Friends ) {
            console.info('tab.friends.index');
            $scope.friends = Friends.all();
          }
        }
      }
    });
});

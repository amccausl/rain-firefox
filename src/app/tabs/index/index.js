angular.module( 'rain.tabs.index', [
  'rain.tabs.index.root'
])

;

angular.module( 'rain.tabs.index.root', [
  'rain.tabs.root'
])

.config( function( $stateProvider ) {
  console.info('config index');
  $stateProvider
    .state('tab.index', {
      url: '',
      views: {
        'tab-dash': {
          templateUrl: 'tabs/index/index.tpl.html',
          controller: function( $scope ) {
            console.info('tab.index');
          }
        }
      }
    });
});

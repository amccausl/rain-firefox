angular.module( 'rain.tabs.settings', [
  'rain.tabs.settings.root'
])

;

angular.module( 'rain.tabs.settings.root', [
  'sandboxService',

  'rain.tabs.root'
])

.config( function( $stateProvider ) {
  $stateProvider
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'tabs/settings/settings.tpl.html',
          controller: function( $scope ) {
          }
        }
      }
    });
});

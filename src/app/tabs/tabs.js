
angular.module( 'rain.tabs', [
  'rain.tabs.index',
  'rain.tabs.friends',
  'rain.tabs.settings',

  'rain.tabs.root'
])

;

angular.module( 'rain.tabs.root', [
  'rain.templates',

  'ionic'
])

.config( function( $stateProvider ) {
  $stateProvider
    .state('tab', {
      url: '/tabs',
      abstract: true,
      templateUrl: 'tabs/tabs.tpl.html',
      controller: function() {
      }
    })
    ;
})

;

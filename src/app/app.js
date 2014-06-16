
angular.module('rain', [
  'rain.tabs',
  'rain.services',
  'rain.templates',

  'ionic'
])

.run( function( $ionicPlatform ) {
  $ionicPlatform.ready( function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if( window.cordova && window.cordova.plugins.Keyboard ) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar( true );
    }
    if( window.StatusBar ) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config( function( $compileProvider, $urlRouterProvider ) {

  // Whitelist "app:/" protocol for firefox packaged app
  // https://developer.mozilla.org/en-US/Apps/Tools_and_frameworks/common_libraries_and_frameworks
  $compileProvider.aHrefSanitizationWhitelist( /^\s*(https?|ftp|mailto|app):/ );

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tabs');

});


/**
 * Wrap system notifications
 */
angular.module( 'notificationService', [
])

.factory( 'Notification', function() {
  var notifications = [];

  var notificationService = function( title, options ) {
    if( Notification && Notification.permission === 'granted' ) {
      this.prototype = new Notification( title, options );
    }
    else {
      console.warn('notifications unavailable');
    }
  };

  return notificationService;
})

;

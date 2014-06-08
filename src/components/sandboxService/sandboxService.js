/**
 * Wrap foreign stream code in an iframe sandbox.
 */
angular.module( 'sandboxService', [
])

.factory( 'sandboxService', function() {
  var sandboxService = {
    create: function( name, content ) {
      console.info('create', arguments);
      // Create a iframe
      var iframe = document.createElement('iframe');

      /* Safe container approach, works but requires 'allow-same-origin'.  Kinda defeats the purpose, but here for reference
      iframe.sandbox = 'allow-same-origin allow-scripts';
      iframe.src = 'about:blank';

      var script = function() {
        var listener = function( event ) {
          // @todo security
          // @todo process the event
          event.source.postMessage( event.data, '*' );
        };

        addEventListener('message', listener, false);
      };

      content = '<!doctype html><head></head><body><script>(' + script + ')()</script></body></html>';

      // Need to wait for contentWindow to load
      iframe.onload = function() {
        iframe.contentWindow.document.open('text/html', 'replace');
        iframe.contentWindow.document.write( content );
        iframe.contentWindow.document.close();
      };
      */

      iframe.sandbox = 'allow-scripts';
      iframe.src = '/sandbox.html';

      window.addEventListener('message', function( event ) {
        if( event.origin === "null" && event.source == iframe.contentWindow ) {
          console.info( 'event', name, event );
        }
      });

      // Need to wait for contentWindow to load, then initialize stream
      iframe.onload = function() {
        // @todo Send code?
        iframe.contentWindow.postMessage('init', '*');
      };

      // Load the sandbox into the DOM to start execution
      document.body.appendChild( iframe );

      var i = 0;
      setInterval( function() {
        i++;
        iframe.contentWindow.postMessage('test ' + i, '*');
      }, 6000);

      // @todo Load sandbox as a stream, present stream API
      stream = {};

      return stream;
    }
  };

  return sandboxService;
})

;

angular.module( 'sandboxService', [
])

.factory( 'sandboxService', function() {
  var sandboxService = {
    create: function( name, content ) {
      console.info('create', arguments);
      // Create a iframe
      var sandbox = document.createElement('iframe');
      // @todo find way to avoid 'allow-same-origin'
      sandbox.sandbox = 'allow-same-origin allow-scripts';
      sandbox.src = 'about:blank';

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
      sandbox.onload = function() {
        sandbox.contentWindow.document.open('text/html', 'replace');
        sandbox.contentWindow.document.write( content );
        sandbox.contentWindow.document.close();
      };

      window.addEventListener('message', function( event ) {
        console.info('parent event', name, event);
        if( event.origin === "null" && event.source == sandbox.contentWindow ) {
          console.info('event', name, event);
        }
      });

      // @todo sandbox.contentWindow.postMessage('test', '*');

      var i = 0;
      setInterval( function() {
        i++;
        sandbox.contentWindow.postMessage('test ' + i, '*');
      }, 6000);

      // Load the sandbox into the DOM
      document.body.appendChild( sandbox );
    }
  };

  return sandboxService;
})

;

var debug = false;
var mouseDelta = {};

var isNode = (typeof process !== "undefined" && typeof require !== "undefined");
var isNodeWebkit = (function() {
  if(isNode) {
    try {
      return (typeof require('nw.gui') !== "undefined");
    } catch(e) {
      return false;
    }
  }else{
    return false;
  }
})();

if(isNodeWebkit) {
  var win = nw.Window.get();
  var app = nw.App;

  // debug
  if(app.fullArgv.indexOf('--debug') != -1){
    debug = true;
    win.leaveKioskMode();
    win.showDevTools();
    console.log('win', win);
  }
}

jQuery(function($){
  // Set Event Listeners for "exit on input"
  setEvents();
});  // jQuery End

function setEvents() {
  $(window).mousemove(function(e) {
    if(!mouseDelta.x) {
      mouseDelta.x = e.pageX;
      mouseDelta.y = e.pageY;
      return false;
    }

    var deltax = Math.abs(e.pageX - mouseDelta.x);
    var deltay = Math.abs(e.pageY - mouseDelta.y);
    if(deltax > 20 || deltay > 20){
      endScreensaver(e);
    }
  });
}

function endScreensaver(e) {
  if(isNodeWebkit && !debug){ // don't close on debug-mode
    win.close();
  }
}

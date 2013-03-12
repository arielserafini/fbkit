var FBKit = (function(FB){
  var exports = {};

  var init = function() {

    // Fails if the FB object is not found.
    if (!FB) {
      console.log('Facebook Javascript SDK not found.');
    }

    return exports;
  };

  return init();

}(window.FB));
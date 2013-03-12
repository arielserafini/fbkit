var FBKit = (function(FB){
  var exports = {};

  var init = function() {

    // Fails if the FB object is not found.
    if (!FB) {
      console.log('Facebook Javascript SDK not found.');
    }

    exports.login = login;

    return exports;
  };

  // Handles login and permissions.
  var login = function(callback, params) {

    FB.login(function(response) {
      if (response.authResponse) {
        // We're logged in.
        if (callback) {
          callback.apply(FBKit, params);
        }
      } else {
        // Something went wrong.
      }
    });
  };

  return init();

}(window.FB));
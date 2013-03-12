var FBKit = (function(FB){
  var exports = {},
    status = 'unknown',
    user = {},
    authResponse;

  var init = function() {

    // Fails if the FB object is not found.
    if (!FB) {
      console.log('Facebook Javascript SDK not found.');
    }

    getLoginStatus();

    exports.login = login;

    return exports;
  };

  var getLoginStatus = function() {
    console.log('Getting Facebook login status...');

    FB.getLoginStatus(function(response) {
      status = response.status;

      if (response.status === 'connected') {
          // the user is logged in and has authenticated your
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token
          // and signed request each expire
          authResponse = response.authResponse;
          user.id = authResponse.userID;
          console.log(status, authResponse, user);

        } else if (response.status === 'not_authorized') {
          console.log('User is logged in, but did not authorize the app.');
          login();
          // authResponse = response.authResponse;
          // user.id = authResponse.userID;
          // console.log(status, authResponse, user);
        } else {
          // the user isn't logged in to Facebook.
          console.log('User is not logged in to Facebook.');
          login();
        }
      });

  };

  // Handles login and permissions.
  var login = function(callback, params) {
    console.log('Requesting login...');
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Login/authorization successful!');

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
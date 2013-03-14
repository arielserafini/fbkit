var FBKit = (function(){
  'use strict';

  var exports = {},
    status = 'unknown',
    user = {},
    authResponse,
    permissions = [];

  var init = function() {
    var FB = window.FB;

    // Fails if the FB object is not found.
    if (!FB) {
      console.log('Facebook Javascript SDK not found.');
    }

    getLoginStatus();

    exports.login = login;
    exports.getUser = getUser;

    return exports;
  };

  var getLoginStatus = function() {
    console.log('Getting Facebook login status...');

    FB.getLoginStatus(function(response) {
      status = response.status;

      if (response.status === 'connected') {
          authResponse = response.authResponse;
          user.id = authResponse.userID;
          console.log('Logged in & authorized.');

          getUserInfo();

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

  var require = function(perm) {
    if (permissions.indexOf(perm) == -1) {
      permissions.push(perm);
    }
  };

  // Returns the permissions array as a comma separated string
  var getPermissions = function() {
    return permissions.join(',');
  };

  // Exposes the user object
  var getUser = function() {
    return user;
  };

  // Get user data for the current user
  var getUserInfo = function() {
    FB.api('/me', function(response) {
      user = response;

      console.log('Logged in as ' + user.name);
    });
  };

  // Handles login and permissions.
  var login = function(callback, params) {
    console.log('Requesting login...');
    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Login/authorization successful!');
        getUserInfo();

        if (callback) {
          callback.apply(FBKit, params);
        }
      } else {
        // Something went wrong.
      }
    }, { scope: getPermissions() });

  };

  return init;

}());
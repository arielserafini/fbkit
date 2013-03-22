var FBKit = (function(){
  'use strict';

  var console = {log:function(){}},
    exports = {},
    status = 'unknown',
    user = {},
    authResponse,
    permissions = [],
    grantedPermissions;

  var debug = function() {
      console = window.console;
  };

  var init = function() {

    var FB = window.FB;

    // Fails if the FB object is not found.
    if (!FB) {
      console.log('Facebook Javascript SDK not found.');
    }

    getLoginStatus();

    exports.debug = debug;
    exports.login = login;
    exports.getUser = getUser;
    exports.postImage = postImage;

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
          // login();
          // authResponse = response.authResponse;
          // user.id = authResponse.userID;
          // console.log(status, authResponse, user);
        } else {
          // the user isn't logged in to Facebook.
          console.log('User is not logged in to Facebook.');
          // login();
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

  var getGrantedPermissions = function() {
    FB.api('/me/permissions', function(response) {
      grantedPermissions = response;

      console.log('granted: ', response);
    });
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
      getGrantedPermissions();
    });
  };

  // Handles login and permissions.
  var login = function(callback, params) {
    console.log('Requesting login...');
    console.log(getPermissions());

    FB.login(function(response) {
      if (response.authResponse) {
        console.log('Login/authorization successful!');
        status = 'connected';
        getUserInfo();
        getGrantedPermissions();

        if (callback) {
          callback.apply(FBKit, params);
        }
      } else {
        // Something went wrong.
      }
    }, { scope: getPermissions() });

  };


  // Post image to Facebook
  var postImage = function(imgURL, desc, callback) {
    require('publish_stream');

    if (status === 'connected') {
        FB.api('/me/photos', 'post', {
            message: desc,
            url:imgURL
        }, function(response){
            if (!response || response.error) {
                console.log(response);
            } else {
                // Sucess
                // console.log('Post ID: ' + response.id);
                if (callback) {
                  callback();
                }
            }
        });
    } else {
      login(postImage, [imgURL, desc, callback]);
    }

  };

  return init;

}());
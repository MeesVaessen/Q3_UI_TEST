
<template>
  <button @click="oauthSignIn">Login Using Google</button>
</template>

<script setup>
import axios from 'axios';
import { googleTokenLogin } from "vue3-google-login"

const apiUrl = 'https://localhost:7174/Test/test';
var fragmentString = location.hash.substring(1);

var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0) {
    localStorage.setItem('oauth2-test-params', JSON.stringify(params) );
    var params = JSON.parse(localStorage.getItem('oauth2-test-params'));
    if (params && params['access_token']) {
      axios.post(apiUrl, { access_token: params['access_token'] },{
    headers : {
    'Content-Type': 'application/json'
  }}) .then(response => {
        // Handle the API response
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
    }
  }

function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '413309332388-asggfrgcbh5r1vul4eqv0l3t4o0dsq5h.apps.googleusercontent.com',
                'redirect_uri': 'http://localhost:3000/auth/callback',
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/service.management.readonly',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
</script>
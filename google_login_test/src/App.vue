
<template>
  <button @click="oauthSignIn">Login Using Google</button>
</template>

<script setup>
import axios from 'axios';
import { googleTokenLogin } from "vue3-google-login"
import { convertArrayToCSV } from "convert-array-to-csv"

const apiUrl = 'https://localhost:7297/Google/';
const apiUrl2 = 'https://localhost:7174/Test/Test';
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
      axios.post(apiUrl, { accessToken: params['access_token'] },{
    headers : {
    'Content-Type': 'application/json'
  }}) .then(response => {
        // Handle the API response
        const data = response.data

     // Create an array to store the flattened data for all combinations
     const flattenedDataArray = [];


     data.forEach(project => {
      project.aiServices.forEach(aiService => {
         const flattenedData = {
         projectId: project.projectId,
         projectName: project.projectName,
         aiServiceId: aiService.id,
         aiServiceName: aiService.name,
         aiServiceDescription: aiService.description,
         aiServiceVersion: aiService.version
        };

      flattenedDataArray.push(flattenedData);
  });
});

      const csvFromArrayOfObjects = convertArrayToCSV(flattenedDataArray, {
        header: ['projectId', 'projectName', 'aiServiceId', 'aiServiceName', 'aiServiceDescription', 'aiServiceVersion'],
        separator: ','
      });

        getCSVFile(csvFromArrayOfObjects)
        console.log(data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    }
  }


  function getCSVFile(csvData) {
         let anchor = document.createElement('a');
         anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
         anchor.target = '_blank';
         anchor.download = 'test.csv';
         anchor.click();
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
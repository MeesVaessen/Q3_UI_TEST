
<template>
  <button @click="login">Login Using Google</button>
</template>

<script setup>
import axios from 'axios';
import { googleTokenLogin } from "vue3-google-login"

const login = () => {
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response);

    const apiUrl = 'https://localhost:7174/Test/test';

    // Send the access token in the request body as a JSON object
    axios.post(apiUrl, { access_token: response.access_token },{
    headers : {
    'Content-Type': 'application/json'
  }})
      .then(response => {
        // Handle the API response
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  });
};
</script>
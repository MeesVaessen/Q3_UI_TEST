
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
       // Make an HTTP POST request using fetch
       fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(response)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the JSON response from the server
        console.log('Response from server:', data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
  });
};
</script>
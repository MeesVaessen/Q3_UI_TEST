
<template>
  <button @click="login">Login Using Google</button>
</template>

<script setup>
import axios from 'axios';
import { googleTokenLogin } from "vue3-google-login"

const login = () => {
  googleTokenLogin().then((response) => {
    console.log("Handle the response", response)
    const apiUrl = 'https://localhost:7174/Test/test';

    axios.post(apiUrl, response)
  .then(response => {
    // Handle the API response
    console.log(response.data);
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
  })
}
</script>
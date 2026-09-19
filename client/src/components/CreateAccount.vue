<script setup>
import { ref } from "vue";
import axios from 'axios';

const form = ref(null);
const email = ref("");
const userName = ref("");
const password = ref("");
const loginMessage = ref("");
const responseCode = ref("");

const userNameRules = [
  (value) => !!value || "UserName is required.",
  (value) => /^[^0-9_]+[a-zA-Z0-9_]*$/.test(value) || "Enter a valid user name (Only A-Z, a-z, 0-9, _ can be used, and can not start with a number or underscore)."
];

const emailRules = [
  (value) => !!value || "Email is required.",
  (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Enter a valid email address."
];

const passwordRules = [
  (value) => !!value || "Password is required.",
  (value) => value.length >= 6 || "Password must be at least 6 characters."
];

const handleLogin = async () => {
  const { valid } = await form.value.validate();

  if (valid) {
    loginMessage.value = "Login form is valid. Backend connection will be added next.";
    // Make an API call - To be added in future
    
    const api = axios.create({
        baseURL: 'http://localhost:3001/api',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    try{
        const response = await api.post('/account/create', {
            "email": email.value,
            "password": password.value
        })

        console.log("response: ", response);

        responseCode.value = response.status;
    } catch (error) {
        console.log("failed to create account", error);
        responseCode.value = 500;
    }

  } else {
    loginMessage.value = "";
  }
};
</script>

<template>
  <v-app>
    <v-form ref="form" @submit.prevent="handleLogin">
     <!-- <v-text-field
        v-model="userName"
        :rules="userNameRules"
        label="User Name"
        type="text"
        variant="outlined"
      /> -->

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email address"
        type="email"
        variant="outlined"
      />

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        variant="outlined"
      />
      <v-btn block color="primary" size="large" type="submit"> Create Account </v-btn>
    </v-form>

    <v-alert
        v-if="responseCode === 200"
        color="success"
        icon="$success"
        title="Welcome"
        text="Successfully Created Your Account!!!"
        variant="outlined"
        rounded="true">
    </v-alert>

    <v-alert
        v-if="responseCode === 500"
        color="error"
        icon="$error"
        title="Error"
        text="Failed to create your account"
        variant="outlined"
        rounded="true">
    </v-alert>


    

    <!-- <v-snackbar
    v-model="showSuccess"
    v-if="responseCode === 200"
    color="success"
    location="top right"
    :timeout="3000"
    >
    Account created successfully!

    <template #actions>
        <v-btn
        variant="text"
        @click="showSuccess = false"
        >
        Close
        </v-btn>
    </template>
    </v-snackbar> -->

  </v-app>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f4f7fb;
}
</style>

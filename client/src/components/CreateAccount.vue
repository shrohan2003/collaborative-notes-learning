<script setup>
import { ref } from "vue";

const form = ref(null);
const email = ref("");
const userName = ref("");
const password = ref("");
const loginMessage = ref("");

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
  } else {
    loginMessage.value = "";
  }
};
</script>

<template>
  <v-app>
    <v-form ref="form" @submit.prevent="handleLogin">
     <v-text-field
        v-model="userName"
        :rules="userNameRules"
        label="User Name"
        type="text"
        variant="outlined"
      />

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
  </v-app>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f4f7fb;
}
</style>

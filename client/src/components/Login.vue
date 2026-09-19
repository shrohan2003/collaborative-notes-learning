<script setup>
import { ref } from 'vue'

const form = ref(null)
const email = ref('')
const password = ref('')
const loginMessage = ref('')

const emailRules = [
  (value) => !!value || 'Email is required.',
  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    'Enter a valid email address.',
]

const passwordRules = [
  (value) => !!value || 'Password is required.',
  (value) =>
    value.length >= 6 || 'Password must be at least 6 characters.',
]

const handleLogin = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    loginMessage.value =
      'Login form is valid. Backend connection will be added next.'
  } else {
    loginMessage.value = ''
  }
}
</script>

<template>
  <v-app>
    <v-main class="login-page">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4">
            <v-card class="pa-6" elevation="8" rounded="lg">
              <v-card-title class="text-h4 font-weight-bold">
                Welcome back
              </v-card-title>

              <v-card-subtitle class="mt-2">
                Log in to continue to Collaborative Notes.
              </v-card-subtitle>

              <v-card-text class="pt-6">
                <v-alert
                  v-if="loginMessage"
                  class="mb-4"
                  type="success"
                  variant="tonal"
                >
                  {{ loginMessage }}
                </v-alert>

                <v-form ref="form" @submit.prevent="handleLogin">

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
                  <v-btn block color="primary" size="large" type="submit">
                    Log in
                  </v-btn>
                </v-form>
              </v-card-text>

              <v-card-actions class="justify-center">
                <span>New here?</span>
                <v-btn color="primary" variant="text">
                  Create account
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f4f7fb;
}
</style>
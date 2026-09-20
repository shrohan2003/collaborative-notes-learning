<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref(null)
const email = ref('')
const password = ref('')
const errorMessage = ref('')

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

const createAccount = async () => {
  const check = await form.value.validate()

  if (!check.valid) {
    return
  }

  try {
    await axios.post('http://localhost:3001/api/account/create', {
      email: email.value,
      password: password.value,
    })

    router.push('/login')
  } catch {
    errorMessage.value = 'Could not create your account.'
  }
}
</script>

<template>
  <v-app>
    <v-main class="create-page">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4">
            <v-card class="pa-6" elevation="8" rounded="lg">
              <v-card-title class="text-h4 font-weight-bold">
                Create account
              </v-card-title>

              <v-card-subtitle class="mt-2">
                Create an account for Collaborative Notes.
              </v-card-subtitle>

              <v-card-text class="pt-6">
                <v-alert
                  v-if="errorMessage"
                  class="mb-4"
                  type="error"
                  variant="tonal"
                >
                  {{ errorMessage }}
                </v-alert>

                <v-form ref="form" @submit.prevent="createAccount">
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
                    Create account
                  </v-btn>
                </v-form>
              </v-card-text>

              <v-card-actions class="justify-center">
                <span>Already have an account?</span>

                <v-btn
                  color="primary"
                  variant="text"
                  @click="router.push('/login')"
                >
                  Log in
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
.create-page {
  min-height: 100vh;
  background: #f4f7fb;
}
</style>
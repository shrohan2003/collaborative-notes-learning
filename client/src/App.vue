<script setup>
import { reactive, ref } from 'vue'

const API = 'http://localhost:5000'

const mode = ref('login')
const user = reactive({
  name: '',
  email: '',
  password: '',
})

const message = ref('')
const messageType = ref('success')

function toggleMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  message.value = ''
  user.name = ''
  user.email = ''
  user.password = ''
}

async function submit() {
  const isRegister = mode.value === 'register'

  if (!user.email || !user.password || (isRegister && !user.name)) {
    messageType.value = 'error'
    message.value = 'Please fill in all required fields.'
    return
  }

  if (!isRegister) {
    messageType.value = 'success'
    message.value = 'Login API will be added next.'
    return
  }

  try {
    const response = await fetch(`${API}/api/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })

    const data = await response.json()

    if (!response.ok) {
      messageType.value = 'error'
      message.value = data.message
      return
    }

    messageType.value = 'success'
    message.value = 'Account created. You can log in now.'
    mode.value = 'login'
    user.name = ''
    user.password = ''
  } catch {
    messageType.value = 'error'
    message.value = 'Could not connect to the server.'
  }
}
</script>

<template>
  <v-app>
    <v-main class="page">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4">
            <v-card class="pa-6" elevation="8" rounded="lg">
              <v-card-title class="text-h4 text-center font-weight-bold">
                {{ mode === 'register' ? 'Create account' : 'Welcome back' }}
              </v-card-title>

              <v-card-subtitle class="text-center mt-2">
                {{
                  mode === 'register'
                    ? 'Create an account for Collaborative Notes.'
                    : 'Log in to continue to Collaborative Notes.'
                }}
              </v-card-subtitle>

              <v-card-text class="pt-6">
                <v-alert
                  v-if="message"
                  class="mb-4"
                  :type="messageType"
                  variant="tonal"
                >
                  {{ message }}
                </v-alert>

                <form @submit.prevent="submit">
                  <v-text-field
                    v-if="mode === 'register'"
                    v-model="user.name"
                    label="Full name"
                    variant="outlined"
                  />

                  <v-text-field
                    v-model="user.email"
                    label="Email address"
                    type="email"
                    variant="outlined"
                  />

                  <v-text-field
                    v-model="user.password"
                    label="Password"
                    type="password"
                    variant="outlined"
                  />

                  <v-btn block color="primary" size="large" type="submit">
                    {{ mode === 'register' ? 'Create account' : 'Log in' }}
                  </v-btn>
                </form>
              </v-card-text>

              <div class="account-switch">
                <span>
                  {{ mode === 'register' ? 'Already have an account?' : 'New here?' }}
                </span>

                <v-btn color="primary" variant="text" @click="toggleMode">
                  {{ mode === 'register' ? 'Log in' : 'Create account' }}
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #f4f7fb;
}

.account-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding-bottom: 16px;
}
</style>



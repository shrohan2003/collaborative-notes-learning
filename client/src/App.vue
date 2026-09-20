<script setup>
import { ref } from 'vue'
import Login from './components/Login.vue'
import CreateAccount from './components/CreateAccount.vue'

const page = ref('login')
const userEmail = ref('')

function showWelcome(email) {//after logun
  userEmail.value = email
  page.value = 'welcome'
}
</script>

<template>
  <Login
    v-if="page === 'login'"
    @go-create="page = 'create'"
    @logged-in="showWelcome"
  />

  <CreateAccount v-else-if="page === 'create'" />

  <v-app v-else>
    <v-main class="d-flex align-center justify-center">
      <div class="text-center">
        <h1>Welcome</h1>
        <p>{{ userEmail }}</p>
        <v-btn color="primary" @click="page = 'login'">
          Log out
        </v-btn>
      </div>
    </v-main>
  </v-app>
</template>
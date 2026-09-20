<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const email = localStorage.getItem('userEmail')

function logout() {
  localStorage.removeItem('userEmail')
  router.push('/login')
}
</script>

<template>
  <v-app>
    <v-main class="d-flex align-center justify-center">
      <div class="text-center">
        <h1>Welcome</h1>
        <p>{{ email }}</p>

        <v-btn color="primary" @click="logout">
          Log out
        </v-btn>
      </div>
    </v-main>
  </v-app>
</template>
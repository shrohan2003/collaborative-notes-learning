import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import CreateAccount from '../components/CreateAccount.vue'
import WelcomeView from '../views/WelcomeView.vue'

const routes = [
  {
    path: '/',
    redirect: () => {
      const email = localStorage.getItem('userEmail')

      if (email) {
        return '/welcome'
      }

      return '/login'
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/create-account',
    component: CreateAccount,
  },
  {
    path: '/welcome',
    component: WelcomeView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const email = localStorage.getItem('userEmail')

  if (to.path === '/welcome' && !email) {
    return '/login'
  }
})

export default router
<template>
  <Transition name="fade">
    <div v-if="isVisible" class="login-wrapper" @click.self="closeModal">
      <div class="login-modal">
        <button class="close-btn" @click="closeModal" aria-label="Close dialog">&times;</button>

        <div class="header">
          <h4>{{ currentView === 'login' ? 'Sign In' : 'Create Account' }}</h4>
          <p>
            {{
              currentView === 'login'
                ? 'Welcome back! Please enter your details.'
                : 'Join us today! Please fill in your details.'
            }}
          </p>
        </div>

        <div class="form-container">
          <div v-if="currentView === 'login'" class="view-content">
            <div class="form-group">
              <label>Username</label>
              <input
                v-model="loginForm.username"
                type="text"
                placeholder="Enter your username"
                class="input-field"
              />

              <label>Password</label>
              <input
                v-model="loginForm.password"
                type="password"
                placeholder="Enter your password"
                class="input-field"
              />
            </div>

            <div class="options">
              <a href="#" class="forgot-link">Forgot Password?</a>
            </div>

            <RainbowButton @click="login" class="submit-btn"> Sign In </RainbowButton>

            <p class="switch-text">
              Don't have an account? <a href="#" @click.prevent="currentView = 'signup'">Sign Up</a>
            </p>
          </div>

          <div v-else class="view-content">
            <div class="form-group">
              <label>Full Name</label>
              <input
                v-model="signupForm.name"
                type="text"
                placeholder="John Doe"
                class="input-field"
              />

              <label>Email Address</label>
              <input
                v-model="signupForm.email"
                type="email"
                placeholder="name@example.com"
                class="input-field"
              />

              <label>Password</label>
              <input
                v-model="signupForm.password"
                type="password"
                placeholder="Create a password"
                class="input-field"
              />
            </div>

            <RainbowButton @click="signup" class="submit-btn mt-6">
              Create Account
            </RainbowButton>

            <p class="switch-text">
              Already have an account?
              <a href="#" @click.prevent="currentView = 'login'">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import RainbowButton from '@/components/ui/rainbow-button/RainbowButton.vue'

const isVisible = ref(true)
const currentView = ref<'login' | 'signup'>('login') // Toggle state

const loginForm = reactive({
  username: '',
  password: '',
})

const signupForm = reactive({
  name: '',
  email: '',
  password: '',
})


import { getAuth, signInWithEmailAndPassword  , createUserWithEmailAndPassword} from "firebase/auth";


function signup(){

  console.log(signupForm)

const auth = getAuth();
createUserWithEmailAndPassword(auth, signupForm.email, signupForm.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...

    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

}

function login(){
  const auth = getAuth();
        signInWithEmailAndPassword(auth, loginForm.username, loginForm.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;


            
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;




          });
}

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const handleLogin = () => {
  console.log('Login Submit:', { ...loginForm })
}

const handleSignup = () => {
  console.log('Signup Submit:', { ...signupForm })
}
</script>

<style scoped>
.login-wrapper {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.login-modal {
  position: relative;
  background-color: #121212;
  padding: 40px;
  width: 90%;
  max-width: 400px;
  border-radius: 24px;
  border: 1px solid #2a2a2a;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  /* Added to prevent height jumping when switching views */
  min-height: 480px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 28px;
  cursor: pointer;
  line-height: 1;
}

.header {
  text-align: center;
  margin-bottom: 25px;
}

.header h4 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
}

.header p {
  color: #94a3b8;
  margin-top: 8px;
  font-size: 0.9rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #cbd5e1;
  margin-top: 12px;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  background-color: #1e1e1e;
  border: 1px solid #334155;
  border-radius: 12px;
  font-size: 1rem;
  color: #ffffff;
}

.options {
  display: flex;
  justify-content: flex-end;
  margin: 12px 0 24px 0;
}

.forgot-link {
  font-size: 0.85rem;
  color: #a07cfe;
  text-decoration: none;
}

.submit-btn {
  width: 100%;
  height: 50px;
  font-weight: 600;
}

.mt-6 {
  margin-top: 24px;
}

.switch-text {
  margin-top: 25px;
  text-align: center;
  font-size: 0.9rem;
  color: #94a3b8;
}

.switch-text a {
  color: #fe8fb5;
  font-weight: 700;
  text-decoration: none;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

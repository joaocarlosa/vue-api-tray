<template>
  <div>
    <h1>Login</h1>
    <p v-if="message">{{ message }}</p>
    <form @submit.prevent="loginUser">
      <div class="input-field">
        <input v-model="loginData.email" type="email" id="email" />
        <label for="email">Email</label>
      </div>
      <div class="input-field">
        <input v-model="loginData.password" type="password" id="password" />
        <label for="password">Password</label>
      </div>
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';


export default defineComponent({
  setup() {
    const loginData = ref({
      email: '',
      password: ''
    });
    const message = ref('');

    const loginUser = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, loginData.value);
        console.log('Login successful:', response.data);
        message.value = 'Login successful!';
        window.sessionStorage.setItem('authToken', response.data.token);
        window.sessionStorage.setItem('isLoggedIn', 'true');

        console.log(window.sessionStorage.setItem('authToken', response.data.token));
      } catch (error) {
        window.sessionStorage.removeItem('authToken');
        window.sessionStorage.removeItem('isLoggedIn');
        console.error('Login failed:', error);
        message.value = 'Login failed.';
      }
    };

    return {
      loginData,
      loginUser,
      message
    };
  }
});
</script>

<template>
  <div>
    <h1>Registro</h1>
    <!-- Exibir a mensagem aqui -->
    
    <form @submit.prevent="registerUser">
      <div class="input-field">
        <input v-model="formData.name" type="text" id="name" />
        <label for="name">Nome</label>
      </div>
      <div class="input-field">
        <input v-model="formData.email" type="email" id="email" />
        <label for="email">Email</label>
      </div>
      <div class="input-field">
        <input v-model="formData.password" type="password" id="password" />
        <label for="password">Senha</label>
      </div>
      
      <div class="input-field">
        <input v-model="formData.password_confirmation" type="password" id="password_confirmation" />
        <label for="password_confirmation">Confirmação de Senha</label>
      </div>
      <p v-if="message">{{ message }}</p>
      <button type="submit" class="btn">Registrar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';


export default defineComponent({
  setup() {
    const formData = ref({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    });
    const message = ref('');

    const registerUser = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/register`, formData.value);
        console.log('Registro bem-sucedido:', response.data);
        message.value = 'Registro Inserido.'; 
      } catch (error) {
        message.value = 'Falha ao inserir o registro.'; 
      }
    };

    return {
      formData,
      registerUser,
      message
    };
  }
});
</script>

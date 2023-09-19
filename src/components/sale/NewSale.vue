<template>
    <router-link to="/sale" class="btn btn-primary">Voltar</router-link>
    <div>
      <h1>Cadastrar Nova venda</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="seller_id">ID do Vendedor:</label>
          <input type="number" v-model="formData.seller_id" id="seller_id" required>
        </div>
  
        <div>
          <label for="value">Valor:</label>
          <input type="number" step="0.01" v-model="formData.value" id="value" required>
        </div>
  
        <div>
          <label for="sale_date">Data da Venda:</label>
          <input type="date" v-model="formData.sale_date" id="sale_date" required>
        </div>
  
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { API_BASE_URL, getAuthHeaders } from '../../api/config';
  
  export default defineComponent({
    setup() {
      const router = useRouter();
      const headers = getAuthHeaders();
      const formData = reactive({
        seller_id: '',
        value: '',
        sale_date: ''
      });
  
      const submitForm = async () => {
        try {
          await axios.post(`${API_BASE_URL}/sales`, formData, { headers });
          router.push('/sale');
        } catch (error) {
          console.error('An error occurred while creating the sale: ', error);
        }
      };
  
      return { formData, submitForm };
    }
  });
  </script>
  
<template>
  <div>
    <h1>Novo Vendedor</h1>
    <form @submit.prevent="createSeller">
      <label for="name">Nome</label>
      <input id="name" v-model="newSeller.name" type="text" required />

      <label for="email">Email</label>
      <input id="email" v-model="newSeller.email" type="email" required />

      <button type="submit" class="btn btn-primary">Criar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../../api/config';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const newSeller = ref({
      name: '',
      email: ''
    });
    const router = useRouter();
    const headers = getAuthHeaders();

    const createSeller = async () => {
      try {
        await axios.post(`${API_BASE_URL}/sellers`, newSeller.value, { headers });
        router.push({ name: 'seller' });
      } catch (error) {
        console.error('Ocorreu um erro ao criar o novo vendedor:', error);
      }
    };

    return {
      newSeller,
      createSeller
    };
  }
});
</script>

<style>
  /* Seu CSS aqui */
</style>

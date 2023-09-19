<template>
  <div>
    <div class="mb-4 mt-4 ml-4 mr-4">
      <router-link to="/seller" class="btn btn-primary">Voltar</router-link>
    </div>
    <h1 class="mt-4">Editar Vendedor</h1>
    <form @submit.prevent="updateSeller">
      <label for="id">ID</label>
      <input disabled id="id" v-model="seller.id" type="number" />

      <label for="name">Nome</label>
      <input id="name" v-model="seller.name" type="text" />

      <label for="email">Email</label>
      <input id="email" v-model="seller.email" type="email" />

      <label for="created_at">Criado em</label>
      <input disabled id="created_at" v-model="seller.created_at" type="text" />

      <label for="updated_at">Atualizado em</label>
      <input disabled id="updated_at" v-model="seller.updated_at" type="text" />

      <button type="submit" class="btn btn-primary">Atualizar</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../../api/config';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const headers = getAuthHeaders();

    const seller = ref({
      id: route.query.id,
      name: route.query.name,
      email: route.query.email,
      created_at: route.query.created_at,
      updated_at: route.query.updated_at
    });

    const updateSeller = async () => {
      try {
        const payload = {
          name: seller.value.name,
          email: seller.value.email
        };

        await axios.put(`${API_BASE_URL}/sellers/${seller.value.id}`, payload, { headers });
        router.push({ name: 'seller' });
      } catch (error) {
        console.error('Ocorreu um erro ao atualizar o vendedor:', error);
      }
    };

    return { seller, updateSeller };
  }
});
</script>

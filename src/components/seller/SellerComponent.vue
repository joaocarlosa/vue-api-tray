<template>
  <div>
    <h1>Vendedores</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Criado em</th>
          <th>Atualizado em</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="seller in paginatedSellers" :key="seller.id">
          <td>{{ seller.id }}</td>
          <td>{{ seller.name }}</td>
          <td>{{ seller.email }}</td>          
          <td>{{ formatDate(seller.created_at) }}</td>
          <td>{{ formatDate(seller.updated_at) }}</td>
        </tr>
      </tbody>
    </table>
    <button class="waves-effect waves-light btn-small" @click="previousPage"
      :disabled="currentPage <= 1">Anterior</button>
    <button class="waves-effect waves-light btn-small" @click="nextPage"
      :disabled="currentPage >= pageCount">Próximo</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../../api/config';

export default defineComponent({
  setup() {
    // Estado
    const sellers = ref<any[]>([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    // Função para buscar vendedores da API
    const fetchSellers = async () => {
      const headers = getAuthHeaders();
      try {
        const response = await axios.get(`${API_BASE_URL}/sellers`, { headers });
        // Validar o formato dos dados recebidos
        if (Array.isArray(response.data)) {
          sellers.value = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          sellers.value = response.data.data;
        } else {
          console.warn("O formato dos dados recebidos é inesperado.");
        }
      } catch (error) {
        console.error('Erro ao buscar os vendedores:', error);
      }
    };

    // Computeds para paginação
    const paginatedSellers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return sellers.value.slice(start, end);
    });

    const pageCount = computed(() => Math.ceil(sellers.value.length / itemsPerPage));

    // Funções para manipulação da paginação
    const nextPage = () => {
      if (currentPage.value < pageCount.value) {
        currentPage.value++;
      }
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    // Buscar os dados ao montar o componente
    onMounted(() => {
      fetchSellers();
    });

    const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // Aqui você pode formatar a data como desejar
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

    // Retorno do setup
    return {
      sellers,
      paginatedSellers,
      currentPage,
      nextPage,
      previousPage,
      pageCount,
      formatDate
    };
  },
});
</script>


<style>
/* Seu CSS aqui */
</style>

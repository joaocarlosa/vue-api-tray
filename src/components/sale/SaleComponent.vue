<template>
  <div>
    <router-link to="/new-sale" class="btn btn-primary">Nova venda</router-link>
    <h1>Lista de Vendas</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>ID do vendedor</th>
          <th>Valor</th>
          <th>Comissão</th>
          <th>Data da Venda</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in paginatedSales" :key="sale.id">
          <td>{{ sale.id }}</td>
          <td>{{ sale.seller_id }}</td>
          <td>{{ sale.value }}</td>
          <td>{{ sale.commission }}</td>
          <td>{{  sale.sale_date}}</td>
          <td>
            <button class="waves-effect waves-light btn-tiny" @click="deleteSale(sale.id)"><i
                class="material-icons">delete</i></button>
                <button class="waves-effect waves-light btn-tiny" @click="editSale(sale)"><i class="material-icons">edit</i></button>
          </td>
     
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
import { defineComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../../api/config';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const sales = ref([]);
    const headers = getAuthHeaders();
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const fetchSales = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/sales`, { headers });
        sales.value = response.data.data;
      } catch (error) {
        console.error('An error occurred while fetching the data: ', error);
      }
    };

    const deleteSale = async (id: any) => {
      const userConfirmed = window.confirm("Tem certeza de que deseja excluir esta venda?");
      
      if (userConfirmed) {
        try {
          const headers = getAuthHeaders();
          await axios.delete(`${API_BASE_URL}/sales/${id}`, { headers });
          fetchSales();
        } catch (error) {
          console.error(`An error occurred while deleting sale ID ${id}: `, error);
        }
      }
    };


    onMounted(() => {
      fetchSales();
    });

    const paginatedSales = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return sales.value.slice(start, end);
    });

    const pageCount = computed(() => {
      return Math.ceil(sales.value.length / itemsPerPage);
    });

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

    const router = useRouter();

    const editSale = (sale: any) => { 
      router.push({
        name: 'edit-sale',
        query: {
          id: sale.id,
          seller_id: sale.seller_id,
          value: sale.value,
          commission: sale.commission,
          sale_date: sale.sale_date
        }
      });
    };

    return {
      sales,
      paginatedSales,
      currentPage,
      nextPage,
      previousPage,
      pageCount,
      deleteSale,
      editSale
    };
  }
});
</script>



<style></style>

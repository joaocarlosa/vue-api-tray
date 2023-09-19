<template>
  <div>
    <div class="mb-4 mt-4 ml-4 mr-4">
      <router-link to="/sale" class="btn btn-primary">Voltar</router-link>
    </div>
    <h1 class="mt-4">Edit Sale</h1>
    <form @submit.prevent="updateSale">
      <label for="seller_id">Seller ID</label>
      <input id="seller_id" v-model="sale.seller_id" type="number" />
      
      <label for="value">Value</label>
      <input id="value" v-model="sale.value" type="text" />

      <label for="commission">Commission</label>
      <input disabled selected id="commission" v-model="sale.commission" type="text" />

      <label for="sale_date">Sale Date</label>
      <input id="sale_date" v-model="sale.sale_date" type="date" />

      <button type="submit" class="btn btn-primary">Update</button>
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

    const sale = ref({      
    id: route.query.id,
    seller_id: route.query.seller_id,
    value: route.query.value,
    commission: route.query.commission,
    sale_date: route.query.sale_date
    });

    const updateSale = async () => {
      try {
        await axios.put(`${API_BASE_URL}/sales/${sale.value.id}`, sale.value, { headers });
        router.push({ name: 'sale' });  
      } catch (error) {
        console.error('An error occurred while updating the sale:', error);
      }
      
    };

    return { sale, updateSale };
  }
});
</script>

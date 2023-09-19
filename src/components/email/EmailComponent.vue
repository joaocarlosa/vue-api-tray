
import LoginComponentVue from '../auth/LoginComponent.vue';
<template>
    <div class="container">


        <!-- Título -->
        <h4 class="center-align mt-5">Enviar emails</h4>

        <!-- Tabela -->
        <table class="highlight">
            <thead>
                <tr>
                    <th>Título</th>
                    <th></th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Enviar email com resumo de vendas</td>
                    <td></td>
                    <td><button class="btn waves-effect waves-light" @click="sendSalesEmail">Enviar</button></td>
                </tr>
                <tr>
                    <td>Enviar Email com resumo de vendas para Administrador</td>
                    <td></td>
                    <td><button class="btn waves-effect waves-light" @click="sendAdminSalesEmail">Enviar</button></td>
                </tr>
                <tr>
                    <td>Reenviar email com resumo de vendas de um vendedor</td>
                    <td><input id="seller_id" /></td>
                    <td><button class="btn waves-effect waves-light" @click="resendVendorSalesEmail">Enviar</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
  
<script lang="ts">
import axios from 'axios';
import { API_BASE_URL, getAuthHeaders } from '../../api/config';

export default {
    methods: {
        async sendSalesEmail() {
            const headers = getAuthHeaders();
            try {
                const response = await axios.get(`${API_BASE_URL}/summary-email`, { headers });
                alert(`Resumo de vendas enviado com sucesso: ${JSON.stringify(response.data)}`);
            } catch (error) {
                alert(`Erro ao enviar resumo de vendas: ${error}`);
                console.error('Erro ao enviar resumo de vendas:', error);
            }
        },
        async sendAdminSalesEmail() {
            const headers = getAuthHeaders();
            try {
                const response = await axios.post(`${API_BASE_URL}/send-admin-sales`, { headers });
                alert(`Resumo de vendas enviado ao administrador com sucesso: ${JSON.stringify(response.data)}`);
            } catch (error) {
                alert(`Erro ao enviar resumo de vendas ao administrador: ${error}`);
                console.error('Erro ao enviar resumo de vendas ao administrador:', error);
            }
        },
        async resendVendorSalesEmail() {
            const headers = getAuthHeaders();
            const sellerId = (document.getElementById('seller_id') as HTMLInputElement).value;
            console.log(sellerId);
            if (!sellerId) {
                alert('Por favor, insira um ID de vendedor válido.');
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/resend-summary-email/${sellerId}`, { headers });
                alert(`Email com resumo de vendas reenviado com sucesso para o vendedor com ID ${sellerId}: ${JSON.stringify(response.data)}`);
            } catch (error) {
                alert(`Erro ao reenviar email com resumo de vendas: ${error}`);
                console.error('Erro ao reenviar email com resumo de vendas:', error);
            }
        },
    }
}
</script>
  
<style scoped></style>
  
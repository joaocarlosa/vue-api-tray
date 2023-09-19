<template>
  <div id="app">
    <nav class="grey darken-4">
      <div class="nav-wrapper">
        <a href="#" class="brand-logo" style="padding-left: 20px;">Tray</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link class="text-white text-lg hover:underline" to="/">Home</router-link></li>
          <li><router-link class="text-white text-lg hover:underline" to="/register">Register</router-link></li>
          <li><router-link class="text-white text-lg hover:underline" to="/login">Login</router-link></li>
        </ul>
      </div>
    </nav>

    <div class="content-wrapper">

      <div v-if="authToken">
        <!-- Lista de links -->
        <div class="row mt-5">
          <div class="col s4">
            <router-link to="/sale">Vendas</router-link>
          </div>
          <div class="col s4">
            <router-link to="/seller">Vendedores</router-link>
          </div>
          <div class="col s4">
            <router-link to="/email">Email</router-link>
          </div>
        </div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      authToken: null,
    };
  },
  mounted() {
    this.authToken = window.sessionStorage.getItem('authToken');
  },
};
</script>

<style>
.content-wrapper {
  margin-top: 20px;
  width: 80%;
  padding: 0 10%;
  text-align: center;
}
</style>

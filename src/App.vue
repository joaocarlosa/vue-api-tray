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
      <router-view />
    </div>
  </div>
</template>

<style>
.content-wrapper {
  margin-top: 20px;
  width: 80%;
  padding: 0 10%; /* Adicione o espaçamento nas laterais usando padding */
  text-align: center; /* Centraliza o conteúdo horizontalmente */
}


</style>

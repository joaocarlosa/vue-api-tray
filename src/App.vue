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
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
}
</style>

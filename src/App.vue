<script setup lang="ts">
</script>

<template>
  <div id="app">
    <router-view></router-view>
    <nav class="bottom-nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/login">登录</router-link> |
      <router-link to="/register">注册</router-link> |
      <router-link to="/profile">个人中心</router-link> |
      <router-link to="/info">实用信息</router-link>
    </nav>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  position: relative;
  min-height: 100vh;
}

.bottom-nav {
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f8f9fa;
  border-top: 1px solid #e7e7e7;
  font-size: 0.8rem;
}

.bottom-nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 5px;
}

.bottom-nav a.router-link-exact-active {
  color: #42b983;
}
</style>



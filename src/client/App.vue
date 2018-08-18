<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
* {
  border: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  border: 0;
  outline: 0;
  padding: 10px;
  border-radius: 10px;
  background: white;
  border: 1px solid #ff9f9f;
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}

button:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

button:active {
  background: #ff9f9f;
}
</style>

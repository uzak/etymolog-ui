<template>
  <div id="app">
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './components/Footer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Footer
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 800px;
  margin-top: 60px;
}
</style>

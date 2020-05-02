<template>
  <div id="app">
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 800px;
  /*
  border: 1px solid black;
  */
  
}

a {
  color: #42b983;
}

</style>

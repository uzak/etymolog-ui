<template>
  <div>
    <h1>Etymolog</h1>
    <div><router-link to="/search">search</router-link> for a word</div>
    <div><router-link to="/dictionaries">dictionaries</router-link></div>
    <div><router-link to="/sources">sources</router-link></div>
    <div><router-link to="/tags">tags</router-link></div>
  </div>
</template>

<script>

export default {
  name: 'Main'
}
</script>

<style scoped>
</style>

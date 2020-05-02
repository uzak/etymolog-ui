<template>
  <div>
    <h1>Search</h1>
    <input placeholder="vid"> 
    <h2>Exact matches</h2>
    <div>
      <router-link to="/word/sa:vid">sa:vid</router-link>
    </div>
    <h2>Fuzzy find</h2>
    <div>
      <router-link to="/word/sk:vidieť">sk:vidieť</router-link>
    </div>
    <div>
      <router-link to="/word/lat:videre">lat:videre</router-link>
    </div>
    <div>
      <router-link to="/word/en:video">lat:video</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Search',
}
</script>

<style scoped>
</style>
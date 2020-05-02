<template>
  <div>
    <h1>Tag: #{{$route.params.id}}</h1>
    <div>
      <router-link to="/word/sk:Dunaj">sk:Dunaj</router-link>
    </div>
    
    <div>
      <router-link to="/word/ru:Volga">ru:Volga</router-link>
    </div>
    
    <div>
      <router-link to="/word/sa:Saraswati">sa:Saraswati</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Tag',
}
</script>

<style scoped>
</style>

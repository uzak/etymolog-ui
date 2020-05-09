<template>
  <div>
    <h1>Stats</h1>
    <div>Derived: {{stats.derived}}</div>
    <div>Equals: {{stats.equals}}</div>
    <div>Related: {{stats.related}}</div>
    <div>
      Tags ({{ stats.tags.length }}): 
      <div v-for="tag in stats.tags" :key=tag>
        <router-link :to="'/tag/' + tag">#{{tag}}</router-link>,
      </div>
    </div>
  </div>
</template>

<script>
import Model from '@/model'

export default {
  name: 'Stats',
  data() {
    return {
      "stats": Model.stats()
    }    
  }
}
</script>

<style scoped>
</style>

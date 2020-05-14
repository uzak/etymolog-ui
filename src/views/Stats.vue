<template>
  <div>
    <h1>Stats</h1>
    <div>Derived: {{stats.derived}}</div>
    <div>Equals: {{stats.equals}}</div>
    <div>Related: {{stats.related}}</div>
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

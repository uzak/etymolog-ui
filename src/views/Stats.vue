<template>
  <div>
    <h1>Stats</h1>
    <div>Derived: {{derived}}</div>
    <div>Equals: {{equals}}</div>
    <div>Related: {{related}}</div>
  </div>
</template>

<script>
import Model from '@/model'

export default {
  name: 'Stats',
  computed: {
    derived() {
      return Array.from(Model.stats().derived.keys()).length
    },
    equals() {
      return Array.from(Model.stats().equals.keys()).length
    },
    related() {
      return Array.from(Model.stats().related.keys()).length
    },
  },
}
</script>

<style scoped>
</style>

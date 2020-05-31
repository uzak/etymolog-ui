<template>
  <div>
    <h1><slot></slot></h1>
    <p>
    back to: 
    <span v-for="(obj, idx) in allUrls" :key="idx">
      <span v-for="(label, url) in obj" :key=url>
        <router-link :to="url">{{label}}</router-link>
        <span v-if="idx + 1 < allUrls.length"> / </span>
      </span>
    </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
      back: {
        type: Array
      }
  },
  computed: {
    allUrls: function() {
      let result = [{'/': 'etymolog'}]
      if (this.$props.back)
        result = result.concat(this.$props.back)
      return result
    }
  }
}
</script>

<style scoped>
</style>

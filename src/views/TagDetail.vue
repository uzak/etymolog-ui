<template>
  <div>
    <h1>Tag: #{{$route.params.id}}</h1>
    <div v-for="word in words" :key=word.toString()>
      <router-link :to="'/word/' + word.toString()">{{word}}</router-link>
    </div>
  </div>
</template>

<script>
import Model from '@/model'

export default {
  name: 'TagDetail',
  computed: {
    words: function() {
      let name = this.$route.params.id;
      return Model.stats().tags.get(name) || [];
    }
  }
}
</script>

<style scoped>
</style>

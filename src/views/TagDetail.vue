<template>
  <div>
    <Header :back="[{'/tags': 'tags'}]">Tag: #{{ $route.params.id }}</Header>

    <div v-for="word in words" :key=word.toString()>
      <router-link :to="'/word/' + word.toString()">{{word}}</router-link>
    </div>
  </div>
</template>

<script>
import Model from '@/model'
import Header from '@/components/Header'

export default {
  name: 'TagDetail',
  computed: {
    words: function() {
      let name = this.$route.params.id;
      return Model.tags.get(name) || [];
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
</style>

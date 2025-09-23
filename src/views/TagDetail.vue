<template>
  <div>
    <Header :back="[{'/tags': 'tags'}]">Tag: #{{ $route.params.id }}</Header>

    <div v-for="word in words" :key=word.toString()>
      <router-link :to="'/word/' + word.toString()">{{word}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Model from '@/model'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'TagDetail',
  computed: {
    words: function() {
      let name = this.$route.params.id as string;
      return Model.tags.get(name) || [];
    }
  },
  components: {
    Header
  }
})
</script>

<style scoped>
</style>

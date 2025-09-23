<template>
  <div>
    <Header>Search</Header>

    <h2>Traditional</h2>
      <ul>
        <li v-for="src in traditional" :key=src.value>
          <router-link :to="'/source/' + src.link">{{src.value}} ({{src.words.length}})</router-link>
        </li>
      </ul>
    <h2>Links</h2>
      <ul>
        <li v-for="src in links" :key=src.value>
          <router-link :to="'/source/' + src.link">{{src.value}} ({{src.words.length}})</router-link>
        </li>
      </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Model from '@/model'
import { filter, sortBy } from 'lodash'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'Sources',
  components: {
    Header
  },
  methods: {
  },
  computed: {
    sources() {
      return Array.from(Model.sources.values());
    },
    traditional() {
      let result = filter(this.sources, s => !s.isLink());
      result = sortBy(result, s => s.value.toLowerCase());
      return result;
    },
    links() {
      let result = filter(this.sources, s => s.isLink());
      result = sortBy(result, s => {
        let match = s.value.match(/\/\/(.*)/i);
        return match ? match[1].toLowerCase() : s.value.toLowerCase()
       });
      return result;
    }
  }
})
</script>

<style scoped>
</style>

<template>
  <div>
    <Header :back="[{'/sources': 'sources'}]">
      <span v-if="source.isLink()">Source: <a target="_blank" :href=source.value>{{source.value}}</a></span>
      <span v-else>Source: {{source.value}}</span>
    </Header>
    <div v-for="word in words" :key="word.toString()">
      <router-link :to="'/word/' + word.toString()">{{word.toString()}}</router-link>
    </div>
  </div>
</template>

<script>
import Model from '@/model'
import Header from '@/components/Header'
import { sortBy } from 'lodash';

export default {
  name: 'SourceDetail',
  computed: {
    source: function() {
      let name = this.$route.params.id;
      return Model.sources.get(name);
    },
    words: function() {
      let result = sortBy(this.source.words, s => s.value.toLowerCase()); 
      return result;
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
</style>

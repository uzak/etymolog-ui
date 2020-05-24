<template>
  <div>
    <h1 v-if="source.isLink()">Source: <a target="_blank" :href=source.value>{{source.value}}</a></h1>
    <h1 v-else>Source: {{source.value}}</h1>
    <div v-for="word in words" :key="word.toString()">
      <router-link :to="'/word/' + word.toString()">{{word.toString()}}</router-link>
    </div>
  </div>
</template>

<script>
import Model from '@/model'
import { sortBy } from 'lodash';

export default {
  name: 'SourceDetail',
  computed: {
    source: function() {
      let name = this.$route.params.id;
      return Model.stats().sources.get(name);
    },
    words: function() {
      let result = sortBy(this.source.words, s => s.value.toLowerCase()); 
      return result;
    }
  }
}
</script>

<style scoped>
</style>

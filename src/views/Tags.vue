<template>
  <div>
    <Header>Tags</Header>
    <div>
      Tags ({{ len }}): 
      <ul>
        <li v-for="tag in tags.keys()" :key=tag>
            <router-link :to="'/tag/' + tag">#{{tag}} ({{words_for_tag(tag)}})</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Model from '@/model'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'Tags',
  methods: {
    words_for_tag(tag: string) {
      let words = this.tags.get(tag);
      return words ? words.length : 0;
    },
  },
  computed: {
    tags() {
      return Model.tags;
    },
    len() {
      return Array.from(this.tags).length;
    }
  },
  components: {
    Header
  }
})
</script>

<style scoped>
</style>

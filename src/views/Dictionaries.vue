<template>
  <div>
    <Header>Dictionaries</Header>
    
    <table>
      <thead>
        <tr>
          <th>Language</th>
          <th>Size (Words)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="language in languages" :key=language.name>
          <td>
            <router-link :to="'/dictionaries/' + language.name">{{ language.name }}</router-link>
          </td>
          <td>
            {{ language.wordCount() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Model from '@/model'
import Header from '@/components/Header.vue'

export default defineComponent({
  name: 'Dictionaries',
  components: {
    Header
  },
  computed: {
    languages: function() {
      return Model.allLanguages()
    }
  },
})
</script>

<style scoped>
</style>

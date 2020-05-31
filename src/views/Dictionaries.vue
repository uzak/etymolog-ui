<template>
  <div>
    <Header>Dictionaries</Header>
    
    <table>
      <tr>
        <th>Language</th>
        <th>Size (Words)</th>
      </tr>
      <tr v-for="language in languages" :key=language.name>
        <td>
          <router-link :to="'/dictionaries/' + language.name">{{ language.name }}</router-link>
        </td>
        <td>
          {{ language.wordCount() }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Model from '@/model'
import Header from '@/components/Header'

export default {
  name: 'Dictionaries',
  components: {
    Header
  },
  computed: {
    languages: function() { 
      return Model.allLanguages()
    }
  },
}
</script>

<style scoped>
</style>

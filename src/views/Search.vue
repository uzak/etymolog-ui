<template>
  <div>
    <h1>Search</h1>
    <input v-model="searchStr" placeholder="search string"> 

    <div v-if="!search()">
      Nothing found or your search string is shorter than 3 characters (minimum).
    </div>
    <div v-else>
      <h2>Matches</h2>
      <div v-for="obj in search()" :key="obj['lang'].name">
        {{ obj["lang"].name }}
        <div v-for="word in obj['words']" :key=word.toString() class="search-result">
          <router-link :to="'/word/' + word">{{ word.value }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Model from '@/model'

export default {
  name: 'Search',
  data() {
    return {
      searchStr: ""
    }
  },
  methods: {
    search() {
      let input = this.$data.searchStr.toLowerCase()
      if (input.length < 3)
        return 
      
      let result = []
      for (let lang of Model.allLanguages().values()) {
        let result_lang = []
        for (let word of lang.words.values()) {
          if (word.value.toLowerCase().includes(input))
              result_lang.push(word)
        }
        if (result_lang.length)
          result.push({ "lang" : lang, "words": result_lang})
      }
      return result
    }
  },
  computed: {
    languages: function() { 
      return Model.allLanguages()
    }
  },
}
</script>

<style scoped>
.search-result {
  margin-left: 20pt;
}
</style>
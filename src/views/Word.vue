<template>
  <div>
    <div v-if="word">
      <h1>{{ word }}</h1>
      <p>
      back to <router-link to="/">etymolog</router-link> / <router-link :to="'/dictionaries/' + word.lang.name">{{word.lang.name}}</router-link> language
      </p>

      <WordTree :word="word"/>
    </div>
    <div v-else>
      <h1>{{ $route.params.id}} not found</h1>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Model from "@/model";
import WordTree from "@/components/WordTree/WordTree.vue"

export default Vue.extend({
  name: "Word",
  data() {
    return {};
  },
  computed: {
    word: function() {
      return Model.get_word(this.$route.params.id, false);
    },
  },
  components: {
    "WordTree": WordTree,
  }
});
</script>

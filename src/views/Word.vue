<template>
  <div>
    <h1>{{ word }}</h1>
    <p>
    back to <router-link to="/">etymolog</router-link> / <router-link :to="'/dictionaries/' + word.lang.name">{{word.lang.name}}</router-link> language
    </p>

    <!-- <div>
      Tags:
      <router-link to="/tag/city">#city</router-link>
    </div> -->

    <WordTree :word="word"/>

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
      return Model.get_word(this.$route.params.id);
    },
  },
  components: {
    "WordTree": WordTree,
  }
});
</script>

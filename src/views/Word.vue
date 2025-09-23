<template>
  <div>
    <div v-if="word()">
      <Header :back="[{'/dictionaries': 'dictionaries'}, langBackDict()]">{{ word() }}</Header>

      <WordTree :word="word()"/>
    </div>
    <div v-else>
      <Header>{{ route.params.id}} not found</Header>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRoute } from "vue-router"
import Model from "@/model"
import Header from "@/components/Header.vue"
import WordTree from "@/components/WordTree/WordTree.vue"

export default defineComponent({
  name: "Word",
  setup() {
    const route = useRoute()
    return { route }
  },
  data() {
    return {}
  },
  methods: {
    word: function() {
      return Model.get_word(this.route.params.id as string, false)
    },
    langBackDict: function() {
      let name = this.word()!.lang.name;
      return {["/dictionaries/"+name]: name}
    }
  },
  components: {
    WordTree,
    Header,
  }
});
</script>

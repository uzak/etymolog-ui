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

    const word = () => {
      return Model.get_word(route.params.id as string, false)
    }

    const langBackDict = () => {
      const name = word()?.lang.name
      return name ? {["/dictionaries/"+name]: name} : {}
    }

    return {
      route,
      word,
      langBackDict
    }
  },
  components: {
    WordTree,
    Header,
  }
});
</script>

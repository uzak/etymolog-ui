<template>
  <div>
    <h1>Language: {{ $route.params.id }}</h1>

    <div>
      <input checked type="checkbox" id="showAdditionaInfo">
      <label for="showAdditionalInfo">Show additional info</label>
    </div>
    <div>
      11 Words:
    </div>

    <ul>
      <li v-for="word in words()" :key="word.value">
        {{ word }}
      </li>
    </ul>

    <div class="entry">
      <div>
        <router-link to="/word/celtic:Belenus">Belenus</router-link>
      </div>
      <div class="indent1">
        ~ <router-link to="/word/semitic:Baal">semitic:Baal</router-link>
      </div>
      <div class="indent1">
        -> <router-link to="/word/sa:bhalu">en:bhalu</router-link>
      </div>
    </div>

    
    <div class="entry">
      <div>
        <router-link to="/word/celtic:cathraige">cathraige</router-link>
      </div>
      <div class="indent1">
        servant of the four
      </div>
      <div class="indent1">
        original name of Saint Patrick
      </div>
    </div>

    
    <div class="entry">
      <div>
        <router-link to="/word/celtic:dubras">dubras</router-link>
      </div>
      <div class="indent1">
        = <router-link to="/word/en:waters">en:waters</router-link>
      </div>
      <div class="indent1">
        -> <router-link to="/word/sa:dvipa">sa:dvipa</router-link>
        {<router-link to="/word/sa:dvi">dvi</router-link> + <router-link to="/word/sa:ap">ap</router-link>}
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Model from '@/model'

export default Vue.extend({
  name: 'DictionaryDetail',
  data() {
    return {
    }
  },
  methods: {
    words() {
      let lang = Model.get_lang(this.$route.params.id);
      return lang.words;
    }
  }
});

</script>

<style scoped>
.entry {
  margin-top: 20px;
}

.indent1 {
  margin-left: 50px;
}
</style>

<template>
  <div>
    <h1>Language: {{ lang }}</h1>

    <div>
      <input v-model="hideAdditionalInfo" type="checkbox" id="hideAdditionalInfo">
      <label for="hideAdditionalInfo">Hide additional info</label>
    </div>
    <div>
      {{ words().length }} words:
    </div>

    <span class="entry" v-for="word in words()" :key="word.toString()">
      <div>
        <router-link :to="'/word/' + word">{{ word.value }}</router-link>
        <span v-for="components in unions(word)" :key=components.toString()>
          { 
          <span v-for="(component, index) in components" :key=component.value>
            <router-link :to="'/word/' + component">{{ component.toString(lang) }}</router-link>
            <span v-if="index + 1 < components.length">
              +
            </span>
          </span>
          }
        </span>
      </div>
      <div v-if="!hideAdditionalInfo">

        <div class="indent1 comments">
          <div v-for="comment in comments(word)" :key="comment">
            {{ comment }}
          </div>
        </div>

        <div class="indent1 equals">
          <div v-for="tr in equals(word)" :key="tr.value">
            = <router-link :to="'/word/' + tr">{{ tr }}</router-link>
          </div>
        </div>

        <div class="indent1 related">
          <div v-for="rel in related(word)" :key="rel.value">
            ~ <router-link :to="'/word/' + rel">{{ rel }}</router-link>
          </div>
        </div>
        
        <div class="indent1 derived">
            <Derived :word="word"/>
        </div>
        
      </div>
      
    </span>
    
  </div>
</template>

<script>
import Vue from 'vue'
import Model from '@/model'

let Derived = Vue.extend({
  name: 'Derived',
  functional: true, // preto nie je this...
  props: ['word'],
  render: function(createElement, context) {
    let count = 0
    let result = context.props.word.derivedChain()
    return createElement('div', result.map(item => {
      let symbol = count++ < result.length ? " -> ": "";
      return [
        symbol,
        createElement('router-link', { props: { 'to' : '/word/'+ item.left.toString() }}, item.left.toString())
      ]
    }));
  }
});

export default Vue.extend({
  name: 'DictionaryDetail',
  data() {
    return {
      hideAdditionalInfo: this.$route.query.hideAdditionalInfo !== undefined
    }
  },
  computed: {
    lang: function() { return this.$route.params.id; }
  },
  components: {
    Derived,
  },
  methods: {
    words() {
      let lang = Model.get_lang(this.$route.params.id);
      let result = Array.from(lang.words.values());
      result.sort((a, b) => a.value.localeCompare(b.value))
      return result;
    },
    related(word) {
      return word.related.map(r => r.other(word));
    },
    equals(word) {
      return word.equals.map(r => r.other(word));
    },
    derived(word) {
      return word.derivedFrom.map(r => r.left);
    },
    comments(word) {
      return word.comments;
    },
    unions(word) {
      return word.unions.map(x => x.components);
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

.indent1.comments {
  background-color: beige;
}
.indent1.equals a {
  color: #42b983;
  text-decoration: none;
}
.indent1.related a {
  color: olive;
  text-decoration: none;
}
.indent1.derived a {
  color: navy;
  text-decoration: none;
}
</style>

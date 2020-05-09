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
import WordTree from "@/components/WordTree/WordTree"

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

<style scoped>

/* 
.inUnion {
  color: red;
}

/* TODO put styles to components where they belong*/

.tree code span {
  text-align: left;
} 
.tree code span.header{
  text-align: center;
  font-weight: bold;
}
.tree code span {
  white-space: nowrap;
}
div.container {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 15px;
}

.tree code span.source {
  justify-self: end;
}

.tree code a {
  text-decoration: none;
}

.selected-word {
  background-color: lightgoldenrodyellow;
}

.comment {
  font-style: italic;
}

.rel-comment {
  white-space: nowrap;
}
/* 
https://codepen.io/ross-angus/pen/jwxMjL
*/
body {
  font-family: Calibri, Segoe, "Segoe UI", "Gill Sans", "Gill Sans MT",
    sans-serif;
}

/* It's supposed to look like a tree diagram */
.tree,
.tree ul,
.tree li {
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
}

.tree {
  margin: 0 0 1em;
  text-align: center;
}
.tree,
.tree ul {
  display: table;
}
.tree ul {
  width: 100%;
}
.tree li {
  display: table-cell;
  padding: 0.5em 0;
  vertical-align: top;
}
/* _________ */
.tree li:before {
  outline: solid 1px #666;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.tree li:first-child:before {
  left: 50%;
}
.tree li:last-child:before {
  right: 50%;
}

.tree code {
  border: solid 0.1em #666;
  border-radius: 0.2em;
  display: inline-block;
  margin: 0 0.2em 0.5em;
  padding: 0.2em 0.5em;
  position: relative;
}
/* If the tree represents DOM structure */
.tree code {
  font-family: monaco, Consolas, "Lucida Console", monospace;
}

/* | */
.tree ul:before,
.tree code:before {
  outline: solid 1px #666;
  content: "";
  height: 0.5em;
  left: 50%;
  position: absolute;
}
.tree ul:before {
  top: -0.5em;
}
.tree code:before {
  top: -0.55em;
}

/* The root node doesn't connect upwards */
.tree > li {
  margin-top: 0;
}
.tree > li:before,
.tree > li:after,
.tree > li > code:before {
  outline: none;
}
</style>

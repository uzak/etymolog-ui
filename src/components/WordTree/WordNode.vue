
<script>
import Vue from "vue";

export default Vue.component('WordNode', Vue.extend({
  functional: true,
  props: {
    word: {
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  render: function(createElement, context) {
    let word = context.props.word
    let selected = context.props.selected

    function renderSources(sources) {
      let i = 0
      return createElement("span", {attrs: {class: "source"}}, [
        sources.map(src => {
          return createElement("a", { attrs: {href: src.toString() }}, `[${++i}]`)
        })
      ])
    }

    function link(word) {
      return createElement("router-link", { attrs: { to: "/word/" + word.toString()}}, word.toString())
    }

    
    let tags = word.tags.map(t => {
      return [
        createElement("router-link", { attrs: {class: "tag", to: "/tag/" + t} }, `#${t}`),
        createElement("span")
      ]});
    
    let comments = word.comments.map(c => {
      return [
        createElement("span", { attrs: {class: "comment"} }, c.toString()),
        createElement("span")
          //renderSources(c.sources)
      ]});

    let equals = word.equals.map(r => {
      let other = r.other(word)
      return [
        createElement("span", ["= ", link(other)]),
        renderSources(other.sources)
      ]});

    let related = word.related.map(r => {
      let other = r.other(word)
      return [
        createElement("span", ["~ ", link(other)]),
        renderSources(other.sources)
      ]});

    let attrs = {}
    if (context.props.selected) 
      attrs.class = "selected-word"
    
    let header = createElement("span", {attrs: { class: "header" }}, [link(word)])
    if (selected) 
      header = createElement("span", {attrs: { class: "header" }}, word.toString())
    
    return createElement("code", { attrs: attrs}, [
        createElement("div", { attrs: {class: "container"} },  [
          header,
          renderSources(word.sources),
          ...tags,
          ...comments,
          ...equals,
          ...related
        ])
      ])
  }
}));
</script>

<style scoped>
.tag {
  color: grey;
  text-align: left;
  font-style: italic;
}
</style>
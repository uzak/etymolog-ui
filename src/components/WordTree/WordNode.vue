
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
    },
    inUnion: {
      type: Boolean,
      default: false
    }
  },
  render: function(createElement, context) {
    let word = context.props.word
    let selected = context.props.selected
    let inUnion = context.props.inUnion

    function renderSources(sources) {
      let i = 0
      return createElement("span", {attrs: {class: "source"}}, [
        sources.map(src => {
          return createElement("router-link", { attrs: {to: "/source/" + src.link }}, `[${++i}]`)
        })
      ])
    }

    function renderUnions(word) {
      if (word.unions.length) {
        let u_counter = 0;
        return createElement("span", [
          " {",
          ...word.unions.map(union => {
            let c_counter = 0;
            let components = union.components.map(comp => {
              let result = [];
              result.push(createElement("router-link", { attrs: {to: "/word/" + comp.toString() }}, comp.toString(word.lang.name)))
              if (++c_counter < union.components.length) {
                result.push(" + ")
              }
              return result;
            });
            if (++u_counter <word.unions.length) {
              components.push(", ")
            }
            return components;
          }),
          "}"
        ]);
      }
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
        renderSources(other.getSources())
      ]});

    let related = word.related.map(r => {
      let other = r.other(word)
      return [
        createElement("span", { attrs: {class: "related"}}, ["~ ", link(other)]),
        renderSources(other.getSources())
      ]});

    let attrs = {}
    attrs.class = ""
    if (selected) 
      attrs.class += " selected-word"
    if (inUnion)
      attrs.class += " in-union"


    
    let header = createElement("span", {attrs: { class: "header" }}, [link(word), renderUnions(word)])
    if (selected) 
      header = createElement("span", {attrs: { class: "header" }}, [word.toString(), renderUnions(word)])
    
    return createElement("code", { attrs: attrs}, [
        createElement("div", { attrs: {class: "container"} },  [
          header,
          renderSources(word.getSources()),
          ...tags,
          ...comments,
          ...equals,
          ...related
        ])
      ])
  }
}));
</script>

<style>
.selected-word {
  background-color: lightgoldenrodyellow;
}

.in-union {
  background-color: lightpink;
}

.tag {
  color: grey;
  text-align: left;
  font-style: italic;
}

.related {
  background-color: khaki; /*gold is nice too */
}
</style>
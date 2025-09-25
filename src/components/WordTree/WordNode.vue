<script>
import { h, resolveComponent } from 'vue'

export default {
  name: 'WordNode',
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
  render() {
    let word = this.word;
    let selected = this.selected;
    let inUnion = this.inUnion;
    const RouterLink = resolveComponent('router-link');

    function renderSources(sources) {
      let i = 0;
      return h("span", {class: "source"}, [
        sources.map(src => {
          // Check if source is a URL
          if (src.isLink()) {
            // External link for URLs
            return h("a", { href: src.value, target: "_blank" }, () => `[${++i}]`);
          } else {
            // Link to internal source page using router
            return h(RouterLink, { to: "/source/" + src.link }, () => `[${++i}]`);
          }
        })
      ]);
    }

    function renderUnions(word) {
      if (word.unions.length) {
        let u_counter = 0;
        return h("span", [
          " {",
          ...word.unions.map(union => {
            let c_counter = 0;
            let components = union.components.filter(comp => comp != null).map(comp => {
              let result = [];
              result.push(h(RouterLink, { to: "/word/" + comp.lang.name + ":" + comp.toString() }, () => comp.lang.name + ":" + comp.toString(word.lang.name)));
              if (++c_counter < union.components.length) {
                result.push(" + ");
              }
              return result;
            });
            if (++u_counter < word.unions.length) {
              components.push(", ");
            }
            return components;
          }),
          "}"
        ]);
      }
    }

    function link(word) {
      return h(RouterLink, { to: "/word/" + word.lang.name + ":" + word.toString(word.lang.name)}, () => word.lang.name + ":" + word.toString(word.lang.name));
    }

    let tags = word.tags.map(t => {
      return [
        h(RouterLink, { class: "tag", to: "/tag/" + t }, () => `#${t}`),
        h("span")
      ];
    });

    let comments = word.comments.map(c => {
      return [
        h("span", { class: "comment" }, c),
        h("span")
      ];
    });

    let equals = word.equals.map(r => {
      let other = r.other(word);
      return [
        h("span", ["= ", link(other)]),
        renderSources(r.getSources())
      ];
    });

    let related = word.related.map(r => {
      let other = r.other(word);
      return [
        h("span", { class: "related"}, ["~ ", link(other)]),
        renderSources(r.getSources())
      ];
    });

    let attrs = {};
    attrs.class = "";
    if (selected)
      attrs.class += " selected-word";
    if (inUnion)
      attrs.class += " in-union";

    let header = h("span", { class: "header" }, [link(word), renderUnions(word)]);
    if (selected)
      header = h("span", { class: "header" }, [word.toString(word.lang.name), renderUnions(word)]);

    return h("code", attrs, [
      h("div", { class: "container" },  [
        header,
        renderSources(word.getSources()),
        ...tags,
        ...comments,
        ...equals,
        ...related
      ])
    ]);
  }
};
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
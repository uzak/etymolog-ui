<script>
import Vue from "vue";

export default Vue.component('RelationCommentsNode', Vue.extend({
  functional: true,
  props: {
    rel: {
      required: true
    }
  },
  render: function(createElement, context) {
    let rel = context.props.rel;
    return createElement("code", [
        rel.comments.map(c => {
          return createElement("div", {attrs: { class: "rel-comment comment" }}, c)
        })
    ]);
  },
}));
</script>

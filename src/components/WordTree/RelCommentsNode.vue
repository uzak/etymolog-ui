<script>
import Vue from "vue";

export default Vue.component('RelCommentsNode', Vue.extend({
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

<style scoped>
.rel-comment {
  white-space: nowrap;
}
</style>

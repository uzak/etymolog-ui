<script>
import Vue from "vue";

import WordNode from "@/components/WordTree/WordNode";
import RelationCommentsNode from "@/components/WordTree/RelationCommentsNode";

function LinkedList() {
  this.head = null;
}

LinkedList.prototype.push = function(val) {
  var node = {
    value: val,
    next: null
  };
  if (!this.head) {
    this.head = node;
  } else {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
};

export default Vue.extend({
  name: "WordTree",
  functional: true,
  props: {
    word: {
      required: true
    }
  },
  components: {
    WordNode,
    RelationCommentsNode,
  },
  render: function(createElement, context) {
    let word = context.props.word;

    function renderChildren(word) {
      return createElement("ul", [
        word.derives.map(rel => {
            return createElement("li", [
              createElement("WordNode", { attrs: { word: rel.right } }),
              rel.right.derives.length ? renderChildren(rel.right) : null
            ]);
        })
      ]);
    }

    function renderWord(word) {
      return createElement("ul", [
        createElement("WordNode", { attrs: { word: word, selected: true } }),
        word.derives.length ? renderChildren(word) : null
      ]);
    }

    function renderParent(node) {
      if (node) {
        let wordbox = createElement("WordNode", {
          attrs: { word: node.value.left }
        });
        let nextbox = renderParent(node.next);
        if (nextbox == null) {
          nextbox = renderWord(word);
        }

        if (node.value.comments.length) {
          return createElement("ul", [
            createElement("li", [
              wordbox,
              createElement("ul", [
                createElement("RelationCommentsNode", { attrs: { rel: node.value } }),
              ]),
              nextbox
            ])
          ]);
        } else {
          return createElement("ul", [createElement("li", [wordbox, nextbox])]);
        }
      }
    }

    let ll = new LinkedList();
    word
      .derivedChain()
      .reverse()
      .map(p => {
        ll.push(p);
      });

    return createElement("ul", { attrs: { class: "tree" } }, [
      createElement("li", [
        createElement("code", ["ॐ"]),
        renderParent(ll.head) || renderWord(word)
      ])
    ]);
  }
});
</script>

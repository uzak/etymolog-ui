<script>
import { h } from "vue";

import WordNode from "@/components/WordTree/WordNode";
import RelCommentsNode from "@/components/WordTree/RelCommentsNode";
import LinkedList from '@/util';


export default {
  name: "WordTree",
  props: {
    word: {
      required: true
    }
  },
  components: {
    WordNode,
    RelCommentsNode,
  },
  render() {
    const createElement = h;
    let word = this.word;

    function renderChildren(word) {
      return createElement("ul", [
        word.derives.map(rel => {
            return createElement("li", [
              createElement(WordNode, { word: rel.right }),
              rel.right.derives.length ? renderChildren(rel.right) : null
            ]);
        }),
        word.inUnions.map(union => {
            return createElement("li", [
              createElement(WordNode, { word: union.word, inUnion: true })
            ]);
        }),
      ]);
    }

    function renderWord(word) {
      return createElement("ul", [
        createElement(WordNode, { word: word, selected: true }),
        word.derives.length || word.inUnions.length ? renderChildren(word) : null, // XXX introdcuce method for condition
      ]);
    }

    function renderParent(node) {
      if (node) {
        let wordbox = createElement(WordNode, {
          word: node.value.left
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
                createElement(RelCommentsNode, { rel: node.value }),
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

    return createElement("ul", { class: "tree" }, [
      createElement("li", [
        createElement("code", ["ॐ"]),
        //createElement("code", ["*"]),
        renderParent(ll.head) || renderWord(word)
      ])
    ]);
  }
};
</script>



<style>

/* 
.inUnion {
  color: red;
}
*/


div.container {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 15px;
}


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

.tree code span.source {
  justify-self: end;
}

.tree code a {
  text-decoration: none;
}

.comment {
  font-style: italic;
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
  font-size: 9pt;
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

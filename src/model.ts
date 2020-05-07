// TODO turn the mockup data into a kind of unit-test?
//
// load tags

class Model {
    public static Version: Number;

    public static get_lang(name: String): Language {
        return Language.get(name);
    }
    
    public static get_word(str: String): Word {
        let [lang_str, value] = str.split(":")
        let lang = Language.get(lang_str)
        return lang.get_word(value)
    }
}

class Language {
    public name:  String;
    public words: Map<String, Word> = new Map();
    private static Table: Map<String, Language> = new Map();

    public static get(name: String) {
        let key = name.toLowerCase()
        let obj = Language.Table.get(key);
        if (!obj) {
            obj = new Language(name);
            Language.Table.set(key, obj);
        }
        return obj;
    }
    
    public get_word(value: String): Word {
        let result = this.words.get(value);
        if (!result) {
            result = new Word(value, this);
            this.words.set(value, result);
        }
        return result;
    }

    private constructor(name: String) {
        this.name = name;
    }
}

class Entity {
    public comments: Array<String> = [];
    public sources:  Array<String> = [];
}

class Word extends Entity {
    public value:       String;
    public lang:        Language;

    public tags:        Array<String> = [];
    // computed props
    public derivedFrom: Array<Relationship> = [];
    public derives:     Array<Relationship> = [];
    public related:     Array<Relationship> = [];
    public equals:      Array<Relationship> = [];
    public unions:      Array<Union> = [];
    public inUnions:    Array<Union> = [];

    constructor(value: String, lang: Language, ...comments: Array<String>) {
        super();
        this.value = value;
        this.lang = lang;
        lang.words.set(value, this);
        Array.prototype.push.apply(this.comments, comments);
    }

    public toString(lang: String) {
        if (lang === this.lang.name) 
            return this.value;

        return `${this.lang.name}:${this.value}`;
    }
}

class Union {
    public word: Word; 
    public components: Array<Word> = [];

    constructor(word: Word, ...components: Array<Word>) {
        this.word = word;
        this.components = components;

        // register in `word`
        this.word.unions.push(this);
        for (let component of components) {
            component.inUnions.push(this);
        }
    }
}

class Relationship extends Entity {
    public left: Word;
    public right: Word;
    
    constructor(left: Word, right: Word, ...comments: Array<String>) {
        super();
        this.left = left;
        this.right = right;
        Array.prototype.push.apply(this.comments, comments);
    }
}

class Equals extends Relationship {
    public static SYMBOL: String = "=";

    constructor(left: Word, right: Word, ...comments: Array<String>) {
        super(left, right);

        left.equals.push(this);
        right.equals.push(this);
    }
    
    public other(word: Word) {
        return this.left === word ? this.right : this.left;
    }
}

class Derived extends Relationship {
    public static SYMBOL: String = "->";

    constructor(left: Word, right: Word, ...comments: Array<String>) {
        super(left, right);

        left.derives.push(this);
        right.derivedFrom.push(this);
    }
}

class Related extends Relationship {
    public static SYMBOL: String = "~";

    constructor(left: Word, right: Word, ...comments: Array<String>) {
        super(left, right);

        left.related.push(this);
        right.related.push(this);
    }

    public other(word: Word) {
        return this.left === word ? this.right : this.left;
    }
}


/*
let celtic = Language.get("celtic");
let sa = Language.get("sa");
let en = Language.get("sa");
let semitic = Language.get("semitic");

let belenus = new Word("belenus", celtic)
let baal = new Word("Baal", semitic)
let bhalu = new Word("bhalu", sa)

let cathraige = new Word("cathraige", celtic)
cathraige.comments.push("servant of the four")
cathraige.comments.push("orginal name of Saint Patrick")

let dubras = new Word("dubras", celtic)
let waters = new Word("waters", en)
let dvipa = new Word("dvipa", sa)
let dvi = new Word("dvi", sa)
let pa = new Word("pa", sa)

new Union(dvipa, dvi, pa)

// relationships
//
new Related(belenus, baal)
new Derived(bhalu, belenus)

new Equals(dubras, waters)
new Derived(dvipa, belenus)


// for (let word of celtic.words) {
//     console.log(word.toString());
//     console.log(word.equals);
// }
*/

import * as data from '../public/db.json';

for (const word of data.words) {
    let l = Language.get(word.lang);
    let w = new Word(word.value, l);
    w.comments = word.comments;
    w.sources = word.sources;
}

Object.entries(data.relationships).forEach(
    ([relCls, rels]) => {
        rels.forEach(rel => {
            let left = Model.get_word(rel.left);
            let right = Model.get_word(rel.right);
            let relationship;
            switch (relCls) {
                case "equals":
                    relationship = new Equals(left, right)
                    break;
                case "derived":
                    relationship = new Derived(left, right)
                    break;
                case "related":
                    relationship = new Related(left, right)
                    break;
                default:
                    console.log(`Invalid relationship: ${relCls}`);
            }
            if (relationship) {
                relationship.comments = rel.comments;
                relationship.sources = rel.sources;
            }
            //console.log(relationship);
        })
    }
);
    
for (const union of data.unions) {
    new Union(Model.get_word(union.word), ...union.components.map(x => Model.get_word(x)))
}

Model.Version = data.version;

export default Model;

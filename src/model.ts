// TODO turn the mockup data into a kind of unit-test?
//
// load tags

import { filter } from 'lodash';

class Model {
    public static Version: Number;

    public static get_lang(name: string): Language {
        return Language.get(name);
    }
    
    public static get_word(str: string): Word {
        let [lang_str, value] = str.split(":")
        let lang = Language.get(lang_str)
        return lang.get_word(value)
    }

    public static allLanguages(): Array<Language> {
        let result = Array.from(Language.Table.values())
        result.sort((a,b) => b.wordCount() - a.wordCount())
        return result
    }

    public static stats() {
        return {
            "derived": Derived.Table,
            "equals": Equals.Table,
            "related": Related.Table,
            "tags": Tag.Table,      // TODO this belongs somewhere else
            "sources" : Source.Table // TODO same here
        }
    }
}

// XXX common parent for Source and Tag?
class Tag {
    public static Table: Map<string, Array<Word>> = new Map();
}

class Source {
    public static Table: Map<string, Source> = new Map(); 

    private _value: string;
    private _entities: Array<Entity> = new Array();

    constructor(value: string) {
        this._value = value;
    }
    
    get value(): string {
        return this._value;
    }

    get entities(): Array<Entity> {
        return this._entities;
    }

    get link(): string {
        return encodeURIComponent(this.value);
    }

    get words(): Array<Word> {
        return filter(this._entities, e => e instanceof Word);
    }

    public isLink() {
        let v = this._value.toLowerCase();
        return v.startsWith("http") || v.startsWith("www")
    }
}

class Language {
    public name:  string;
    public words: Map<string, Word> = new Map();
    static Table: Map<string, Language> = new Map();

    public wordCount(): number {
        return Array.from(this.words).length
    }

    public static get(name: string) {
        let key = name.toLowerCase()
        let obj = Language.Table.get(key);
        if (!obj) {
            obj = new Language(name);
            Language.Table.set(key, obj);
        }
        return obj;
    }
    
    public get_word(value: string): Word {
        let result = this.words.get(value);
        if (!result) {
            result = new Word(value, this);
            this.words.set(value, result);
        }
        return result;
    }

    private constructor(name: string) {
        this.name = name;
    }
}

class Entity {
    public comments: Array<string> = [];
    protected _sources:  Array<Source> = [];
    
    set sources(sources: Array<string>) { 
        sources.map(s => {
            // XXX move maybe this logic to source?
            if (!Source.Table.has(s)) {
                let source = new Source(s);
                Source.Table.set(s, source);
            }
            Source.Table.get(s)?.entities.push(this);
            this._sources.push(Source.Table.get(s))
        });
    }
    
    public getSources(): Array<Source> {
        return this._sources;
    }
}

class Word extends Entity {
    public value:       string;
    public lang:        Language;

    public tags:        Array<string> = [];
    // computed props
    public derivedFrom: Array<Relationship> = [];
    public derives:     Array<Relationship> = [];
    public related:     Array<Relationship> = [];
    public equals:      Array<Relationship> = [];
    public unions:      Array<Union> = [];
    public inUnions:    Array<Union> = [];

    constructor(value: string, lang: Language, ...comments: Array<string>) {
        super();
        this.value = value;
        this.lang = lang;
        lang.words.set(value, this);
        Array.prototype.push.apply(this.comments, comments);
    }

    public setTags(tags: Array<string>) { // TODO change to TS syntax
        this.tags = tags;
        tags.map(t => {
            if (!Tag.Table.has(t)) {
                Tag.Table.set(t, new Array());
            }
            Tag.Table.get(t)?.push(this);
        });
    }

    public toString(lang: string) {
        if (lang === this.lang.name) {
            return this.value;
        }

        return `${this.lang.name}:${this.value}`;
    }

    private _derivedChain(result: Array<Relationship>) {
      for (let w of this.derivedFrom) {
        result.push(w)
        w.left._derivedChain(result)
      }
    }
    
    public derivedChain(): Array<Relationship> {
      let result = new Array()
      this._derivedChain(result)
      return result
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

abstract class Relationship extends Entity {
    public left: Word;
    public right: Word;
    
    constructor(left: Word, right: Word, ...comments: Array<string>) {
        super();
        this.left = left;
        this.right = right;
        Array.prototype.push.apply(this.comments, comments);
    }
}

class Equals extends Relationship {
    public static Table: Array<Relationship> = new Array;
    
    constructor(left: Word, right: Word, ...comments: Array<string>) {
        super(left, right);

        left.equals.push(this);
        right.equals.push(this);
        Equals.Table.push(this);
    }
    
    public other(word: Word) {
        return this.left === word ? this.right : this.left;
    }
}

class Derived extends Relationship {
    public static Table: Array<Relationship> = new Array;

    constructor(left: Word, right: Word, ...comments: Array<string>) {
        super(left, right);

        left.derives.push(this);
        right.derivedFrom.push(this);
        Derived.Table.push(this);
    }
}

class Related extends Relationship {
    public static Table: Array<Relationship> = new Array;

    constructor(left: Word, right: Word, ...comments: Array<string>) {
        super(left, right);

        left.related.push(this);
        right.related.push(this);
        Related.Table.push(this);
    }

    public other(word: Word) {
        return this.left === word ? this.right : this.left;
    }
}

import * as data from '../public/db.json';

for (const word of data.words) {
    let l = Language.get(word.lang);
    let w = new Word(word.value, l);
    w.comments = word.comments;
    w.sources = word.sources;
    w.setTags(word.tags);
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

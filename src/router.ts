import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Dictionaries from './views/Dictionaries.vue'
import DictionaryDetail from './views/DictionaryDetail.vue'
import Word from './views/Word.vue'
import TagDetail from './views/TagDetail.vue'
import Tags from './views/Tags.vue'
import Sources from './views/Sources.vue'
import SourceDetail from './views/SourceDetail.vue'
import Search from './views/Search.vue'
import Stats from './views/Stats.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/dictionaries',
      name: 'dictionaries',
      component: Dictionaries
    },
    {
      path: '/dictionaries/:id',
      name: 'dictionaryDetail',
      component: DictionaryDetail
    },
    {
      path: '/word/:id',
      name: 'word',
      component: Word
    },
    {
      path: '/tag/:id',
      name: 'tag',
      component: TagDetail
    },
    {
      path: '/tags',
      name: 'tags',
      component: Tags
    },
    {
      path: '/sources',
      name: 'sources',
      component: Sources
    },
    {
      path: '/source/:id',
      name: 'source',
      component: SourceDetail
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
  ]
})

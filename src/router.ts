import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Dictionaries from './views/Dictionaries.vue'
import DictionaryDetail from './views/DictionaryDetail.vue'
import Word from './views/Word.vue'
import Tag from './views/Tag.vue'
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
      component: Tag
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

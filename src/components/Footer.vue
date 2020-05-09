<template>
  <div class="footer">
    <hr>
    <p>
      UI V<b>{{ ui_version }}</b>, DB V<b>{{ db_version }}</b>, contact <a href="mailto:etymolog@mailbox.org">etymolog@mailbox.org</a>
    </p>
  </div>
</template>

<script>
import Model from '@/model'

export default {
  name: 'Footer',
  data() { 
    return { 
      db_version: Model.Version,
      ui_version: process.env.PACKAGE_VERSION || 'DEFAULT'
    }
  },

}
</script>

<style scoped>
</style>

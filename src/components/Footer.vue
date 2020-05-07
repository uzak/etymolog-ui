<template>
  <div class="footer">
    <hr>
    <p>
      UI V<b>1.00</b>, DB V<b>{{ db_version }} </b> from 2020-05-02, contact <a href="mailto:etymolog@mailbox.org">etymolog@mailbox.org</a>
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
    }
  },

}
</script>

<style scoped>
</style>

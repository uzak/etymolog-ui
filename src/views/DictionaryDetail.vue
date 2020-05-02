<template>
  <div>
    <h1>Language: {{ $route.params.id }}</h1>

    <div>
      <input type="checkbox" id="showAdditionaInfo">
      <label for="showAdditionalInfo">Show additional info</label>
    </div>
    <div>
      11 Words:
    </div>

    <div class="entry">
      <div>
        <router-link to="/word/celtic:Belenus">Belenus</router-link>
      </div>
      <div class="indent1">
        ~ <router-link to="/word/semitic:Baal">Baal</router-link>
      </div>
      <div class="indent1">
        -> <router-link to="/word/sa:bhalu">bhalu</router-link>
      </div>
    </div>

    
    <div class="entry">
      <div>
        <router-link to="/word/celtic:cathraige">cathraige</router-link>
      </div>
      <div class="indent1">
        servant of the four
      </div>
      <div class="indent1">
        original name of Saint Patrick
      </div>
    </div>

    
    <div class="entry">
      <div>
        <router-link to="/word/celtic:dubras">dubras</router-link>
      </div>
      <div class="indent1">
        = <router-link to="/word/en:waters">en:waters</router-link>
      </div>
      <div class="indent1">
        -> <router-link to="/word/sa:dvipa">sa:dvipa</router-link>
        {<router-link to="/word/sa:dvi">dvi</router-link> + <router-link to="/word/sa:ap">ap</router-link>}
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'DictionaryDetail',
}
</script>

<style scoped>
.entry {
  margin-top: 20px;
}

.indent1 {
  margin-left: 50px;
}
</style>

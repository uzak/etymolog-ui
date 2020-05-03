<template>
  <div>
    <h1>{{ $route.params.id }}</h1>
    <p>
    back to <router-link to="/">etymolog</router-link> / <router-link to="/dictionaries/celtic">celtic</router-link> language
    </p>
    <div>
      Tags: <router-link to="/tag/city">#city</router-link>
    </div>

    <pre>
      *                                           
      |
    <a href="">sa:dvipa {dvi+ap} = en:island</a>             <a href="">[1]</a>
      . <a href="">sa:dvi {d+vi} = en:both sides</a>         <a href="">[1]</a>, <a href="">[2]</a>
      . <a href="">sa:ap = en:water</a>                      <a href="">[1]</a>
      | 
 <b>=> celtic:Dubron</b>                             <a href="">[1]</a>
    -> <a href="">en:Dubrovnik</a>                           <a href="">[1]</a>
    </pre>
  </div>
</template>

<script>

export default {
  name: 'Word',
}
</script>

<style scoped>
</style>

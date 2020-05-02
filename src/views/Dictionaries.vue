<template>
  <div>
    <h1>Dictionaries</h1>
    <table>
      <tr>
        <th>Language</th>
        <th>Size (Words)</th>
      </tr>
      <tr>
        <td>
          <router-link to="/dictionaries/en">en</router-link>
        </td>
        <td>
          1503
        </td>
      </tr>
      
      <tr>
        <td>
          <router-link to="/dictionaries/sa">sa</router-link>
        </td>
        <td>
          721
        </td>
      </tr>
      
      <tr>
        <td>
          <router-link to="/dictionaries/en">sk</router-link>
        </td>
        <td>
          328
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Dictionaries',
}
</script>

<style scoped>
</style>

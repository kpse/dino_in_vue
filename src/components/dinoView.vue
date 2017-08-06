<template>
  <div>
    <strong>{{ name }}</strong> | {{ diet }}
  </div>
</template>

<script>
  export default {
    props: ['name', 'diet']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

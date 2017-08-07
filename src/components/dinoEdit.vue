<template>
  <div>
    <button v-on:click="increment">{{dino.quantity}}</button>
    {{ dino.text | capitalize }}
  </div>
</template>

<script>
  export default {
    props: ['dino'],
    data: function () {
      this.$emit('increment', this.dino.quantity)
      console.log(`dino is ${JSON.stringify(this.dino)}`)
      return this.dino
    },
    methods: {
      increment: function () {
        this.dino.quantity += 1
        this.$emit('increment', 1)
      }
    },
    filters: {
      capitalize: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

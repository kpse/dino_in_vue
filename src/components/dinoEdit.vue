<template>
  <div>
    <button v-on:click="increment">{{quantity}}</button>
    {{ name | capitalize }}
  </div>
</template>

<script>
  export default {
    template: '#dino-counter',
    props: ['name', 'initialQuantity'],
    data: function () {
      this.$emit('increment', this.initialQuantity)
      return {
        quantity: this.initialQuantity
      }
    },
    methods: {
      increment: function () {
        this.quantity += 1
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

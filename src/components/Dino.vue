<template>
  <div class="card">
    <header>{{ title }} <span v-on:click="toggle"> {{ editLabel }}</span></header>
    <div v-html="content"></div>
    <div>
      <form v-on:submit.prevent="addDino">
        <input id="itemForm" v-model="dino">
        <button v-bind:disabled="buttonDisabled">{{ buttonText }}</button>
      </form>
    </div>
    <template v-if="dinos.length > 0"><h4>Dinosaur List</h4>
      <ul>
        <li v-for="(d, i) in dinos">
          <keep-alive>
            <component v-bind:is="currentView"
                       v-bind:dino="d"
                       @increment="incrementTotal"></component>
          </keep-alive>
          <button v-on:click="deleteDino(i)">Make Extinct</button>
          <span v-bind:title="message">The {{ d.text | undercase }} weighs {{ d.weight }}.</span>
          <br>
          <a :href="d.text | undercase | url">{{ d.text | undercase | url}}</a>
        </li>
      </ul>
      <ul>
        <li>Total Species: {{ totalSpecies }} <span>Updated: {{ speciesUpdated }}</span></li>
        <li>Total 2: {{ total }} by dino-counter</li>
      </ul>
    </template>
    <p v-else>You have no dinosaurs yet</p>
  </div>
</template>

<script>
  import _ from 'lodash'
  import dinoEdit from './dinoEdit'
  import dinoShow from './dinoView'

  export default {
    data: function () {
      return {
        title: 'Dinosaurs',
        content: '<strong>Dinosaurs</strong> are a diverse group of animals of the clade <em>Dinosauria</em> that first appeared during the Triassic period.',
        dinoUpdated: 0,
        speciesUpdated: 0,
        total: 0,
        message: `The page is rendered at ${new Date()}`,
        dinos: [
          {
            text: 'Velociraptor',
            weight: '15 kg',
            quantity: 10,
            diet: 'Carnivore'
          },
          {
            text: 'triceratops',
            weight: '6,000 kg',
            quantity: 8,
            diet: 'Herbivore'
          },
          {
            text: 'Stegosaurus',
            weight: '2,500 kg',
            quantity: 3,
            diet: 'Herbivore'
          }
        ],
        text: '',
        buttonText: 'Add Dinosaur',
        currentView: 'dino-counter',
        dino: ''
      }
    },
    filters: {
      capitalize: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      undercase: (value) => value.toLowerCase(),
      url: (value) => `https://en.wikipedia.org/wiki/${value}`
    },
    methods: {
      addDino: function () {
        if (this.dino !== '') {
          this.dinos.push({
            text: this.dino,
            quantity: 1
          })
          this.dino = ''
        }
      },
      deleteDino: function (index) {
        this.total -= this.dinos[index].quantity
        this.dinos.splice(index, 1)
      },
      incrementTotal: function (amount) {
        this.total += amount
      },
      toggle: function () {
        this.currentView = this.currentView === 'dino-counter' ? 'dino-show' : 'dino-counter'
      }
    },
    computed: {
      totalSpecies: function () {
        this.speciesUpdated += 1
        return this.dinos.length
      },
      buttonDisabled: function () {
        return this.dino === ''
      },
      editLabel: function () {
        return this.currentView === 'dino-counter' ? 'Show' : 'Edit'
      }
    },
    watch: {
      dino: _.debounce(() => { this.buttonText = this.dino !== '' ? `Add ${this.dino}` : `Add Dinosaur` }
        , 250)
    },
    components: {
      'dino-counter': dinoEdit,
      'dino-show': dinoShow
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    padding: 2em;
    font-family: sans-serif;
  }

  .extinct {
    float: right;
  }

  .card {
    border: 2px solid Gray;
    border-radius: 10px;
  }

  .card header {
    display: block;
    border-radius: 8px 8px 0 0;
    background: orange;
    padding: 10px;
    color: white;
    font-size: 1.5em;
  }

  .card span {
    font-size: 0.75em;
    font-weight: normal;
    font-style: italic;
    float: right;
  }

  div, p, form {
    padding: 1em;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 1em;
  }

  ul li {
    padding: .5em;
    border: 1px solid gray;
    margin: .5em 0;
    border-radius: 3px;
  }

  ul li span {
    float: right;
    color: darkred;
    font-weight: 600;
  }

  .rounded {
    border-radius: 10px;
  }

  .large {
    font-size: 2em;
  }
</style>

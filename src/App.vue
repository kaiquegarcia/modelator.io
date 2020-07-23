<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Modelator.io</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-button
            size="sm"
            class="mr-sm-2"
            variant="success"
            @click="createTable"
            >Adicionar tabela</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div id="diagram-container"></div>
    <b-navbar type="light" fixed="bottom" variant="light">
      <b-nav-text>Made with love by <b-link href="https://kaiquegarcia.dev" target="_blank">Kaique Garcia</b-link></b-nav-text>
    </b-navbar>
    <div class="editor-container"></div>
  </div>
</template>

<script>
import Diagram from "./components/database/Diagram";
import Vue from "vue";

const DiagramClass = Vue.extend(Diagram);
const diagram = new DiagramClass();
export default {
  name: "App",
  methods: {
    createTable() {
      diagram.createTable();
    }
  },
  mounted() {
    diagram.$mount("#diagram-container");
  }
};
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

/** THANKS JUNIOR FERNANDES **/
.draggable
  cursor: grab
.dragging
  cursor: grabbing
</style>

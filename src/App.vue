<template>
  <div id="app" class="container">
    <h1>Modelator.io</h1>
    <br />
    <diagram></diagram>
    <div class="editor-container"></div>
  </div>
</template>

<script>
import Diagram from "./components/database/Diagram";
export default {
  name: "App",
  components: { Diagram }
};
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px

/** THANKS JUNIOR FERNANDES **/
.draggable
  cursor: grab
.dragging
  cursor: grabbing
</style>

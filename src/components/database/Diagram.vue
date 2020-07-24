<template>
  <div>
    <div class="diagram-workspace"></div>
  </div>
</template>
<script>
import DatabaseTable from "./DatabaseTable";
import Vue from "vue";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import { mapState } from "vuex";

const DatabaseTableClass = Vue.extend(DatabaseTable);
export default {
  name: "Diagram",
  data() {
    return {
      workspace: null,
      lastId: 0
    };
  },
  methods: {
    createTableContainer(id) {
      let tableContainer = document.createElement("div");
      tableContainer.id = id;
      this.workspace.appendChild(tableContainer);
    },
    createTable() {
      this.lastId++;
      let id = "table_" + this.lastId;
      this.$store.dispatch("diagram/addTable", id).then(() => {
        this.createTableContainer(id);
        const tableIndex = this.tables.length - 1;
        let table = new DatabaseTableClass({
          store: this.$store,
          propsData: { tableIndex }
        });
        table.$mount("#" + id);
      });
    }
  },
  computed: mapState({
    name: state => state.diagram.name,
    tables: state => state.diagram.tables,
    scale: state => state.diagram.scale
  }),
  mounted() {
    this.workspace = document.querySelector(".diagram-workspace");
  }
};
</script>
<style lang="sass">
.diagram-workspace
    width: 100%
    height: 600px
    position: relative
</style>

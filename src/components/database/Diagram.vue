<template>
  <div>
    <b-button variant="success" @click="createTable">
      <b-icon-plus></b-icon-plus> Adicionar tabelas
    </b-button>
    <hr />
    <div class="diagram-workspace"></div>
  </div>
</template>
<script>
import DatabaseTable from "./DatabaseTable";
import Vue from "vue";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

const DatabaseTableClass = Vue.extend(DatabaseTable);
export default {
  name: "Diagram",
  data() {
    return {
      tables: {},
      instances: {},
      lastId: 0,
      scale: 1.0
    };
  },
  methods: {
    getWorkspace() {
      return document.querySelector(".diagram-workspace");
    },
    createTable() {
      let tableContainer = document.createElement("div");
      this.lastId++;
      let id = "table_" + this.lastId;
      tableContainer.id = id;
      this.getWorkspace().appendChild(tableContainer);
      this.tables[id] = {
        name: "table_name",
        description: "",
        engine: "",
        columns: [
          {
            name: "id",
            dataType: "INT(11)",
            defaultExpression: "",
            PK: true,
            AI: true,
            NN: false,
            UQ: false,
            UN: false,
            ZF: false,
            B: false
          },
          {
            name: "status",
            dataType: "ENUM('draft', 'published')",
            defaultExpression: "'draft'",
            PK: false,
            AI: false,
            NN: true,
            UQ: false,
            UN: false,
            ZF: false,
            B: false
          },
          {
            name: "deleted_at",
            dataType: "DATETIME",
            defaultExpression: "NULL",
            PK: false,
            AI: false,
            NN: false,
            UQ: false,
            UN: false,
            ZF: false,
            B: false
          },
          {
            name: "updated_at",
            dataType: "DATETIME",
            defaultExpression: "NULL",
            PK: false,
            AI: false,
            NN: false,
            UQ: false,
            UN: false,
            ZF: false,
            B: false
          },
          {
            name: "created_at",
            dataType: "TIMESTAMP",
            defaultExpression: "CURRENT_TIMESTAMP",
            PK: false,
            AI: false,
            NN: false,
            UQ: false,
            UN: false,
            ZF: false,
            B: false
          }
        ],
        indexes: [],
        foreignKeys: []
      };
      let table = new DatabaseTableClass({
        propsData: {
          tableInput: this.tables[id],
          scale: this.scale
        }
      });
      table.$mount("#table_" + this.lastId);
      table.$on("remove", () => this.removeTable(id));
      table.openTableEditor();
      this.instances[id] = table;
    },
    removeTable(id) {
      this.instances[id].$destroy();
      delete this.instances[id];
      delete this.tables[id];
    }
  }
};
</script>
<style lang="sass">
.diagram-workspace
    width: 100%
    height: 600px
    border: 1px solid #000
    position: relative
</style>

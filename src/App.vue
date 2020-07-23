<template>
  <div id="app" class="container">
    <h1>Modelator.io</h1>
    <br />
    <b-button variant="success" @click="createTable">
      <b-icon-plus></b-icon-plus> Adicionar tabelas
    </b-button>
    <hr />
    <div ref="workspace"></div>
  </div>
</template>

<script>
import DatabaseTable from "./components/database/DatabaseTable";
import Vue from "vue";

const DatabaseTableClass = Vue.extend(DatabaseTable);
export default {
  name: "App",
  data() {
    return {
      tables: {},
      instances: {},
      lastId: 0
    };
  },
  methods: {
    createTable() {
      let tableContainer = document.createElement("div");
      this.lastId++;
      let id = "table_" + this.lastId;
      tableContainer.id = id;
      this.$refs.workspace.appendChild(tableContainer);
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
          tableInput: this.tables[id]
        }
      });
      table.$mount("#table_" + this.lastId);
      table.$on("remove", () => this.removeTable(id));
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

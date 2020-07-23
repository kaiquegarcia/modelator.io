<template>
  <div class="database-table">
    <b-card no-body>
      <b-tabs v-model="currentTab" card>
        <b-tab title="Columns">
          <b-card-text>
            <table
              role="table"
              class="table b-table table-striped table-hover table-bordered table-sm table-light"
            >
              <thead role="rowgroup" class="thead-dark">
                <tr role="row">
                  <th role="columnheader" scope="col" v-if="table.engine" class="bg-danger align-middle">
                    <div>
                      {{ table.engine }}
                    </div>
                  </th>
                  <th role="columnheader" scope="col" :colspan="table.engine ? 3 : 4">
                    <div>
                      {{ table.name }}
                      <b-icon-pencil
                        class="cursor-pointer"
                        @click="openTableEditor"
                      ></b-icon-pencil>
                      <template v-if="table.description">
                        <br />
                        <small>{{ table.description }}</small>
                      </template>
                    </div>
                  </th>
                </tr>
                <tr role="row">
                  <th role="columnheader" scope="col" title="Primary Key">
                    <div>PK</div>
                  </th>
                  <th role="columnheader" scope="col">
                    <div>Name</div>
                  </th>
                  <th role="columnheader" scope="col">
                    <div>Data Type</div>
                  </th>
                  <th role="columnheader" scope="col">
                    <b-icon-plus
                      class="cursor-pointer"
                      @click="createColumn"
                    ></b-icon-plus>
                  </th>
                </tr>
              </thead>
              <draggable v-model="columns" tag="tbody" role="rowgroup">
                <tr
                  v-for="(column, columnIndex) in columns"
                  role="row"
                  :key="columnIndex"
                >
                  <td role="cell">
                    <b-icon-lock v-if="column.PK"></b-icon-lock>
                  </td>
                  <td role="cell">{{ column.name }}</td>
                  <td role="cell">{{ column.dataType }}</td>
                  <td role="cell">
                    <b-icon-pencil
                      class="cursor-pointer"
                      @click="openColumnEditor(columnIndex)"
                    ></b-icon-pencil>
                    <b-icon-x
                      class="cursor-pointer"
                      @click="removeColumn(columnIndex)"
                    ></b-icon-x>
                  </td>
                </tr>
              </draggable>
            </table>
          </b-card-text>
        </b-tab>
        <b-tab title="Table related indexes">
          <b-card-text></b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
    <div ref="editorContainer"></div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import DatabaseTableEditor from "./DatabaseTableEditor";
import DatabaseTableColumnEditor from "./DatabaseTableColumnEditor";
import Vue from "vue";

const TableEditorClass = Vue.extend(DatabaseTableEditor);
const ColumnEditorClass = Vue.extend(DatabaseTableColumnEditor);
let tableEditor = null,
  columnEditor = null;
export default {
  components: {
    draggable
  },
  data() {
    return {
      table: {
        name: "table_name",
        description: "",
        engine: ""
      },
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
      foreignKeys: [],
      currentTab: 0,
      currentEditingColumnIndex: -1
    };
  },
  methods: {
    openTableEditor() {
      let editorContainer = document.createElement("div");
      editorContainer.id = "table-editor-container";
      this.$refs.editorContainer.appendChild(editorContainer);
      tableEditor = new TableEditorClass({
        propsData: {
          tableInput: this.table
        }
      });
      tableEditor.$mount("#table-editor-container");
      tableEditor.$on("close", () => this.closeTableEditor());
    },
    closeTableEditor() {
      tableEditor.$destroy();
    },
    openColumnEditor(columnIndex) {
      this.currentEditingColumnIndex = columnIndex;
      let editorContainer = document.createElement("div");
      editorContainer.id = "column-editor-container";
      this.$refs.editorContainer.appendChild(editorContainer);
      columnEditor = new ColumnEditorClass({
        propsData: {
          columnInput: this.columns[this.currentEditingColumnIndex]
        }
      });
      columnEditor.$mount("#column-editor-container");
      columnEditor.$on("close", () => this.closeColumnEditor());
    },
    closeColumnEditor() {
      columnEditor.$destroy();
    },
    createColumn() {
      let firstColumn = !this.columns.length;
      let column = {
        name: firstColumn ? "id" : "row_" + this.columns.length,
        dataType: firstColumn ? "INT" : "VARCHAR(45)",
        defaultExpression: "",
        PK: Boolean(firstColumn),
        AI: Boolean(firstColumn),
        NN: false,
        UQ: false,
        UN: false,
        ZF: false,
        B: false
      };
      this.columns.push(column);
      this.openColumnEditor(this.columns.length - 1);
    },
    removeColumn(columnIndex) {
      this.columns.splice(columnIndex, 1);
    }
  }
};
</script>
<style lang="sass">
.database-table table
    width: 450px !important
    max-width: 100%

    tbody tr
        cursor: move

.cursor-pointer
    cursor: pointer
</style>

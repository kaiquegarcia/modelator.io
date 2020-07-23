<template>
  <div class="database-table">
    <b-card no-body>
      <b-tabs v-model="currentTab" card>
        <b-tab title="Columns">
          <b-card-text>
            <b-table
              :striped="true"
              :bordered="true"
              :small="true"
              :hover="true"
              head-variant="dark"
              table-variant="light"
              :items="columns"
              :fields="columnFields"
            >
              <template v-slot:head(acts)="">
                <b-icon-plus
                  class="cursor-pointer"
                  @click.prevent="createColumn"
                ></b-icon-plus>
              </template>
              <template v-slot:cell(acts)="column">
                <b-icon-pencil
                  class="cursor-pointer"
                  @click.prevent="openColumnEditor(column.index)"
                ></b-icon-pencil>
                <b-icon-x
                  class="cursor-pointer"
                  @click.prevent="removeColumn(column.index)"
                ></b-icon-x>
              </template>
              <template v-slot:cell(PK)="column">
                <b-icon-lock v-if="column.value"></b-icon-lock>
              </template>
            </b-table>
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
import DatabaseTableColumnEditor from "./DatabaseTableColumnEditor";
import Vue from "vue";
const ColumnEditorClass = Vue.extend(DatabaseTableColumnEditor);
let columnEditor = null;
export default {
  data() {
    return {
      name: "",
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
      columnFields: [
        {
          key: "PK",
          label: "PK",
          headerTitle: "Primary Key",
          sortable: false
        },
        {
          key: "name",
          sortable: false
        },
        {
          key: "dataType",
          sortable: false
        },
        {
          key: "acts",
          label: "Actions"
        }
      ],
      indexes: [],
      foreignKeys: [],
      currentTab: 0,
      currentEditingColumnIndex: -1
    };
  },
  methods: {
    openColumnEditor(columnIndex) {
      this.currentEditingColumnIndex = columnIndex;
      let editorContainer = document.createElement("div");
      editorContainer.id = "editor-container";
      this.$refs.editorContainer.appendChild(editorContainer);
      columnEditor = new ColumnEditorClass({
        propsData: {
          columnInput: this.columns[this.currentEditingColumnIndex]
        }
      });
      columnEditor.$mount("#editor-container");
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
  },
  computed: {
    showColumnEditor() {
      return this.currentEditingColumnIndex > -1;
    },
    currentEditingColumn() {
      return this.columns[this.currentEditingColumnIndex] || {};
    }
  }
};
</script>
<style lang="sass">
.database-table table
  width: 450px !important
  max-width: 100%
.cursor-pointer
    cursor: pointer
</style>

<template>
  <div class="database-table">
    <table
      role="table"
      class="table b-table table-striped table-hover table-bordered table-sm table-light"
    >
      <thead role="rowgroup" class="thead-dark text-center">
        <tr role="row">
          <th
            role="columnheader"
            scope="col"
            v-if="table.engine"
            class="bg-danger align-middle"
          >
            <div>
              {{ table.engine }}
            </div>
          </th>
          <th role="columnheader" scope="col" :colspan="table.engine ? 2 : 3">
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
          <th role="columnheader" scope="col" class="align-middle">
            <div>
              <b-icon-x class="cursor-pointer" @click="remove"></b-icon-x>
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
      <draggable v-model="table.columns" tag="tbody" role="rowgroup">
        <tr
          v-for="(column, columnIndex) in table.columns"
          role="row"
          :key="columnIndex"
        >
          <td role="cell" class="text-center">
            <b-icon-lock v-if="column.PK"></b-icon-lock>
          </td>
          <td role="cell">{{ column.name }}</td>
          <td role="cell">{{ column.dataType }}</td>
          <td role="cell" class="text-center">
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
  name: "DatabaseTable",
  components: {
    draggable
  },
  props: {
    tableInput: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      table: this.tableInput,
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
          columnInput: this.table.columns[this.currentEditingColumnIndex]
        }
      });
      columnEditor.$mount("#column-editor-container");
      columnEditor.$on("close", () => this.closeColumnEditor());
    },
    closeColumnEditor() {
      columnEditor.$destroy();
    },
    createColumn() {
      let firstColumn = !this.table.columns.length;
      let column = {
        name: firstColumn ? "id" : "row_" + this.table.columns.length,
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
      this.table.columns.push(column);
      this.openColumnEditor(this.table.columns.length - 1);
    },
    removeColumn(columnIndex) {
      if (
        confirm(
          "Você quer mesmo apagar essa coluna? Essa ação não poderá ser desfeita."
        )
      ) {
        this.table.columns.splice(columnIndex, 1);
      }
    },
    remove() {
      if (
        confirm(
          "Você quer mesmo apagar essa tabela? Essa ação não poderá ser desfeita."
        )
      ) {
        this.$emit("remove");
      }
    }
  },
  beforeDestroy() {
    this.$root.$el.parentNode.removeChild(this.$root.$el);
  }
};
</script>
<style lang="sass">
.database-table
    margin-bottom: 30px
    table
        width: 450px !important
        max-width: 100%
        tbody tr
            cursor: move

.cursor-pointer
    cursor: pointer
</style>

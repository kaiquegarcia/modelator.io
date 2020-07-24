<template>
  <vue-draggable-resizable
    class="database-table"
    :resizable="false"
    :parent="false"
    :scale="scale"
    :w="450"
    :enableNativeDrag="true"
    h="auto"
    dragHandle="thead"
  >
    <table
      role="table"
      class="table b-table table-striped table-hover table-bordered table-sm table-light"
    >
      <database-table-header
        :table="table"
        @edit="openTableEditor"
        @remove="remove"
        @add="createColumn"
      ></database-table-header>
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
  </vue-draggable-resizable>
</template>
<script>
import draggable from "vuedraggable";
import DatabaseTableEditor from "./DatabaseTableEditor";
import DatabaseTableColumnEditor from "./DatabaseTableColumnEditor";
import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";
import DatabaseTableHeader from "./DatabaseTableHeader";

const TableEditorClass = Vue.extend(DatabaseTableEditor);
const ColumnEditorClass = Vue.extend(DatabaseTableColumnEditor);
let tableEditor = null,
  columnEditor = null;
export default {
  name: "DatabaseTable",
  components: {
    DatabaseTableHeader,
    draggable,
    VueDraggableResizable
  },
  props: {
    tableInput: {
      type: Object,
      required: true
    },
    scale: {
      type: Number,
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
    getEditorContainer() {
      return document.querySelector(".editor-container");
    },
    openTableEditor() {
      let editorContainer = document.createElement("div");
      editorContainer.id = "table-editor-container";
      this.getEditorContainer().appendChild(editorContainer);
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
      this.getEditorContainer().appendChild(editorContainer);
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
.database-table table
    margin-bottom: 0
    max-width: 100%
    tbody tr
        cursor: move

.cursor-pointer
    cursor: pointer
.vdr
    border: none !important
</style>

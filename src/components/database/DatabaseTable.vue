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
      <database-table-body
        :columns="table.columns"
        @edit="openColumnEditor"
        @remove="removeColumn"
      ></database-table-body>
    </table>
  </vue-draggable-resizable>
</template>
<script>
import DatabaseTableEditor from "./DatabaseTableEditor";
import DatabaseTableColumnEditor from "./DatabaseTableColumnEditor";
import DatabaseTableHeader from "./DatabaseTableHeader";
import DatabaseTableBody from "./DatabaseTableBody";
import VueDraggableResizable from "vue-draggable-resizable";
import ConfirmationModal from "../html/ConfirmationModal";
import Vue from "vue";

const TableEditorClass = Vue.extend(DatabaseTableEditor);
const ColumnEditorClass = Vue.extend(DatabaseTableColumnEditor);
const ConfirmationModalClass = Vue.extend(ConfirmationModal);
let tableEditor = null,
  columnEditor = null;
export default {
  name: "DatabaseTable",
  components: {
    DatabaseTableBody,
    DatabaseTableHeader,
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
    getConfirmationModalsContainer() {
      return document.querySelector(".confirmation-modals-container");
    },
    confirm(title, description) {
      return new Promise((resolve, reject) => {
        let $el = document.createElement("div");
        $el.id = "confirmation-modal";
        this.getConfirmationModalsContainer().appendChild($el);
        let modal = new ConfirmationModalClass({
          propsData: {
            title: title,
            description: description
          }
        });
        modal.$on("ok", resolve);
        modal.$on("deny", reject);
        modal.$mount("confirmation-modal");
      });
    },
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
        B: false,
        FK: null
      };
      this.table.columns.push(column);
      this.openColumnEditor(this.table.columns.length - 1);
    },
    removeColumn(columnIndex) {
      this.confirm(
        "Are you sure?",
        "<p>Do you really want to delete this column?</p><p>This action can't be undone.</p>"
      ).then(() => this.table.columns.splice(columnIndex, 1));
    },
    remove() {
      this.confirm(
        "Are you sure?",
        "<p>Do you really want to delete this table?</p><p>This action can't be undone.</p>"
      ).then(() => this.$emit("remove"));
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

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
        :table-index="tableIndex"
        @edit="openTableEditor"
        @remove="remove"
        @add="createColumn"
      ></database-table-header>
      <database-table-body
        :table-index="tableIndex"
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

export default {
  name: "DatabaseTable",
  components: {
    DatabaseTableBody,
    DatabaseTableHeader,
    VueDraggableResizable
  },
  props: {
    tableIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      confirmationModalsContainer: null,
      confirmationModalId: "confirmation-modal",
      editorsContainer: null,
      tableEditorId: "table-editor",
      tableColumnEditorId: "table-column-editor"
    };
  },
  methods: {
    createConfirmationModal() {
      let $el = document.createElement("div");
      $el.id = this.confirmationModalId;
      this.confirmationModalsContainer.appendChild($el);
    },
    createEditor(id) {
      let editorContainer = document.createElement("div");
      editorContainer.id = id;
      this.editorsContainer.appendChild(editorContainer);
    },
    confirm(title, description) {
      return new Promise((resolve, reject) => {
        this.createConfirmationModal();
        let modal = new ConfirmationModalClass({
          propsData: {
            title: title,
            description: description
          }
        });
        modal.$on("ok", resolve);
        modal.$on("deny", reject);
        modal.$mount("#" + this.confirmationModalId);
      });
    },
    openTableEditor() {
      this.createEditor(this.tableEditorId);
      let editor = new TableEditorClass({
        store: this.$store,
        propsData: {
          tableIndex: this.tableIndex
        }
      });
      editor.$mount("#" + this.tableEditorId);
    },
    openColumnEditor(columnIndex) {
      this.createEditor(this.tableColumnEditorId);
      let editor = new ColumnEditorClass({
        store: this.$store,
        propsData: {
          tableIndex: this.tableIndex,
          columnIndex: columnIndex
        }
      });
      editor.$mount("#" + this.tableColumnEditorId);
    },
    createColumn() {
      this.$store
        .dispatch("diagram/addTableColumn", this.tableIndex)
        .then(() => {
          this.openColumnEditor(this.table.columns.length - 1);
        });
    },
    removeColumn(columnIndex) {
      this.confirm(
        "Are you sure?",
        "<p>Do you really want to delete this column?</p><p>This action can't be undone.</p>"
      )
        .then(() => {
          this.$store.dispatch("diagram/deleteTableColumn", {
            tableIndex: this.tableIndex,
            columnIndex
          });
        })
        .catch(() => console.log("Column deletion cancelled"));
    },
    remove() {
      this.confirm(
        "Are you sure?",
        "<p>Do you really want to delete this table?</p><p>This action can't be undone.</p>"
      )
        .then(() => {
          this.$store
            .dispatch("diagram/deleteTable", this.tableIndex)
            .then(() => {
              this.$destroy();
            });
        })
        .catch(() => console.log("Table deletion cancelled"));
    }
  },
  computed: {
    table() {
      return this.$store.state.diagram.tables[this.tableIndex];
    },
    scale() {
      return this.$store.state.diagram.scale;
    }
  },
  mounted() {
    this.confirmationModalsContainer = document.querySelector(
      ".confirmation-modals-container"
    );
    this.editorsContainer = document.querySelector(".editor-container");
    this.openTableEditor();
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

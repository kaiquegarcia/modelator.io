<template>
  <draggable v-model="columns" tag="tbody" role="rowgroup">
    <tr v-for="(column, columnIndex) in columns" role="row" :key="columnIndex">
      <td role="cell" class="text-center">
        <b-icon-diamond-fill
          v-if="column.PK"
          variant="danger"
        ></b-icon-diamond-fill>
        <b-icon-diamond-half
          v-else-if="column.FK && column.NN"
          variant="danger"
        ></b-icon-diamond-half>
        <b-icon-diamond v-else-if="column.FK" variant="danger"></b-icon-diamond>
        <b-icon-diamond-fill v-else-if="column.NN"></b-icon-diamond-fill>
        <b-icon-diamond v-else></b-icon-diamond>
      </td>
      <td role="cell">{{ column.name }}</td>
      <td role="cell">{{ column.dataType }}</td>
      <td role="cell" class="text-center">
        <b-icon-pencil
          class="cursor-pointer"
          @click="edit(columnIndex)"
        ></b-icon-pencil>
        <b-icon-x
          class="cursor-pointer"
          @click="remove(columnIndex)"
        ></b-icon-x>
      </td>
    </tr>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";

export default {
  name: "DatabaseTableBody",
  components: { draggable },
  props: {
    tableIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    edit(index) {
      this.$emit("edit", index);
    },
    remove(index) {
      this.$emit("remove", index);
    }
  },
  computed: {
    columns: {
      get() {
        return this.$store.state.diagram.tables[this.tableIndex].columns;
      },
      set(columns) {
        this.$store.dispatch("diagram/assignTableColumnsOrder", {
          tableIndex: this.tableIndex,
          columns
        });
      }
    }
  }
};
</script>

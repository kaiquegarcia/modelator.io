<template>
  <draggable v-model="columns" tag="tbody" role="rowgroup">
    <tr v-for="(column, columnIndex) in columns" role="row" :key="columnIndex">
      <td role="cell" class="text-center">
        <b-icon-lock v-if="column.PK"></b-icon-lock>
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
    columns: {
      type: Array,
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
  }
};
</script>

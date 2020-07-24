<template>
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
          <b-icon-pencil class="cursor-pointer" @click="edit"></b-icon-pencil>
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
        <b-icon-plus class="cursor-pointer" @click="add"></b-icon-plus>
      </th>
    </tr>
  </thead>
</template>
<script>
export default {
  name: "DatabaseTableHeader",
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit() {
      this.$emit("edit");
    },
    remove() {
      this.$emit("remove");
    },
    add() {
      this.$emit("add");
    }
  }
};
</script>

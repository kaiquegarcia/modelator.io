<template>
  <b-modal ref="modal" title="Table editor" @hidden="close">
    <div class="d-block">
      <b-form-group label="Name">
        <b-input type="text" v-model="table.name" required ref="tableName" />
      </b-form-group>
      <b-form-group label="Description">
        <b-input type="text" v-model="table.description" />
      </b-form-group>
      <b-form-group label="Engine">
        <b-input type="text" v-model="table.engine" />
      </b-form-group>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: "DatabaseTableEditor",
  props: {
    tableInput: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      table: this.tableInput
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  beforeDestroy() {
    this.$root.$el.parentNode.removeChild(this.$root.$el);
  },
  mounted() {
    this.$refs.modal.show();
    window.setTimeout(() => {
      this.$refs.tableName.focus();
      this.$refs.tableName.select();
    }, 500);
  }
};
</script>

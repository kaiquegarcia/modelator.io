<template>
  <b-modal ref="modal" title="Table editor" @hidden="destroy">
    <div class="d-block">
      <b-form-group label="Name">
        <b-input
          type="text"
          v-model="table.name"
          required
          ref="tableName"
          @keydown.native.enter="hide"
        />
      </b-form-group>
      <b-form-group label="Description">
        <b-input
          type="text"
          v-model="table.description"
          @keydown.native.enter="hide"
        />
      </b-form-group>
      <b-form-group label="Engine">
        <b-input
          type="text"
          v-model="table.engine"
          @keydown.native.enter="hide"
        />
      </b-form-group>
    </div>
  </b-modal>
</template>
<script>
export default {
  name: "DatabaseTableEditor",
  props: {
    tableIndex: {
      type: Number,
      required: true
    }
  },
  methods: {
    hide() {
      this.$refs.modal.hide();
    },
    destroy() {
      window.setTimeout(() => this.$destroy(), 600);
    }
  },
  beforeDestroy() {
    this.$root.$el.parentNode.removeChild(this.$root.$el);
  },
  mounted() {
    this.$refs.modal.show();
    window.setTimeout(() => {
      if (this.$refs.tableName) {
        this.$refs.tableName.focus();
        this.$refs.tableName.select();
      }
    }, 500);
  },
  computed: {
    table() {
      return this.$store.state.diagram.tables[this.tableIndex];
    }
  }
};
</script>

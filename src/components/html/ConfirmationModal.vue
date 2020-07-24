<template>
  <b-modal ref="modal" :title="title" @ok="confirm" @hidden="deny">
    <div v-html="description"></div>
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button variant="outline-secondary" @click.prevent="cancel">
        Nevermind...
      </b-button>
      <b-button variant="danger" @click.prevent="ok">Do it!</b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  methods: {
    confirm() {
      this.$emit("ok");
      this.destroy();
    },
    deny() {
      this.$emit("deny");
      this.destroy();
    },
    destroy() {
      window.setTimeout(() => this.$destroy(), 600);
    }
  },
  mounted() {
    this.$refs.modal.show();
  },
  beforeDestroy() {
    this.$root.$el.parentNode.removeChild(this.$root.$el);
  }
};
</script>

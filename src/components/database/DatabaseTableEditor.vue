<template>
  <div>
    <div class="form-shadow cursor-pointer" @click="close"></div>
    <form @submit.prevent="false">
      <h3>
        Table editor
        <b-icon-x-circle
          class="float-right cursor-pointer"
          @click="close"
        ></b-icon-x-circle>
      </h3>
      <hr />
      <b-form-group label="Name">
        <b-input type="text" v-model="table.name" required ref="tableName" />
      </b-form-group>
      <b-form-group label="Description">
        <b-input type="text" v-model="table.description" />
      </b-form-group>
      <b-form-group label="Engine">
        <b-input type="text" v-model="table.engine" />
      </b-form-group>
    </form>
  </div>
</template>
<script>
export default {
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
    this.$refs.tableName.focus();
    this.$refs.tableName.select();
  }
};
</script>
<style lang="sass" scoped>
.form-shadow
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background: rgba(0,0,0, 0.4)
    z-index: 1045
form
    position: fixed
    top: 50%
    left: 50%
    transform: translateX(-50%) translateY(-50%)
    width: 450px
    max-width: 100%
    z-index: 1046
    background: #fff
    padding: 30px 15px 15px
    text-align: left
    border-radius: 15px
</style>

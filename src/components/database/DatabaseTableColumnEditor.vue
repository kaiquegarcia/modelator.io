<template>
  <div>
    <div class="form-shadow cursor-pointer" @click="close"></div>
    <form @submit.prevent="false">
      <h3>
        Column editor
        <b-icon-x-circle
          class="float-right cursor-pointer"
          @click="close"
        ></b-icon-x-circle>
      </h3>
      <hr />
      <b-form-group label="Name">
        <b-input type="text" v-model="column.name" required />
      </b-form-group>
      <b-form-group label="Data type">
        <b-input type="text" v-model="column.dataType" required />
      </b-form-group>
      <b-form-group label="Default value/expression">
        <b-input type="text" v-model="column.defaultExpression" />
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          id="PK"
          v-model="column.PK"
          :value="true"
          :unchecked-value="false"
        >
          Primary Key
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          id="AI"
          v-model="column.AI"
          :value="true"
          :unchecked-value="false"
        >
          Auto Increment
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          id="NN"
          v-model="column.NN"
          :value="true"
          :unchecked-value="false"
        >
          Not Null
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          id="UQ"
          v-model="column.UQ"
          :value="true"
          :unchecked-value="false"
        >
          Unique
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          id="UN"
          v-model="column.UN"
          :value="true"
          :unchecked-value="false"
        >
          Unsigned
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          id="ZF"
          v-model="column.ZF"
          :value="true"
          :unchecked-value="false"
        >
          Zero Filled
        </b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox
          id="B"
          v-model="column.B"
          :value="true"
          :unchecked-value="false"
        >
          Binary
        </b-form-checkbox>
      </b-form-group>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    columnInput: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      column: this.columnInput
    };
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  beforeDestroy() {
    this.$root.$el.parentNode.removeChild(this.$root.$el);
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

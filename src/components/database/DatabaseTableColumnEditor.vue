<template>
  <b-modal ref="modal" title="Column editor" @hidden="close">
    <div class="d-block">
      <b-form-group label="Name">
        <b-input type="text" v-model="column.name" required ref="columnName" />
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
    </div>
  </b-modal>
</template>
<script>
export default {
  name: "DatabaseColumnEditor",
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
  },
  mounted() {
    this.$refs.modal.show();
    window.setTimeout(() => {
      this.$refs.columnName.focus();
      this.$refs.columnName.select();
    }, 500);
  }
};
</script>

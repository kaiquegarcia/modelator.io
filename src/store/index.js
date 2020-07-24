import Vuex from "vuex";
import Vue from "vue";
import diagram from "./modules/diagram";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    diagram
  }
});

export default store;

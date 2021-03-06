import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

import { deepSort, flatten, appendEmployee } from './helpers';

export default new Vuex.Store({
  state: {
    employeeTree: {
      id: 0,
      name: 'root',
      subordinates: [],
    },
    idCount: 1,
    employeeList: [],
  },
  getters: {},
  mutations: {
    addEmployee(state, employee) {
      state.employeeTree.subordinates = appendEmployee(
        state.employeeTree.subordinates,
        {
          ...employee,
          id: state.idCount,
          subordinates: [],
        }
      );
      state.idCount++;
    },
    setEmployeeList(state) {
      state.employeeList = flatten(state.employeeTree.subordinates);
    },
    sortEmployees(state, column) {
      state.employeeTree.subordinates = deepSort(
        state.employeeTree.subordinates,
        column
      );
    },
  },
  actions: {
    updateEmployees({ commit }, employee) {
      commit('addEmployee', employee);
      commit('setEmployeeList');
    },
    sortEmployees({ commit }, column) {
      commit('sortEmployees', column);
    },
  },
  modules: {},
  plugins: [new VuexPersistence().plugin],
});

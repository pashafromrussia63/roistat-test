<template lang="pug">
div
  EmployeeTable(
    :sort="sortEmployees", 
    :showModal="showModal"
  )
    template(v-slot:treeMenu)
      TreeMenu(
        v-for="subordinate in employeeTree.subordinates"
        :key="subordinate.id"
        :employee="subordinate"
        :depth="0"
      )
  AddModalWindow(
    v-show="isModalVisible" 
    :employees="employeeList"
    @save="updateEmployees"
    @close="closeModal"
  )
</template>

<script>
import EmployeeTable from '@/components/EmployeeTable';
import AddModalWindow from '@/components/AddModalWindow';
import TreeMenu from '@/components/TreeMenu';
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Layout',
  data() {
    return {
      isModalVisible: false,
    };
  },
  computed: {
    ...mapState(['employeeTree', 'employeeList']),
  },
  methods: {
    ...mapMutations(['sortEmployees']),
    ...mapActions(['updateEmployees']),
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
  components: {
    AddModalWindow,
    EmployeeTable,
    TreeMenu,
  },
};
</script>

<template lang="pug">
div.treeMenu
  .treeMenu__row
    span.treeMenu__cell(:style="indent")
      span.treeMenu__toggle(@click="toggleSubordinates") {{ hasSubordinates ? (showSubordinates ? '-' : '+') : '' }}
      span {{ employee.name }}
    span.treeMenu__cell {{ employee.phone }}
  TreeMenu(
    v-if="showSubordinates"
    v-for="subordinate in employee.subordinates"
    :key="subordinate.id"
    :employee="subordinate"
    :depth="depth + 1"
  )
</template>

<script>
export default {
  name: 'TreeMenu',
  data() {
    return { showSubordinates: false };
  },
  props: ['employee', 'depth'],
  computed: {
    indent() {
      return `text-indent: ${this.depth * 25}px`;
    },
    hasSubordinates() {
      return this.employee.subordinates.length > 0;
    },
  },
  methods: {
    toggleSubordinates() {
      this.showSubordinates = !this.showSubordinates;
    },
  },
};
</script>

<style lang="scss" scoped>
.treeMenu {
  width: 100%;
  &__cell {
    padding: 3px;
    border: 1px solid #000;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__row {
    display: flex;
    width: 100%;
  }
  &__toggle {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>

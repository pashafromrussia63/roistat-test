<template lang="pug">
.employees
  button.employees__button(@click="showModal()") Добавить
  .employees__table
    .employees__header
      .employees__headerCell(@click="sort('name')") Имя
      .employees__headerCell(@click="sort('phone')") Телефон
    slot(name="treeMenu")
</template>

<script>
export default {
  name: 'EmployeeTable',
  props: ['sort', 'showModal'],
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.employees {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &__table {
    min-width: 300px;
    resize: horizontal;
    overflow: hidden;
    margin-top: 20px;
  }
  &__header {
    width: 100%;
    display: flex;
  }
  &__headerCell {
    padding: 3px;
    width: 50%;
    border: 1px solid #000;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  &__button {
    padding: 3px;
    border: 1px solid #000;
    border-radius: 5px;
    width: 100px;
    cursor: pointer;
  }
}
</style>

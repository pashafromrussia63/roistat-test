<template lang="pug">
.modal
  .modal__backdrop(@click.self="close")
    .modal__form
      header.modal__header
        .modal__close(@click="close") +
      .modal__body
        .modal__inputRow
          .modal__inputLabel Имя
          input.modal__input(
            type="text"
            v-model="name"
            :class="{'modal__input--error': $v.name.$error}"
          )
        .modal__inputRow
          .modal__inputLabel Телефон
          input.modal__input(
            type="text"
            v-model.trim="phone"
            :class="{'modal__input--error': $v.phone.$error}"
          )
        .modal__inputRow
          .modal__inputLabel Начальник
          select.modal__input(v-model="superior")
            option(v-for="employee in employees" :value="employee.id") [{{ employee.id }}] {{employee.name}}
        button(@click="save") Сохранить
</template>

<script>
import { required, helpers, numeric } from 'vuelidate/lib/validators';
const alpha = helpers.regex('alpha', /^[a-zA-Zа-яА-ЯёЁ\s]+$/);

export default {
  name: 'AddModalWindow',
  props: ['employees'],
  data() {
    return {
      name: null,
      phone: null,
      superior: null,
    };
  },
  methods: {
    close() {
      this.$emit('close');
      this.clearData();
    },
    save() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.$emit('save', {
          name: this.name,
          phone: this.phone,
          superior: this.superior,
        });
        this.clearData();
      }
    },
    clearData() {
      this.name = null;
      this.phone = null;
      this.superior = null;
      this.$v.$reset();
    },
  },
  validations: {
    name: {
      required,
      alpha,
    },
    phone: {
      required,
      numeric,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.modal {
  &__input {
    box-sizing: border-box;
    width: 150px;
    padding: 1px;
    border-width: 1px;
    &--error {
      border-color: red;
    }
  }
  &__backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__form {
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    min-height: 200px;
  }
  &__header {
    padding: 15px;
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  &__close {
    transform: rotate(45deg);
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: red;
    background: transparent;
  }
  &__body {
    padding: 15px;
  }
  &__inputRow {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  &__inputLabel {
    padding-right: 15px;
  }
}
</style>

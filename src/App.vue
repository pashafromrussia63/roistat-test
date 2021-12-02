<template lang="pug">
  #app
    Layout
</template>

<script>
import Layout from './layout/Layout';

export default {
  name: 'App',
  components: {
    Layout,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

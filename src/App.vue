<template>
  <div>
    <div class="container">
    <NavbarView />
    <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavbarView from './views/NavbarView.vue';
export default {
  name: 'App',
  components: {
    NavbarView
  }
}
</script>
<style>
  
</style>
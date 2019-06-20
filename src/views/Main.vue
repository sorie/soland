<template>
  <div class="main">
    <ul class="menu">
      <router-link to="/Main">components</router-link>
      <router-link to="/about">list</router-link>
    </ul>
   <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Main'
}
</script>
<style scoped lang="scss">
  .menu {
    z-index: 3;
    position: absolute;
    right: 10px;
    line-height: 70px;
    color:red;
    font-weight: 800;
    a {
      cursor: pointer;
      color: red;
      display: inline-block;
      margin-right: 10px;
    }
  }
</style>
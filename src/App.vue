<template>
  <div id="app">
    <Main></Main>
  </div>
</template>
<script>
import Main from "@/views/Main.vue"

export default {
  components : {
    Main
  }
}
</script>
<style>
body {
  background-color: black;
  color: #fff;
  margin: 0;
  overflow-x: hidden;
  transition: all 1s ease-in;
}
::selection {
  background: #FF3D00;
  color: #fff;
  text-shadow: none;
}
</style>

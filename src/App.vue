<template>
  <div id="app">
    <Index></Index>
  </div>
</template>
<script>
import Index from "@/views/index.vue"

export default {
  components : {
    Index
  }
}
</script>
<style>
ul, menu, dir {
    display: block;
    list-style-type: disc;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-right: 0px;
    padding-left: 0px;
}
a {
  color: #fafafa;
  list-style: none;
  text-decoration: none;
}
body {
  background-color: black;
  color: #fff;
  margin: 0;
  overflow-x: hidden;
  transition: all 1s ease-in;
  font-size: 12px;
}
::selection {
  background: #FF3D00;
  color: #fff;
  text-shadow: none;
}
</style>

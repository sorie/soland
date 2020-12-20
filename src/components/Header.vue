<template>
  <div class="mainMovie" :style="[mainStyle]">
    <pro-list></pro-list>
    <!-- <my-canvas style="width:100%;height:100%">
    </my-canvas> -->
  </div>
</template>
<script>
// import MyCanvas from '@/components/MyCanvas.vue'
import ProList from '@/components/ProList.vue'

export default {
  name: "Header",
  components: {
    // MyCanvas
    ProList
  },
  data() {
    return {
      mainStyle : {
        backgroundImage: 'url(http://films.bybrettjohnson.com/img/tn-aquarium.gif)'
      }
    }
  },
  mounted() {
    this.heightResize()
  },
  methods: {
    heightResize() {
      let wh = window.innerHeight
      let mainh = this.$refs.mainMovie
      mainh.style.height  = wh + 'px'
    }
  },
}
</script>
<style lang="scss">
a, li {
  color: #f00;
  list-style: none;
  text-decoration: none;
}

.mainMovie {
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  overflow-y: scroll;
}

</style>

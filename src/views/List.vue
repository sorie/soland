<template>
  <section class="container">
    <div class="ListWrap" ref="ListWrap" :style="[mainStyle]">
      <pro-list></pro-list>
      <!-- <my-canvas style="width:100%;height:100%">
      </my-canvas> -->
    </div>
    <Footer/>
  </section>
</template>

<script>
import ProList from '@/components/ProList.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'List',
  components: {
    ProList,
    Footer
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
      let mainh = this.$refs.ListWrap
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

.ListWrap {
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  overflow-y: scroll;
}
</style>

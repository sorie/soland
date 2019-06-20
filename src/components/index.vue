<template>
  <section class="container">
    <Header/>
    <Movie/>
    <Footer/>
  </section>
</template>

<script>
import Header from './Header.vue'
import Movie from './Movie.vue'
import Footer from './Footer.vue'

export default {
  components: {
    Header,
    Movie,
    Footer
  }
}
</script>

<style>
html {
  overflow-x: hidden;
  color: #fff;
  transition: all 1s ease-in;
}
::selection {
  background: #FF3D00;
  color: #fff;
  text-shadow: none;
}
</style>


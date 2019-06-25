<template>
  <div class="about">
    <Movie/> 
    <Footer/>
  </div>
</template>
<script>
import Movie from '@/components/Movie.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Movie,
    Footer
  }
}
</script>

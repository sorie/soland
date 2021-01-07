<template>
  <div class="container">
    <proList/>
    <Footer/>
  </div>
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
}
</script>

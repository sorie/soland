<template>
  <div class="container">
    <Comp-ex /> 
    <Footer />
  </div>
</template>
<script>
import CompEx from '@/components/Component_ex.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    CompEx,
    Footer
  }
}
</script>

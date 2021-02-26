<template>
  <div class="container">
    <New />
  </div>
</template>

<script>
import axios from 'axios'
import New from '~/pages/new/index.vue'

export default {
  data () {
    return {
      data: ''
    }
  },
  components: {
    New,
  }
}
</script>

<style lang="scss">
</style>


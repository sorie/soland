<template>
  <div class="container" style="margin-top: 20px">
    <content-loader
      :height="160"
      :width="380"
      :speed="1"
      primaryColor="rgba(255,255,255,.07)"
      secondaryColor="rgba(255,255,255,.23)"
      v-for="(item, index) in 5"
      v-bind:item="item"
      v-bind:index="index"
      v-bind:key="item"
      style="margin-left:-20px;"
    >
      <rect x="37.44" y="42.27" rx="0" ry="0" width="0" height="0" /> 
      <rect x="14.44" y="6.27" rx="0" ry="0" width="178" height="105" /> 
      <rect x="93.44" y="83.27" rx="0" ry="0" width="0" height="0" /> 
      <rect x="207.44" y="6.27" rx="0" ry="0" width="178" height="105" /> 
      <rect x="14.5" y="123.27" rx="0" ry="0" width="161" height="7.04" /> 
      <rect x="207.5" y="122.27" rx="0" ry="0" width="161" height="8.03" /> 
      <rect x="15.5" y="136.27" rx="0" ry="0" width="111" height="7" /> 
      <rect x="86.5" y="132.27" rx="0" ry="0" width="0" height="0" /> 
      <rect x="209.5" y="136.27" rx="0" ry="0" width="111" height="7" />
    </content-loader>
  </div>
</template>
<script>
import { ContentLoader } from "vue-content-loader"

export default {
  data () {
    return {
    }
  },
  components: {
    ContentLoader
  },
}
</script>
<template>
  <div class="container" style="margin-top: 20px">
    <content-loader
      :height="110"
      :width="380"
      :speed="2"
      primaryColor="rgba(255,255,255,.07)"
      secondaryColor="rgba(255,255,255,.23)"
      v-for="(item, index) in 5"
      v-bind:item="item"
      v-bind:index="index"
      v-bind:key="item"
      style="margin-left:-25px"
    >
      <rect x="37.44" y="42.27" rx="0" ry="0" width="0" height="0" /> 
      <rect x="14.44" y="6.27" rx="0" ry="0" width="117.48" height="73.5" /> 
      <rect x="93.44" y="83.27" rx="0" ry="0" width="0" height="0" /> 
      <rect x="141.58" y="6.27" rx="0" ry="0" width="117.48" height="73.5" /> 
      <rect x="14.48" y="87.66" rx="0" ry="0" width="106.26" height="4.928" /> 
      <rect x="15.14" y="96.7" rx="0" ry="0" width="73.26" height="4.8999999999999995" /> 
      <rect x="86.5" y="132.27" rx="0" ry="0" width="0" height="0" /> 
      <rect x="268.58" y="7.27" rx="0" ry="0" width="117.48" height="73.5" /> 
      <rect x="140.48" y="86.66" rx="0" ry="0" width="106.26" height="4.928" /> 
      <rect x="143.14" y="95.7" rx="0" ry="0" width="73.26" height="4.8999999999999995" /> 
      <rect x="268.48" y="85.66" rx="0" ry="0" width="106.26" height="4.928" /> 
      <rect x="269.14" y="93.7" rx="0" ry="0" width="73.26" height="4.8999999999999995" />
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
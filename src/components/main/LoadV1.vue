<template>
  <div class="container" style="margin-top: 20px">
	<content-loader
		:height="90"
		:width="360"
		:speed="2"
    primaryColor="rgba(255,255,255,.07)"
    secondaryColor="rgba(255,255,255,.23)"
		v-for="(item,idx) in 5"
		v-bind:item="item"
		v-bind:index="idx"
		v-bind:key="item"
	>
		<rect x="37.44" y="42.27" rx="0" ry="0" width="0" height="0" /> 
		<rect x="5.3" y="4.46" rx="0" ry="0" width="138.4" height="75.47" /> 
		<rect x="93.44" y="83.27" rx="0" ry="0" width="0" height="0" /> 
		<rect x="152.48" y="30.51" rx="0" ry="0" width="149.05" height="7.58" /> 
		<rect x="152.76" y="43.63" rx="0" ry="0" width="106.77" height="8.15" /> 
		<rect x="86.5" y="132.27" rx="0" ry="0" width="0" height="0" />
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
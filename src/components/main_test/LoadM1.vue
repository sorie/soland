<template>
  <div class="container" style="margin-top: 20px">
    <content-loader
	  	:height="200"
	  	:width="350"
	  	:speed="2"
      primaryColor="rgba(255,255,255,.07)"
      secondaryColor="rgba(255,255,255,.23)"
      style="margin-left: -15px;margin-right: -15px;"
	  >
		<rect x="37.44" y="42.27" rx="0" ry="0" width="0" height="0" /> 
		<rect x="-1.7" y="-0.54" rx="0" ry="0" width="419.4" height="150.98" /> 
		<rect x="93.44" y="83.27" rx="0" ry="0" width="0" height="0" /> 
		<rect x="10.52" y="168.27" rx="0" ry="0" width="202.96" height="7.49" /> 
		<rect x="10.33" y="183.27" rx="0" ry="0" width="126.74" height="7.5" /> 
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
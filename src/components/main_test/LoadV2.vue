<template>
  <div class="container" style="margin-top: 20px">
	<content-loader
		:height="60"
		:width="405"
		:speed="2"
    primaryColor="rgba(255,255,255,.07)"
    secondaryColor="rgba(255,255,255,.23)"
		v-for="(item,idx) in 5"
		v-bind:item="item"
		v-bind:index="idx"
		v-bind:key="item"
	>
		<rect x="37.44" y="42.27" rx="0" ry="0" width="0" height="0" /> 
		<rect x="5.3" y="4.46" rx="0" ry="0" width="99.648" height="54.3384" /> 
		<rect x="93.44" y="83.27" rx="0" ry="0" width="0" height="0" /> 
		<rect x="112.48" y="21.23" rx="0" ry="0" width="84.9585" height="4.3206" /> 
		<rect x="110.76" y="32.81" rx="0" ry="0" width="69.4005" height="5.2975" /> 
		<rect x="86.5" y="132.27" rx="0" ry="0" width="0" height="0" /> 
		<rect x="205.3" y="6.46" rx="0" ry="0" width="99.648" height="54.3384" /> 
		<rect x="311.48" y="20.23" rx="0" ry="0" width="84.9585" height="4.3206" /> 
		<rect x="310.76" y="30.81" rx="0" ry="0" width="69.4005" height="5.2975" />
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
<template>
	<section class="container videoChat">
		<h1>webRTC transparent</h1>
		<div class="cont">
			<video 
				id="getVideo" 
				autoplay 
				playsinline 
				controls
			/>
			<button @click="videoStart">
				start
			</button>
		</div>
		<div class="cont">
			<button @click="getDevices">get devices start</button>
		</div>
	</section>
</template>
<script>
export default {
	name: 'VideoChat',
	methods: {
		async videoStart() {
			try {
				const constraints = {
					'video': true,
					'audio': false
				}
				const stream = await navigator.mediaDevices.getUserMedia(constraints);
				const videoElement = document.getElementById('getVideo');
				videoElement.srcObject = stream;
			}
			catch(error){
				console.error(error);
			}
		},
		async getDevices() {
			try {
				const devices = await navigator.mediaDevices.enumerateDevices();
				console.info(devices);
			}
			catch(error){
				console.error(error);
			}
		}
	}
}
</script>
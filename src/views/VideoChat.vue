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
			<button @click="videoPause">
				pause
			</button>
		</div>
		<div class="cont">
			<button @click="getDevices('videoinput')">get camera list</button>
			<select name="" id="availableCameras"></select>
			<button @click="getDevices('audioinput')">get audio list</button>
			<select name="" id="availableAudios"></select>
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
				let videoTracks = await stream.getVideoTracks();
        console.info(`media Devices label : ${videoTracks[0].label}`);
			}
			catch(error){
				console.error(error);
			}
		},
		videoPause() {
			const videoElement = document.getElementById('getVideo');
			if(videoElement.paused) videoElement.play();
			else videoElement.pause()
		},
		async getDevices(type) {
			const devices = await this.getConnectedDevices(type);
			await this.updateList(devices, type);

			navigator.mediaDevices.addEventListener('devicechange', event => {
				const newCameraList = this.getConnectedDevices('video');
				const newAudioList = this.getConnectedDevices('audio');
				this.updateList(newCameraList, 'video');
				this.updateList(newAudioList, 'audio');
			})
		},
		async getConnectedDevices(type) {
			try {
				const devices = await navigator.mediaDevices.enumerateDevices();
				console.info(devices);
				return devices.filter(device => device.kind === type);
			}
			catch(error){
				console.error(error);
			}
		},
		updateList(devices, type){
			let listElement;
			if(type === 'videoinput' || type === 'video'){
				listElement = document.querySelector('select#availableCameras');
			}
			else if(type === 'audioinput' || type === 'audio'){
				listElement = document.querySelector('select#availableAudios');
			}
			listElement.innerHTML = '';
			devices.map(device => {
        const deviceOption = document.createElement('option');
        deviceOption.label = device.label;
        deviceOption.value = device.deviceId;
				listElement.add(deviceOption)
    	});
		}
	}
}
</script>
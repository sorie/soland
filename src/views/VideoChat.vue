<template>
	<section class="container videoChat">
		<h1>webRTC transparent</h1>
		<div class="cont">
			<video 
				id="getVideo" 
				class="getVideo"
				autoplay 
				playsinline 
				controls
			/>
			<div class="btnWrap">
				<button @click="videoStart">
					start
				</button>
				<button @click="videoPause">
					pause
				</button>
			</div>
		</div>
		<div class="cont">
			<div class="selectWrap">
				<select name="" id="availableCameras"></select>
				<button @click="getDevices('videoinput')">get camera list</button>
			</div>
			<div class="selectWrap">
				<select name="" id="availableAudios"></select>
				<button @click="getDevices('audioinput')">get audio list</button>
			</div>
		</div>
	</section>
</template>
<script>

export default {
	name: 'VideoChat',
	data() {
		return {
			bSupportBrowser : true,
			ismobiletype : true,
			devicetype : ''
		}
	},
	beforeCreate() {
		let userAgent = navigator.userAgent;

		if(userAgent.match(/Mobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Opera Mini|\bCrMo\/|Opera Mobi/i) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ){
			if(userAgent.match(/iPhone|iPod|iPad/i) || navigator.platform === 'MacIntel'){
				this.devicetype = 'iOS';
				this.appConfig.devicetype = 'iOS';
			}
			else{
				this.devicetype = 'Android';
				this.appConfig.devicetype = 'Android';
			}

			if(this.devicetype==='iphone'){
					if(navigator.userAgent.match('CriOS') || navigator.userAgent.match('FxiOS')) {
							this.bSupportBrowser = false;
					}
					else {
							// iphone은 safari만 지원.
							let safariversion = parseFloat(userAgent.substr(userAgent.indexOf("Version")).split(' ')[0].split('/')[1]);
							if(userAgent.indexOf('NAVER') !== -1) {
								this.bSupportBrowser = false;
							}else if(userAgent.indexOf('KAKAOTALK') !== -1) {
								this.bSupportBrowser = false;
							}else if(safariversion < 11.0){
								this.bSupportBrowser = false;
							}
							else{
								if(navigator.mediaDevices){
									this.bSupportBrowser = true;
								}
								else{
									this.bSupportBrowser = false;
								}
							}
					}
			}
			else{
					if(userAgent.indexOf('Chrome') !== -1) {
							// android는 chrome만 지원.
							if(userAgent.indexOf('NAVER') !== -1) {
									this.bSupportBrowser = false;
							}else if(userAgent.indexOf('KAKAOTALK') !== -1) {
									this.bSupportBrowser = false;
							}else{
									this.bSupportBrowser = true;
							}
					}
					else{
							this.bSupportBrowser = false;
					}
			}
		}
		else{
				this.ismobiletype = false;
				this.devicetype = 'pc';
				this.appConfig.devicetype = 'pc';
		}
	},
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
<style lang="scss" scoped>
video.getVideo {
	width: 100%;
}
.cont {
	margin-bottom: 3em;
}
button {
	border: none;
	background: rgba(255,255,255,.1);
	padding: 1em 1.5em;
	color: #fff;
}
.btnWrap>button {
	margin-right: 1em;
}
.selectWrap {
	&>select{
		min-width: 7rem;
		min-height: 2.8rem;
	}
	&>button{
		margin-right: 1em;
	}
}
</style>
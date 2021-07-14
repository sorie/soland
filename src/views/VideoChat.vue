<template>
	<section class="container videoChat">
		<h1>webRTC for video chat test</h1>
		<div class="cont">
			<h2>1. get video</h2>
			<video 
				id="getVideo" 
				class="getVideo"
				autoplay 
				playsinline 
				controls
			/>
			<video 
				id="getVideoTwo" 
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
			<h2>2. get device information</h2>
			<div class="selectWrap">
				<select name="" id="availableCameras"></select>
				<button @click="getDevices('videoinput')">get camera list</button>
			</div>
			<div class="selectWrap">
				<select name="" id="availableAudios"></select>
				<button @click="getDevices('audioinput')">get audio list</button>
			</div>
		</div>
		<div>
			<h2>3. connection webRtc</h2>
			<div class="btnWrap">
				<button @click="videoStart">start</button>
				<button id="btn_connect" @click="connectPeer">connect</button>
				<button id="btn_hangUp" @click="hangUp">hang up</button>
			</div>
		</div>
	</section>
</template>
<script>
import adapter from 'webrtc-adapter';

export default {
	name: 'VideoChat',
	data() {
		return {
			bSupportBrowser : true,
			ismobiletype : true,
			devicetype : '',
			adapter: adapter,
			localStream: null,
			pc1: null,
			pc2: null,
		}
	},
	beforeMount() {
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

			// browser check
			this.appConfig.browsertype = this.adapter.browserDetails.browser;
			if(this.appConfig.browsertype==='chrome'){
					if(userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1){
							this.appConfig.browsertype = "opera";
					}
			}

			if(window.navigator.userAgent.toLowerCase().indexOf("edg") > -1){
					// wss websocket not supported
					this.appConfig.browsertype = 'edg';
					this.bSupportBrowser = false;
			}
		}	

		if(!this.bSupportBrowser) {
			alert('지원하지 않는 브라우저 입니다.')
		}
	},
	mounted() {
		const btn_connect = document.getElementById('btn_connect');
		const btn_hangup = document.getElementById('btn_hangUp');
		btn_connect.disabled = true;
		btn_hangup.disabled = true;
		navigator.mediaDevices.addEventListener('devicechange', event => {
			const newCameraList = this.getConnectedDevices('video');
			const newAudioList = this.getConnectedDevices('audio');
			this.updateList(newCameraList, 'video');
			this.updateList(newAudioList, 'audio');
		})
	},
	methods: {
		async videoStart() {
			try {
				const constraints = {
					'video': true,
					'audio': true
				}
				const stream = await navigator.mediaDevices.getUserMedia(constraints);
				const videoElement = document.getElementById('getVideo');
				videoElement.srcObject = stream;
				this.localStream = stream;
				let videoTracks = await stream.getVideoTracks();
        console.info(`media Devices label : ${videoTracks[0].label}`);
				const btn_connect = document.getElementById('btn_connect');
				const btn_hangup = document.getElementById('btn_hangUp');
				btn_connect.disabled = false;
				btn_hangup.disabled = false;
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
		},
		connectPeer() {
			let startTime = window.performance.now();
			const videoTracks = this.localStream.getVideoTracks();
			const audioTracks = this.localStream.getAudioTracks();
			if(videoTracks.length > 0) {
				console.info(`Using video device: ${videoTracks[0].label}`)
			}
			if(audioTracks.length > 0) {
				console.info(`Using audio device: ${audioTracks[0].label}`)
			}
			const configuration = {};
			this.pc1 = new RTCPeerConnection(configuration);
			this.pc1.addEventListener('icecandidate', e => this.onIceCadidate(pc1, e));

		},
		hangUp() {
			console.log('Ending call');
			pc1.close();
			pc2.close();
			pc1 = null;
			pc2 = null;
			hangupButton.disabled = true;
			callButton.disabled = false;
		},
		async onIceCandidate(pc, event) {
			try {
				await (this.getOtherPc(pc).addIceCandidate(event.candidate));
				onAddIceCandidateSuccess(pc);
			} catch (e) {
				onAddIceCandidateError(pc, e);
			}
			console.log(`${this.getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
		},
		getName(pc) {
			return (pc === pc1) ? 'pc1' : 'pc2';
		},
		getOtherPc(pc) {
			return (pc === pc1) ? pc2 : pc1;
		}
	}
}
</script>
<style lang="scss" scoped>
.videoChat {
	max-width: 1000px;
	width: 80%;
	margin: 0 auto;
}
video.getVideo {
  --width: 45%;
  width: var(--width);
  height: calc(var(--width) * 0.75);
  margin: 0 0 20px 0;
  vertical-align: top;
}
video#getVideo {
  margin: 0 20px 20px 0;
}
.cont {
	margin-bottom: 3em;
}
button {
	border: none;
	background: rgba(255,255,255,.2);
	padding: 1em 1.5em;
	color: #fff;
	cursor: pointer;
}
button:disabled {
	background: rgba(255,255,255,.08);
	cursor: not-allowed;
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
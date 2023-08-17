<template>
	<section class="container videoChat">
		<h1>webRTC for video chat test</h1>
		<div class="cont">
			<h2>1. get video</h2>
			<video 
				id="localVideo" 
				class="getVideo"
				autoplay 
				playsinline 
				controls
			/>
			<video 
				id="remoteVideo" 
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
	name: 'cont_videoChat',
	data() {
		return {
			bSupportBrowser : true,
			ismobiletype : true,
			devicetype : '',
			adapter: adapter,
			localStream: null,
			pc1: null,
			pc2: null,
			offerOptions: {
				offerToReceiveAudio: 1,
				offerToReceiveVideo: 1
			},
		}
	},
	beforeMount() {
    try{
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
      
    } catch(e) {
      console.log(e);
    }
	},
	mounted() {
		const btn_connect = document.getElementById('btn_connect');
		const btn_hangup = document.getElementById('btn_hangUp');
		btn_connect.disabled = true;
		btn_hangup.disabled = true;
		if(navigator.mediaDevices){
			navigator.mediaDevices.addEventListener('devicechange', event => {
				const newCameraList = this.getConnectedDevices('video');
				const newAudioList = this.getConnectedDevices('audio');
				this.updateList(newCameraList, 'video');
				this.updateList(newAudioList, 'audio');
			})
		}
	},
	methods: {
		async videoStart() {
			try {
				const constraints = {
					'video': true,
					'audio': true
				}
        debugger;
				const stream = await navigator.mediaDevices.getUserMedia(constraints);
				const videoElement = document.getElementById('localVideo');
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
			const videoElement = document.getElementById('localVideo');
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
			listElement.innerHTML.replace('');
			devices.map(device => {
        const deviceOption = document.createElement('option');
        deviceOption.label = device.label;
        deviceOption.value = device.deviceId;
				listElement.add(deviceOption)
    	});
		},
		async connectPeer() {
			let startTime = window.performance.now();
			const videoTracks = this.localStream.getVideoTracks();
			const audioTracks = this.localStream.getAudioTracks();
			document.getElementById('btn_hangUp').disabled = false;
			if(videoTracks.length > 0) {
				console.info(`Using video device: ${videoTracks[0].label}`)
			}
			if(audioTracks.length > 0) {
				console.info(`Using audio device: ${audioTracks[0].label}`)
			}
			const configuration = {};
			this.pc1 = new RTCPeerConnection(configuration);
			this.pc1.addEventListener('icecandidate', e => this.onIceCandidate(this.pc1, e));
			this.pc2 = new RTCPeerConnection(configuration);
			this.pc2.addEventListener('icecandidate', e => this.onIceCandidate(this.pc2, e));

			this.pc1.addEventListener('iceconnectionstatechange', e => this.onIceStateChange(this.pc1, e));
			this.pc2.addEventListener('iceconnectionstatechange', e => this.onIceStateChange(this.pc2, e));
			this.pc2.addEventListener('track', e => this.gotRemoteStream(e));

			this.localStream.getTracks().forEach(track => this.pc1.addTrack(track, this.localStream));
			console.info('Added local stream to pc1');

			try{
				console.info('pc1 createOffer start');
				const offer = await this.pc1.createOffer(this.offerOptions);
				await this.onCreateOfferSuccess(offer);
			}catch(e){
				this.onCreateSessionDescriptionError(e);
			}

		},
		async onCreateOfferSuccess(desc) {
			console.info(`offer from pc1\n ${desc.sdp}`);
			console.info('pc1 setLocalDescription start');
			try{
				await this.pc1.setLocalDescription(desc);
				this.onSetLocalSuccess(this.pc1);
			}catch(e){
				this.onSetSessionDescriptionError();
			}

			console.info('pc2 setRemoteDesciption start');
			try{
				await this.pc2.setRemoteDescription(desc);
				this.onSetRemoteSuccess(this.pc2);
			}catch(e){
				this.onSetSessionDescriptionError();
			}

			console.info('pc2 createAnswer start');
			try{
				const answer = await this.pc2.createAnswer();
				await this.onCreateAnswerSuccess(answer);
			}catch(e){
				this.onCreateSessionDescriptionError();
			}
		},
		onSetLocalSuccess(pc) {
			console.info(`${this.getName(pc)} setLocalDescription complete`)
		},
		onSetRemoteSuccess(pc) {
			console.info(`${this.getName(pc)} setRemoteDescription complete`)
		},
		onSetSessionDescriptionError(error) {
			console.info(`Fail to set session description: ${error.toString()}`)
		},
		async onCreateAnswerSuccess(desc) {
			console.info(`Answer from pc2:\n ${desc.sdp}`);
			console.info('pc2 setLocalDescription start');
			try{
				await this.pc2.setLocalDescription(desc);
				this.onSetLocalSuccess(pc2);
			}catch(e){
				this.onSetSessionDescriptionError(e);
			}

			console.info('pc1 setRemoteDescription start');
			try{
				await this.pc1.setRemoteDescription(desc);
				this.onSetRemoteSuccess(this.pc1);
			}catch(e){
				this.onSetSessionDescriptionError(e);
			}
		},
		onCreateSessionDescriptionError(error) {
			console.info(`Failed to create session description: ${error.toString()}`);
		},
		hangUp() {
			console.log('Ending call');
			this.pc1.close();
			this.pc2.close();
			this.pc1 = null;
			this.pc2 = null;
			document.getElementById('btn_hangUp').disabled = true;
			document.getElementById('btn_connect').disabled = false;
		},
		gotRemoteStream(e) {
			if(document.getElementById('remoteVideo').srcObject != e.streams[0]) {
				document.getElementById('remoteVideo').srcObject = e.streams[0];
				console.info('pc2 received remote stream');
			}
		},
		onIceStateChange(pc, event) {
			if(pc) {
				console.log(`${this.getName(pc)} ICE state : ${pc.iceConnectionState}`);
				console.log('ICE state change event : ', event);
			}
		},
		async onIceCandidate(pc, event) {
			try {
				await (this.getOtherPc(pc).addIceCandidate(event.candidate));
				this.onAddIceCandidateSuccess(pc);
			} catch (e) {
				this.onAddIceCandidateError(pc, e);
			}
			console.log(`${this.getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
		},
		onAddIceCandidateSuccess(pc){
			console.info(`${this.getName(pc)} addIceCandidate success`)
		},
		onAddIceCandidateError(pc,error){
			console.info(`${this.getName(pc)} failed to add ICE candidate: ${error.toString()}`)
		},
		getName(pc) {
			return (pc === this.pc1) ? 'pc1' : 'pc2';
		},
		getOtherPc(pc) {
			return (pc === this.pc1) ? this.pc2 : this.pc1;
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
  margin: 0 0 1.2em 0;
  vertical-align: top;
}
video#localVideo {
  margin: 0 1.2em 1.2em 0;
}
.cont {
	margin-bottom: 3em;
}
button {
	border: none;
	background: rgba(255,255,255,.2);
	padding: 1em 1.5em;
	font-size: 0.85rem;
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
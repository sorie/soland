<template>
<div class="cPopCon">
    <div class="con">
            <h3 v-if="confinfo.career">{{LOCALE.title.beforeyoustart}}</h3>
            <h3 v-else>화상면접방 입장 설정</h3>
        <dl>
            <dt class="popVideo">
                <video v-if="isSafari" id="my_Video" width="100%" height="100%" autoplay playsinline muted></video>
                <video v-else id="my_Video" width="100%" height="100%" autoplay muted></video>
                <div class="cameraBg"></div>
                <div class="soundBg"></div>
            </dt>
        </dl>
        <dl>
            <dt v-if="confinfo.career">{{LOCALE.title.yourname}}</dt>
            <dt v-else-if="host">면접관님의 이름을 넣어주세요.</dt>
            <dt v-else>구직자님의 이름을 넣어주세요.</dt>
            <dd><input type="text" id="inputdisplayname" :value="displayname" placeholder="Enter your full name"></dd>
        </dl>
        <div v-if="checkdevice && videodevicelist===alse" class="Noti">No camera has been detected.</div>
        <dl id="cameraselect">
            <dt>{{LOCALE.title.camera}}</dt>
            <dd style="overflow: unset;">
                <div class="left custom-select" v-click="dropdown('video')" style="overflow: unset;">
                    <div id="selectvideo" class="select-selected">{{selectvideodevice}}</div>
                    <div id="videolist" class="select-items select-hide">
                        <div v-for="(videodevice,idx) in videodevicelist" :key="idx" v-click="changedevice('video',videodevice.label,videodevice.deviceId)">{{videodevice.label}}</div>
                    </div>
                </div>
                <div class="right">
                    <strong>{{LOCALE.title.cameraon}}</strong>
                    <div class="bar on" id="pCam" v-click="mediaonoff('cam')">
                        <button>{{LOCALE.title.cameraon}}</button>
                    </div>
                </div>
            </dd>
        </dl>
        <dl>
            <dt>{{LOCALE.title.microphone}}</dt>
            <dd style="overflow: unset;">
                <div class="left custom-select" v-click="dropdown('mic')" style="overflow: unset;">
                    <div id="selectmic" class="select-selected">{{selectmicdevice}}</div>
                    <div id="miclist" class="select-items select-hide">
                        <div v-for="(micdevice,idx) in micdevicelist" :key="idx" v-click="changedevice('mic', micdevice.label, micdevice.deviceId)">{{micdevice.label}}</div>
                    </div>
                </div>

                <div class="right">
                    <strong>{{LOCALE.title.micon}}</strong>
                    <div class="bar on" id="pAudio"  v-click="mediaonoff('audio')">
                        <button>{{LOCALE.title.micon}}</button>
                    </div>
                </div>
            </dd>
        </dl>
        <div class="voiceCheck">
            <canvas id="meter" width="220" height="4"></canvas>
        </div>
        <div v-if="confinfo.career === false" class="btn_block"><button id="btn_start" v-click="startmeeting()">{{LOCALE.title.entermeeting}}</button></div>
        <div v-else class="btn_block"><button id="btn_start" v-click="startmeeting()">화상면접방에 입장하기</button></div>
    </div>
</div>
</template>
<script>

export default {
    name: "lobbyRoom", 
    data() {
        return{
            // LOCALE : LOCALE,
            videodevicelist: null,
            micdevicelist: null,
            videoquality: null,
            mediamute: null,
            displayname: '',
            selectvideodevice: null,
            selectmicdevice: null,
            checkdevice: false,
            lobbytimer: null
        }
    },
    computed: {
        isSafari() {
            if(adapter.browserDetails.browser==='safari'){
                return true;
            }
            return false;
        },
    },
    init() {
        this._super(...arguments);
        this.videodevicelist = [];
        this.micdevicelist = [];
        this.mediamute = {video: false, audio: false};
    },
    mounted() {
        this._super(...arguments);
        console.log('sori test myinfo :' + JSON.stringify(this.get('myinfo')));
        if(!this.get('myinfo.userid')){
            window.location.replace(config.APP.domain + "/room-not-exist?message=authinfoisnone");
        }
        else {
            this.set('displayname', this.get('myinfo.displayname'));
    
            ucEngine.Video.checkDevice({getDevice: this.getDeviceList.bind(this), getDeviceFail: this.getDeviceFail.bind(this)});
    
            let timer = setTimeout(function(){
                this.send('startmeeting');
            }.bind(this), 1000 * 90)
            this.set('lobbytimer', timer);
        }

    },
    destroyed() {
        this._super(...arguments);
        let video = document.querySelector("#my_Video");
        if(video!==undefined&&video!==null){
            if(!video.paused){
                video.pause();
                video.src = '';
                video.load();
            }
        }
        ucEngine.Video.removeViewer({ viewerid: GLOBAL.getMyID(), userid: 'self'});

        if(this.get('lobbytimer')){
            clearTimeout(this.get('lobbytimer'));
        }
    },
    methods: {
        getDeviceList(devices){
            let selectvideodevice = null;
            let selectmicdevice = null;
            if(devices.length > 0){
                devices.forEach(function(device){
                    if(device.kind==="audioinput"){
                        if(device.deviceId!=='communications' && device.deviceId!=='default'){
                            this.micdevicelist.pushObject(device);
                        }
                    }
                    else if(device.kind==="videoinput"){
                        if(this.get('myinfo.devicestatus')==='all' || this.get('myinfo.devicestatus')==='videoonly'){
                            this.videodevicelist.pushObject(device);
                        }
                    }
                }.bind(this));

                if(this.videodevicelist.length>0){
                    this.set('selectvideodevice', this.videodevicelist[0].label);
                    selectvideodevice =  {label: this.videodevicelist[0].label, deviceId:this.videodevicelist[0].deviceId};
                    /* himart : 서비스타입이 himart 이면서 게스트인 경우 카메라 오프 디폴트 */
                    if(this.get('confinfo.service_type') === 'himart'){
                        if(!this.get('host')) {
                            this.send('mediaonoff', 'cam', true);
                        }
                    }
                }
                else{
                    $("#cameraselect").addClass('disable');
                    this.set('selectvideodevice', 'No Camera detected.');
                    this.send('mediaonoff', 'cam', true);
                }

                if(this.micdevicelist.length>0){
                    this.set('selectmicdevice', this.micdevicelist[0].label);
                    selectmicdevice =  {label:this.micdevicelist[0].label, deviceId:this.micdevicelist[0].deviceId};
                }
                else{
                    this.set('selectmicdevice', 'No Mic detected.');
                    this.send('mediaonoff', 'mic', true);
                }
                this.set('checkdevice', true);
                sessionStorage.setItem('selectdevice', GLOBAL.transObjToStr({video: selectvideodevice, audio: selectmicdevice}));
                ucEngine.Video.getViewer({type: 'self', viewerid: GLOBAL.getMyID(), devicetype: config.APP.devicetype, onSuccess: this.onSuccessGetViewer.bind(this), onFail: this.onFailGetViewer.bind(this)});
            }
        },

        onSuccessGetViewer(event){
            let video = document.querySelector("#my_Video");
            if(video!==undefined&&video!==null){
                if(!video.paused){
                    video.pause();
                    video.src = '';
                    video.load();
                }
                video.srcObject = event.streams[0];
                video.muted = true;

                $("#btn_start").attr('disabled', false);

                let WIDTH=220;
                let HEIGHT=50;
                let rafID  = null;

                let canvasContext = document.getElementById( "meter" ).getContext("2d");
                // monkeypatch Web Audio
                window.AudioContext = window.AudioContext || window.webkitAudioContext;

                // grab an audio context
                let audioContext = new AudioContext();
                let createAudioMeter = function(audioContext,clipLevel,averaging,clipLag){
                    let processor = audioContext.createScriptProcessor(512);
                    processor.onaudioprocess = function(event){
                        let buf = event.inputBuffer.getChannelData(0);
                        let bufLength = buf.length;
                        let sum = 0;
                        let x;

                        // Do a root-mean-square on the samples: sum up the squares...
                        for (let i=0; i<bufLength; i++) {
                            x = buf[i];
                            if (Math.abs(x)>=this.clipLevel) {
                                this.clipping = true;
                                this.lastClip = window.performance.now();
                            }
                            sum += x * x;
                        }

                        // ... then take the square root of the sum.
                        let rms =  Math.sqrt(sum / bufLength);

                        // Now smooth this out with the averaging factor applied
                        // to the previous sample - take the max here because we
                        // want "fast attack, slow release."
                        this.volume = Math.max(rms, this.volume*this.averaging);
                    };

                    processor.clipping = false;
                    processor.lastClip = 0;
                    processor.volume = 0;
                    processor.clipLevel = clipLevel || 0.98;
                    processor.averaging = averaging || 0.95;
                    processor.clipLag = clipLag || 750;

                    // this will have no effect, since we don't copy the input to the output,
                    // but works around a current Chrome bug.
                    processor.connect(audioContext.destination);

                    processor.checkClipping = function(){
                        if (!this.clipping) {
                            return false;
                        }
                        if ((this.lastClip + this.clipLag) < window.performance.now()){
                            this.clipping = false;
                        }
                        return this.clipping;
                    };

                    processor.shutdown = function(){
                        this.disconnect();
                        this.onaudioprocess = null;
                    };

                    return processor;
                };

                let mediaStreamSource = audioContext.createMediaStreamSource(event.streams[0]);

                // Create a new volume meter and connect it.
                let meter = createAudioMeter(audioContext);
                mediaStreamSource.connect(meter);

                // kick off the visual updating
                let drawLoop = function drawLoop( time ) {
                    // clear the background
                    canvasContext.clearRect(0,0,WIDTH,HEIGHT);
                    canvasContext.fillStyle = "rgba(22,4,83,1)"
                    // draw a bar based on the current volume
                    canvasContext.fillRect(0, 0, meter.volume*WIDTH*2, HEIGHT);
                    // set up the next visual callback
                    rafID = window.requestAnimationFrame( drawLoop );
                };
                drawLoop();
            }
        },

        onFailGetViewer(error){
            GLOBAL.error("Get Self Viewer Fail = " + error.message);
            ucEngine.webSocketSend( [ 'ping.sys.conn', [ 'openvc', GLOBAL.getEncData( 'device.uuid' ) ] ], '##### CLIENT CONSOLE MSG : [ ConfID = ' + GLOBAL_MODULE.getConfID() + ', id = ' + GLOBAL.getMyID()  + ", Get Self Viewer Fail = " + JSON.stringify(error) + '] #####' );
            if(error.command){
                // signal error
                switch(error.code){
                    case 404:{
                        ucEngine.logout(function () {
                            sessionStorage.clear();
                            let cust_name = this.get('store').peekAll('conferenceroom').toArray()[0].get('custom_url');
                            if (cust_name) {
                                window.location.replace(config.APP.domain + "/" + cust_name);
                            }
                            else {
                                window.location.replace(config.APP.domain + "/room_no_exist");
                            }
                        }.bind(this));
                    }
                    break;
                    case 410:{
                        window.location.replace(config.APP.domain + "/410page");
                    }
                    break;
                    default:{
                        window.location.replace(config.APP.domain + "/410page");
                    }
                }
            }
            else{
                GLOBAL.error("Get Self Viewer Fail = " + error.message);
                ucEngine.webSocketSend( [ 'ping.sys.conn', [ 'openvc', GLOBAL.getEncData( 'device.uuid' ) ] ], '##### CLIENT CONSOLE MSG : [ ConfID = ' + GLOBAL_MODULE.getConfID() + ', id = ' + GLOBAL.getMyID()  + ", Get Self Viewer Fail = " + error.message + '] #####' );
            }
        },

        getDeviceFail(error){
            GLOBAL.error("Get Device Info Fail in lobby name =  " + error.name + " message = " + error.message);
            ucEngine.webSocketSend( [ 'ping.sys.conn', [ 'openvc', GLOBAL.getEncData( 'device.uuid' ) ] ], '##### CLIENT CONSOLE MSG : [ ConfID = ' + GLOBAL_MODULE.getConfID() + ', id = ' + GLOBAL.getMyID()  + ", Get Device Info Fail in lobby name =  " + error.name + ", message = " + error.message + '] #####' );
        },
    }
}
</script>
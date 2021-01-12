<template>
  <div class="cPop">
    <div class="cPopCon">
        <div class="con">
                <h3>{{LOCALE.title.beforeyoustart}}</h3>
            <dl>
                <dt class="popVideo">
                    <video v-if="isSafari" id="my_Video" width="100%" height="100%" autoplay playsinline muted></video>
                    <video v-else id="my_Video" width="100%" height="100%" autoplay muted></video>
                    <div class="cameraBg"></div>
                    <div class="soundBg"></div>
                </dt>
            </dl>
            <dl>
                <dt>{{LOCALE.title.yourname}}</dt>
                <dd><input type="text" id="inputdisplayname" :value="displayname" placeholder="Enter your full name"></dd>
            </dl>
            <div v-if="checkdevice && videodevicelist.length <= 0" class="Noti">No camera has been detected.</div>
            <dl id="cameraselect">
                <dt>{{LOCALE.title.camera}}</dt>
                <dd style="overflow: unset;">
                    <div class="left custom-select" v-on:click="dropdown('video')" style="overflow: unset;">
                        <div id="selectvideo" class="select-selected">{{selectvideodevice}}</div>
                        <div id="videolist" class="select-items select-hide">
                            <div v-for="(videodevice,idx) in videodevicelist" :key="idx" v-on:click="changedevice('video',videodevice.label,videodevice.deviceId)">{{videodevice.label}}</div>
                        </div>
                    </div>
                    <div class="right">
                        <strong>{{LOCALE.title.cameraon}}</strong>
                        <div class="bar on" id="pCam" v-on:click="mediaonoff('cam')">
                            <button>{{LOCALE.title.cameraon}}</button>
                        </div>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>{{LOCALE.title.microphone}}</dt>
                <dd style="overflow: unset;">
                    <div class="left custom-select" v-on:click="dropdown('mic')" style="overflow: unset;">
                        <div id="selectmic" class="select-selected">{{selectmicdevice}}</div>
                        <div id="miclist" class="select-items select-hide">
                            <div v-for="(micdevice,idx) in micdevicelist" :key="idx" v-on:click="changedevice('mic', micdevice.label, micdevice.deviceId)">{{micdevice.label}}</div>
                        </div>
                    </div>

                    <div class="right">
                        <strong>{{LOCALE.title.micon}}</strong>
                        <div class="bar on" id="pAudio"  v-on:click="mediaonoff('audio')">
                            <button>{{LOCALE.title.micon}}</button>
                        </div>
                    </div>
                </dd>
            </dl>
            <div class="voiceCheck">
                <canvas id="meter" width="220" height="4"></canvas>
            </div>
            <div class="btn_block"><button id="btn_start">{{LOCALE.title.entermeeting}}</button></div>
        </div>
    </div>
  </div>
</template>
<script>
import adapter from 'webrtc-adapter';
import $ from 'jquery';

export default {
    name: "LobbyRoom", 
    data() {
        return{
            LOCALE : LOCALE,
            adapter : adapter,
            videodevicelist: [],
            micdevicelist: [],
            videoquality: null,
            mediamute: {video: false, audio: false},
            displayname: '',
            selectvideodevice: null,
            selectmicdevice: null,
            checkdevice: false,
            lobbytimer: null,
            myinfo: {
              userid : 'enne3939@gmail.com',
              displayname : 'sori',
              devicestatus : 'all',
              mstate : 'all'
            },
            confinfo : {
              service_type : 'servicetype',
              customurl : 'customurl'
            },
            ignorestreamchange: false,
            videoloaded: false,
            config : {
              APP : {
                devicetype : 'pc'
              }
            }
        }
    },
    computed: {
        isSafari() {
            if(this.adapter.browserDetails.browser==='safari'){
                return true;
            }
            return false;
        },
    },
    mounted() {
      if(!this.myinfo.userid){
        window.location.replace(this.config.APP.domain + "/room-not-exist?message=authinfoisnone");
      }
      else {
        ucEngine.Video.checkDevice({getDevice: this.getDeviceList.bind(this), getDeviceFail: this.getDeviceFail.bind(this)});

        setTimeout(() => {          
          this.displayname = this.myinfo.displayname;
          ucEngine.Video.getLocalMedia({
                devicetype: this.config.APP.devicetype, devicestatus: 'all', videodeviceid: this.selectvideodeviceid, audiodeviceid: this.selectmicdeviceid} ,this.getLocalStream.bind(this), this.getLocalStreamFail.bind(this));

          // let timer = setTimeout(function(){
          //   this.startmeeting();
          // }.bind(this), 1000 * 90)
          // this.lobbytimer = timer;
        }, 1500);
      }

    },
    destroyed() {
      // this._super(...arguments);
      let video = document.querySelector("#my_Video");
      if(video!==undefined&&video!==null){
          if(!video.paused){
              video.pause();
              video.src = '';
              video.load();
          }
      }
      // ucEngine.Video.removeViewer({ viewerid: this.myinfo.userid, userid: 'self'});

      if(this.lobbytimer){
          clearTimeout(this.lobbytimer);
      }
    },
    methods: {
      changedevice(type, devicelabel, deviceid){
          $("#btn_start").attr('disabled', true);
          let changedevice = false;
          let selectdevice = GLOBAL.transStrToObj(sessionStorage.getItem('selectdevice'));
          if(type==='video'){
              if(devicelabel!==selectdevice.video.label){
                  changedevice = true;
              }
              this.selectvideodevice = devicelabel;
              selectdevice.video = {label: devicelabel, deviceId: deviceid};
          }
          else if(type==='mic'){
              if(devicelabel!==selectdevice.audio.label){
                  changedevice = true;
              }
              this.selectmicdevice = devicelabel;
              selectdevice.audio = {label: devicelabel, deviceId: deviceid};
          }

          if(changedevice){
              // Main을 Session을 다시 진행 해야 함.
              let devicestatus = this.myinfo.devicestatus;
              sessionStorage.setItem('selectdevice', GLOBAL.transObjToStr(selectdevice));
              if(devicestatus==='all'){
                  ucEngine.Video.changeDevice({type: 'main', mode: 'changedevice',  devicetype: this.config.APP.devicetype, devicestatus: devicestatus, videodeviceid: selectdevice.video.deviceId, audiodeviceid: selectdevice.audio.deviceId, changeDevice: function(param){
                      $("#btn_start").attr('disabled', false);
                  }.bind(this)});
              }
              else if(devicestatus==='audioonly'){
                  ucEngine.Video.changeDevice({type: 'main', mode: 'changedevice',  devicetype: this.config.APP.devicetype, devicestatus: devicestatus, audiodeviceid: selectdevice.audio.deviceId, changeDevice: function(param){
                      $("#btn_start").attr('disabled', false);
                  }.bind(this)});
              }
          }
      },

      getLocalStream(stream){
          let video = document.querySelector("#my_Video");
          if(video!==undefined&&video!==null){
              if(!video.paused){
                  video.pause();
                  video.src = '';
                  video.load();
              }
              video.srcObject = stream;
              video.muted = true;
          }

          if(this.myinfo.devicestatus==='all'){
              if(this.myinfo.mstate==='audioonly' || this.myinfo.mstate==='none'){
                  stream.getVideoTracks()[0].enabled = false;
              }

              if(this.myinfo.mstate==='videoonly' || this.myinfo.mstate==='none'){
                  stream.getAudioTracks()[0].enabled = false;
              }
          }
          else if(this.myinfo.devicestatus==='audioonly'){
              if(this.myinfo.mstate==='none'){
                  stream.getAudioTracks()[0].enabled = true;
              }
          }
          else if(this.myinfo.devicestatus==='videoonly'){
              if(this.myinfo.mstate==='none'){
                  stream.getVideoTracks()[0].enabled = true;
              }
          }

          this.videoloaded = true;
          $("#btn_save").attr('disabled', false);
      },

      getLocalStreamFail(error){
          GLOBAL.error("Get Local Stream Fail = " + error.message);
      },

      onStreamStatusChange(event){
        if(!this.ignorestreamchange){
            let streamtype = event.target.kind;
            let streamstatus = null;
            let devicestatus = this.myinfo.devicestatus;

            if(event.target.readyState==='ended'){
                streamstatus = 'ended';
            }
            else{
                if(event.target.muted){
                    streamstatus = 'muted';
                }
                else{
                    streamstatus = 'unmuted';
                }
            }

            this.changeMediaStatus(streamtype, (streamstatus==='muted'||streamstatus==='ended')?true:false);
        }
    },

      startmeeting(){
        console.log('start');
      },
      getDeviceList(devices){
          let selectvideodevice = null;
          let selectmicdevice = null;
          if(devices.length > 0){
              devices.forEach(function(device){
                  if(device.kind==="audioinput"){
                      if(device.deviceId!=='communications' && device.deviceId!=='default'){
                          this.micdevicelist.push(device);
                      }
                  }
                  else if(device.kind==="videoinput"){
                      if(this.myinfo.devicestatus==='all' || this.myinfo.devicestatus==='videoonly'){
                          this.videodevicelist.push(device);
                      }
                  }
              }.bind(this));

              if(this.videodevicelist.length>0){
                  this.selectvideodevice = this.videodevicelist[0].label;
                  selectvideodevice =  {label: this.videodevicelist[0].label, deviceId:this.videodevicelist[0].deviceId};
              }
              else{
                  $("#cameraselect").addClass('disable');
                  this.selectvideodevice = 'No Camera detected.';
                  this.mediaonoff('cam', true);
              }

              if(this.micdevicelist.length>0){
                  this.selectmicdevice = this.micdevicelist[0].label;
                  selectmicdevice =  {label:this.micdevicelist[0].label, deviceId:this.micdevicelist[0].deviceId};
              }
              else{
                  this.selectmicdevice = 'No Mic detected.';
                  this.mediaonoff('mic', true);
              }
              this.checkdevice = true;
              sessionStorage.setItem('selectdevice', GLOBAL.transObjToStr({video: selectvideodevice, audio: selectmicdevice}));
              ucEngine.Video.getViewer({type: 'self', viewerid: this.myinfo.userid, devicetype: this.adapter.browserDetails.browser, onSuccess: this.onSuccessGetViewer.bind(this), onFail: this.onFailGetViewer.bind(this)});
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
      },

      getDeviceFail(error){
          GLOBAL.error("Get Device Info Fail in lobby name =  " + error.name + " message = " + error.message);
          // ucEngine.webSocketSend( [ 'ping.sys.conn', [ 'openvc', GLOBAL.getEncData( 'device.uuid' ) ] ], '##### CLIENT CONSOLE MSG : [ ConfID = ' + GLOBAL_MODULE.getConfID() + ', id = ' + GLOBAL.getMyID()  + ", Get Device Info Fail in lobby name =  " + error.name + ", message = " + error.message + '] #####' );
      },
      dropdown(type){
          if(this.lobbytimer){
              clearTimeout(this.lobbytimer);
          }

          if(type==="video"){
              if(this.videodevicelist.length===0){
                  return false;
              }
              if(!$("#selectvideo").hasClass("select-arrow-active")){
                  $("#selectvideo").addClass("select-arrow-active");
              }
              else{
                  $("#selectvideo").removeClass("select-arrow-active");
              }

              if($("#videolist").hasClass("select-hide")){
                  $("#videolist").removeClass('select-hide');
              }
              else{
                  $("#videolist").addClass('select-hide');
              }
          }
          else{
              if(this.micdevicelist.length===0){
                  return false;
              }
              if(!$("#selectmic").hasClass("select-arrow-active")){
                  $("#selectmic").addClass("select-arrow-active");
              }
              else{
                  $("#selectmic").removeClass("select-arrow-active");
              }

              if($("#miclist").hasClass("select-hide")){
                  $("#miclist").removeClass('select-hide');
              }
              else{
                  $("#miclist").addClass('select-hide');
              }
          }
      },
      mediaonoff(type){
          if(this.lobbytimer){
              clearTimeout(this.lobbytimer);
          }

          if(type==="cam"){
              if($(".cameraBg").hasClass("on") && this.videodevicelist.length===0){
                  return false;
              }
              $(".cameraBg").toggleClass("on");
              let camradiovtndom = $("#pCam");
              camradiovtndom.toggleClass("on");
              if(camradiovtndom.hasClass("on")){
                camradiovtndom.children("button").text(LOCALE.title.cameraoff).removeClass("current");
                // camradiovtndom.children("button").text("Off").removeClass("current");
                camradiovtndom.prev("strong").text(LOCALE.title.cameraon);
                // camradiovtndom.prev("strong").text("On");
                // unmute
                this.mediamute.video = false;
                $("#videolist").removeAttr('disabled');
                $('.popVideo .cameraBg').hide();
              }
              else{
                camradiovtndom.children("button").text(LOCALE.title.cameraoff).addClass("current");
                // camradiovtndom.children("button").text("Off").addClass("current");
                camradiovtndom.prev("strong").text(LOCALE.title.cameraoff);
                // camradiovtndom.prev("strong").text("Off");
                // mute
                setTimeout(() => {
                  this.mediamute.video = true;
                  $("#videolist").attr('disabled', 'disabled');
                  $('.popVideo .cameraBg').show();
                }, 1000);
              }
          }
          else{
              if(this.micdevicelist.length===0){
                  return false;
              }
              $(".soundBg").toggleClass("on");
              let camradiovtndom = $("#pAudio");
              camradiovtndom.toggleClass("on");
              if(camradiovtndom.hasClass("on")){
                  camradiovtndom.children("button").text(LOCALE.title.cameraoff).removeClass("current");
                  // camradiovtndom.children("button").text("Off").removeClass("current");
            camradiovtndom.prev("strong").text(LOCALE.title.cameraon);
            // camradiovtndom.prev("strong").text("On");
                  // unmute
                  this.mediamute.audio = false;
                  $("#miclist").removeAttr('disabled');
              }
              else{
                camradiovtndom.children("button").text(LOCALE.title.cameraoff).addClass("current");
                // camradiovtndom.children("button").text("Off").addClass("current");
                camradiovtndom.prev("strong").text(LOCALE.title.cameraoff);
                // camradiovtndom.prev("strong").text("Off");
                // mute
                this.mediamute.audio = true;
                $("#miclist").attr('disabled', 'disabled');
              }
          }
      },

    }
}
</script>
<style lang="scss" scoped>
/*common */
* {
    padding: 0;
    margin: 0;
    border: none;
    font-style: inherit;
    vertical-align: baseline;
    font-family: "Asap", sans-serif;
    font-weight: inherit;
    list-style: none;
    outline: none;
}
h3 {
    font-size: 1.78rem;
    font-weight: 600;
}
.Noti { background: #ffc03a; line-height: 20px; font-size: 16px; line-height: 22px; color: #333; padding: 0 10px; border-radius: 3px; text-align: left; margin-top: 15px;}
.cameraBg { position: absolute; width: 100%; height: 100%; background: #111 url("../../assets/img/video/camera_off_white_big.svg") no-repeat center center; left: 0; top: 0; display: none;}
.soundBg { background: url("../../assets/img/video/sound_off.svg") no-repeat center center rgba(2, 2, 2, 0.5); position: absolute; right: 0; bottom: 0; width: 43px; height: 30px; display: none; border-radius: 5px 0 5px 0;}
.soundBg.on { display: block !important;}
.cameraBg.off { display: block; border-radius: 5px;}
/* cPop */
.cPop { position: relative; width: 100%; height: 100%; text-align: center; display: table; color:black;  }
.cPop h3 { font-weight: 600; margin-bottom: 10px;}
.cPop .con { position: relative; width: 385px; display: inline-block; background: #fff; border-radius: 10px; padding: 15px; text-align: left;}
.cPop dl { position: relative; clear: both;}
.cPop dl dt.popVideo { position: relative; clear: both; border-radius: 10px; width: 385px; height: 220px; background: #000; padding-top: 0;overflow: hidden;}
.cPop dl dt.popVideo video { border-radius: 10px; object-fit: cover;}
.cPop h3 span { display: block; font-size: 16px; color: #888; line-height: 22px;}
.cPop dl dt { font-size: 1rem; font-weight: 600; line-height: 18px; color: #333; padding-top: 10px; text-align: left;}
.cPop dl dd { position: relative; overflow: hidden; text-align: left; padding-top: 0.5em;}
.cPop dl dd.radio { overflow: visible;}
.cPop dl dd .left { display: inline-block; width: 240px; float: left; overflow: hidden;}
.cPop dl dd .right { display: inline-block; float: right;}
.cPop dl dd .right strong { display: inline-block; font-size: 16px; font-weight: 600; margin-right: 10px; vertical-align: super;}
.cPop dl dd.hName {    position: absolute; overflow: visible; text-align: left; padding-top: 9px; bottom: 0; border-radius: 0 0 0 5px;}
.cPop .btn_block { clear: both; margin-top: 20px; padding-bottom: 0;}
.cPop .btn_block button { width: 100%; box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.12);}
.cPop .voiceCheck { display: block; padding: 10px 0 0 20px; text-align: left; background: url("../../assets/img/video/icon_audio.svg") no-repeat left bottom; clear: both;}
.cPop .voiceCheck canvas { background: #c0c0c0; border-radius: 10px;}
.cPopCon { display: table-cell; vertical-align: middle;}
.cPopIn { position: relative; background: #fff; display: inline-block; padding: 20px; text-align: left; border-radius: 10px; max-height: 450px; overflow-y: auto;}
.cPopIn h5 { font-size: 18px; color: #333; line-height: 26px; margin-bottom: 10px;}
.cPopIn a { font-size: 18px; color: #3867d4; line-height: 26px; margin-bottom: 10px; display: block;}
.cPopIn .close { position: absolute; top: 10px; right: 10px;}
#LeavePop h3 { font-size: 24px; line-height: 30px; font-weight: 600; max-width: 80%;}
#LeavePop .txt:after , #white-board .txt:after{display:none;}
.disable { opacity: 0.2;}
.cPop.ys { top: 0; height: 100%; padding-top: 20px;}
.cPop.ys .cPopCon { vertical-align: top;}
.cPop.ys .cPopCon .con { overflow-y: auto;}

.cPop dl dd input[type=text] {
    font-size: 16px;
    width: 100%;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
    line-height: 20px;
    padding: 10px;
    box-sizing: border-box;
}
/* custom select*/
.custom-select {position: relative; overflow: unset;}
.select-selected { cursor: pointer; width: 240px; font-size: 16px; border-radius: 5px; line-height: 20px; padding: 10px 25px 10px 10px; border: 1px solid #888; box-sizing: border-box; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;}
.select-selected:after { content: ''; border-width: 6px; border-color: #888 transparent transparent transparent; border-style: solid; display: inline-block; position: absolute; top: 18px; right: 10px;}
.select-selected.select-arrow-active:after { border-color: transparent transparent #888 transparent; top: 12px;}
.select-items { position: absolute; left: 0; top: 40px; width: 240px; box-sizing: border-box; padding: 10px 5px 10px 20px; background: #fff; border: 1px solid #888; background: #f8f8f8; border-radius: 0 0 5px 5px; z-index: 99;}
.select-items > div { position: relative; font-size: 16px; line-height: 18px; cursor: pointer; padding-bottom: 5px; color: #888;}
.select-items > div:hover { color: #333;}
.select-items > div:last-child { padding-bottom: 0;}
.select-items > div.same-as-selected { color: #333;}
.same-as-selected:before { content: '\2713'; color: #333; position: absolute; left: -15px; top: 0;}
.select-hide { display: none;}
// volume bar custom
#volume-bar{margin-right:20px;cursor:pointer}
input[type=range] {-webkit-appearance: none;width: 90px;border-radius:10px;background:rgba(255,255,255,0.7);float:right;margin-top:8px;}
input[type=range]:focus {outline: none;}
input[type=range]::-webkit-slider-runnable-track {width: 100%;height: 6px;cursor: pointer;animate: 0.2s;background:rgba(255,255,255,0.5);border-radius:10px}
input[type=range]::-webkit-slider-thumb {border-radius:100%;height: 16px;width: 16px;background: #ffffff;cursor: pointer;-webkit-appearance: none;margin-top:-5px}
input[type=range]:focus::-webkit-slider-runnable-track {background: #fff;}
input[type=range]::-moz-range-track {width: 100%;height: 6px;cursor: pointer;animate: 0.2s;background:rgba(255,255,255,0.5);border-radius:10px}
input[type=range]::-moz-range-thumb {border-radius:100%;height: 16px;width: 16px;background: #ffffff;cursor: pointer;-webkit-appearance: none;margin-top:-5px;}

/* button */
.btn_block { clear: both; padding: 20px 0; text-align: right;}
.careernoti .btn_block { clear: both; padding-top: 10px; padding-bottom: 0; text-align: right;}
.btn_block.center { text-align: center;}
.btn_block button { display: inline-block; height: 50px; line-height: 50px; text-align: center; font-size: 16px; color: #fff; border-radius: 5px; background: #3867d4;margin-bottom:0.5em;padding: 0 0.5em 0 0.5em;}
.btn_block a { display: inline-block; height: 50px; line-height: 50px; text-align: center; font-size: 16px; color: #fff; border-radius: 5px; background: #3867d4;padding: 0 0.5em 0 0.5em;}
.btn_block span { display: inline-block; float: left; font-size: 16px; line-height: 20px; color: #888; padding-left: 10px; padding-top: 15px; cursor: pointer;}
.btn_block button.bg1 { background: #db4f5f; width: auto; padding: 0 15px;}
.btn_block button.bg2 {background:none;border:2px solid #fff;margin-right:10px;vertical-align:bottom;line-height:44px;}
.btn_block button.bg2:before {content:'';background:url('../../assets/img/video/icon-pencil-white.svg') no-repeat;width:20px;height:20px;display:inline-block;margin-right:5px;vertical-align:middle;}
button.btn { background: none; border: none; display: inline-block; height: 40px; line-height: 40px; font-size: 16px; color: #fff; background: #54b9b5; box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.12); padding: 0 40px; border-radius: 5px; cursor: pointer;}

/* on off bar*/
.bar { display: inline-block; background: #db4f5f; height: 25px; border-radius: 20px; width: 50px;margin-top: 8px;position: relative;}
.bar button { display: inline-block; width: 21px; height: 21px; border-radius: 100%; background: #fff; position: absolute; left: 2px; top: 2px; text-indent: -9999px; transition: left 0.3s;}
.bar.on { background: #54b9b5;}
.bar.on button { left: 27px;}

/* select */
.selecth { width: 220px; border: 1px solid #888; font-size: 16px; color: #555; padding: 0 10px; height: 40px; line-height: 40px; border-radius: 5px;}

/* radio custom */
.radio input[type="radio"] { opacity: 0; position: absolute; left: 5px; top: 5px;}
.radio input[type="radio"] + label { font-size: 16px; line-height: 22px; display: inline-block; padding-left: 30px; position: relative;}
.radio input[type="radio"] + label:before { display: inline-block; width: 20px; height: 20px; border: 1px solid #888; border-radius: 100%; position: absolute; left: 0; top: 0; content: '';}
.radio input[type="radio"]:checked + label:after { content: '';width: 10px; height: 10px; border-radius: 100%; position: absolute; background: #54b9b5; left: 6px; top: 6px;}
.radio label.last { margin-left: 30px;}
.radio img { vertical-align: sub; margin-left: 10px; cursor: pointer;}

</style>
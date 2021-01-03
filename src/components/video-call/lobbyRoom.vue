<div class="cPopCon">
    <div class="con">
        {{#if (not-eq confinfo.career true)}}
            <h3>{{LOCALE.title.beforeyoustart}}</h3>
        {{else}}
            <h3>화상면접방 입장 설정</h3>
        {{/if}}
        <dl>
            <dt class="popVideo">
                {{#if isSafari}}
                    <video id="my_Video" width="100%" height="100%" autoplay playsinline muted></video>
                {{else}}
                    <video id="my_Video" width="100%" height="100%" autoplay muted></video>
                {{/if}}

                <div class="cameraBg"></div>
                <div class="soundBg"></div>
            </dt>
        </dl>
        <dl>
            {{#if (not-eq confinfo.career true)}}
                <dt>{{LOCALE.title.yourname}}</dt>
            {{else}}
                {{#if host}}
                <dt>면접관님의 이름을 넣어주세요.</dt>
                {{else}}
                <dt>구직자님의 이름을 넣어주세요.</dt>
                {{/if}}
            {{/if}}
                <dd><input type="text" id="inputdisplayname" value={{displayname}} placeholder="Enter your full name"></dd>
        </dl>
        {{#if checkdevice}}
            {{#unless videodevicelist}}
                <div class="Noti">No camera has been detected.</div>
            {{/unless}}
        {{/if}}
        <dl id="cameraselect">
            <dt>{{LOCALE.title.camera}}</dt>
            <dd style="overflow: unset;">
                <div class="left custom-select" {{action "dropdown" "video" on="click"}} style="overflow: unset;">
                    <div id="selectvideo" class="select-selected">{{selectvideodevice}}</div>
                    <div id="videolist" class="select-items select-hide">
                        {{#each videodevicelist as |videodevice|}}
                            <div {{action "changedevice" "video"  videodevice.label videodevice.deviceId on="click"}}>{{videodevice.label}}</div>
                        {{/each}}
                    </div>
                </div>
                <div class="right">
                    <strong>{{LOCALE.title.cameraon}}</strong>
                    <div class="bar on" id="pCam" {{action "mediaonoff" "cam" on="click"}}>
                        <button>{{LOCALE.title.cameraon}}</button>
                        {{!-- <button>on</button> --}}
                    </div>
                </div>
            </dd>
        </dl>
        <dl>
            <dt>{{LOCALE.title.microphone}}</dt>
            {{!-- <dt>Microphone</dt> --}}
            <dd style="overflow: unset;">
                <div class="left custom-select" {{action "dropdown" "mic" on="click"}} style="overflow: unset;">
                    <div id="selectmic"class="select-selected">{{selectmicdevice}}</div>
                    <div id="miclist" class="select-items select-hide">
                        {{#each micdevicelist as |micdevice|}}
                            <div {{action "changedevice" "mic"  micdevice.label micdevice.deviceId on="click"}}>{{micdevice.label}}</div>
                        {{/each}}
                    </div>
                </div>

                <div class="right">
                    <strong>{{LOCALE.title.micon}}</strong>
                    {{!-- <strong>On</strong> --}}
                    <div class="bar on" id="pAudio"  {{action "mediaonoff" "audio" on="click"}}>
                        <button>{{LOCALE.title.micon}}</button>
                        {{!-- <button>on</button> --}}
                    </div>
                </div>
            </dd>
        </dl>
        <div class="voiceCheck">
            <canvas id="meter" width="220" height="4"></canvas>
        </div>
        {{#if (not-eq confinfo.career true)}}
            <div class="btn_block"><button id="btn_start" {{action "startmeeting" on="click"}}>{{LOCALE.title.entermeeting}}</button></div>
        {{else}}
            <div class="btn_block"><button id="btn_start" {{action "startmeeting" on="click"}}>화상면접방에 입장하기</button></div>
        {{/if}}
        {{!-- <div class="btn_block"><button id="btn_start" {{action "startmeeting" on="click"}}>Enter meeting</button></div> --}}
    </div>
</div>

export default Component.extend({
    store: service('store'),
    tagName: "div",
    classNames: ["cPop", "set"],
    LOCALE : LOCALE,

    videodevicelist: null,
    micdevicelist: null,
    videoquality: null,

    mediamute: null,

    displayname: '',

    selectvideodevice: null,
    selectmicdevice: null,

    checkdevice: false,

    lobbytimer: null,

    isSafari: computed(function() {
        if(adapter.browserDetails.browser==='safari'){
            return true;
        }
        return false;
    }),

    //user function
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

    init() {
        this._super(...arguments);
        this.videodevicelist = [];
        this.micdevicelist = [];
        this.mediamute = {video: false, audio: false};
    },

    didInsertElement() {
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

    willDestroyElement() {
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

    click(event){
        if(event.target.id!=='selectvideo'){
            if(!$("#videolist").hasClass('select-hide')){
                $("#videolist").addClass('select-hide')
            }
        }
        if(event.target.id!=='selectmic'){
            if(!$("#miclist").hasClass('select-hide')){
                $("#miclist").addClass('select-hide')
            }
        }

        if(this.get('lobbytimer')){
            clearTimeout(this.get('lobbytimer'));
        }

        event.preventDefault();
    },

    actions: {
        dropdown(type){
            if(this.get('lobbytimer')){
                clearTimeout(this.get('lobbytimer'));
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

        // changeDisplayName(){
        //     $("#labeldisplayname").hide();
        //     $("#inputdisplayname").show().focus().on('blur', function(){
        //         if($("#inputdisplayname").val().trim().length>0){
        //             var myNameInput = $("#inputdisplayname").val().trim();
        //             let regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        //
        //             GLOBAL.debug('match=' + $("#inputdisplayname").val().match(regex));
        //
        //             myNameInput = myNameInput.replace(regex,'');
        //             this.set('displayname', myNameInput);
        //
        //         }
        //         $("#inputdisplayname").hide();
        //         $("#labeldisplayname").show();
        //     }.bind(this));
        // },

        changedevice(type, devicelabel, deviceid){
            $("#btn_start").attr('disabled', true);
            let changedevice = false;
            let selectdevice = GLOBAL.transStrToObj(sessionStorage.getItem('selectdevice'));
            if(type==='video'){
                if(devicelabel!==selectdevice.video.label){
                    changedevice = true;
                }
                this.set('selectvideodevice', devicelabel);
                selectdevice.video = {label: devicelabel, deviceId: deviceid};
            }
            else if(type==='mic'){
                if(devicelabel!==selectdevice.audio.label){
                    changedevice = true;
                }
                this.set('selectmicdevice', devicelabel);
                selectdevice.audio = {label: devicelabel, deviceId: deviceid};
            }

            if(changedevice){
                // Main을 Session을 다시 진행 해야 함.
                let devicestatus = this.get('myinfo.devicestatus');
                sessionStorage.setItem('selectdevice', GLOBAL.transObjToStr(selectdevice));
                if(devicestatus==='all'){
                    ucEngine.Video.changeDevice({type: 'main', mode: 'changedevice',  devicetype: config.APP.devicetype, devicestatus: devicestatus, videodeviceid: selectdevice.video.deviceId, audiodeviceid: selectdevice.audio.deviceId, changeDevice: function(param){
                        $("#btn_start").attr('disabled', false);
                    }.bind(this)});
                }
                else if(devicestatus==='audioonly'){
                    ucEngine.Video.changeDevice({type: 'main', mode: 'changedevice',  devicetype: config.APP.devicetype, devicestatus: devicestatus, audiodeviceid: selectdevice.audio.deviceId, changeDevice: function(param){
                        $("#btn_start").attr('disabled', false);
                    }.bind(this)});
                }
            }
        },

        mediaonoff(type){
            if(this.get('lobbytimer')){
                clearTimeout(this.get('lobbytimer'));
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
                    ucEngine.Video.mediamute('video', false);
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
                    ucEngine.Video.mediamute('video', true);
                    this.mediamute.video = true;
                    $("#videolist").attr('disabled', 'disabled');
                    $('.popVideo .cameraBg').show();
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
                    ucEngine.Video.mediamute('audio', false);
                    this.mediamute.audio = false;
                    $("#miclist").removeAttr('disabled');
                }
                else{
                    camradiovtndom.children("button").text(LOCALE.title.cameraoff).addClass("current");
                    // camradiovtndom.children("button").text("Off").addClass("current");
        			camradiovtndom.prev("strong").text(LOCALE.title.cameraoff);
        			// camradiovtndom.prev("strong").text("Off");
                    // mute
                    ucEngine.Video.mediamute('audio', true);
                    this.mediamute.audio = true;
                    $("#miclist").attr('disabled', 'disabled');
                }
            }
        },

        startmeeting(){
            if(this.get('timermousemove')){
              clearInterval(this.get('timermousemove'));
            }

            $("#loader").addClass('hide');

            if(this.get('lobbytimer')){
                clearTimeout(this.get('lobbytimer'));
            }

            if($("#inputdisplayname").val().trim().length>0){
                GLOBAL_MODULE.validID($("#inputdisplayname").val(), function(myNameInput){
                    this.set('displayname', myNameInput);
                    GLOBAL.setMyName(myNameInput);
                }.bind(this));
            }

            sessionStorage.setItem('roundee_io:checkdevice', 'check');
            this.get('startmeeting')(this.get('mediamute'), this.get("displayname"));
        }
    }
});
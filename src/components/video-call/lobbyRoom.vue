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
    computed: {
        checkDeviceList(){
            if(checkdevice===true && videodevicelist===false){

            }
        }
    }
}
</script>
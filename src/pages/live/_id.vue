<template>
    <div class="tving-view" v-if="data">
        <div class="player-area-tmp" />
        <div class="player-area" ref="playerarea">
            <div class="player-box">
                <!--플레이어 : 시작-->
                <!-- <section class="vod-player-box">
                    <div id="video-container">
                        <video id="player" webkit-playsinline="true" playsinline preload="none">지원되지 않는 브라우저 입니다.</video>
                        <div id="ID_LOOP_ON" style="display: none"></div>
                    </div>
                </section> -->
                <!--플레이어 : 끝-->

                <template v-if="data.schedule">
                        <!-- <img :data-src="getThumbnail(item.schedule.channel.code)" class="swiper-lazy"> -->
                    <!-- <img :src="`//image.tving.com/crop.php?u=http://image.tving.com/upload/cms/caie/CAIE0400/${data.schedule.episode.code}.jpg&w=700`" alt=""> -->
                    <!-- <img :src="getThumbnail(data.schedule.channel.code)" alt=""> -->
                    <!-- <video id="player" webkit-playsinline="true" playsinline preload="none" :poster="getThumbnail(data.schedule.channel.code)" controls>지원되지 않는 브라우저 입니다.</video> -->
                    <Player
                        :info="data.schedule"
                        :cover="getThumbnail(data.schedule.channel.code)"
                     />
                </template>

            </div>
        </div>
        <br />
        <div class="inner container" ref="viewcon">
            <div>
                <img :src="`//image.tving.com/upload/cms/caic/CAIC1800/${$route.params.id}.png`" class="logo">
                <p class="t">{{data.schedule.program.name.ko}}</p>
                <p>{{data.schedule.program.story.ko}}</p>
            </div>

            <template v-if="data.schedule.episode">
                <p class="t">
                    {{data.schedule.episode.name.ko}}
                </p>
                <p>
                    {{data.schedule.episode.synopsis.ko}}
                </p>
            </template>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters, mapActions } from 'vuex'
import Player from '~/components/Player.vue'

export default {
    components: {
        Player
    },
    data () {
        return {
        data: ''
        }
    },
    computed: {
        ...mapGetters(['getPathLives'])
    },
    mounted() {
        const that = this

        // axios.get(`//api.tving.com/v1/media/live/${this.$route.params.id}?pageNo=1&pageSize=10&order=rating&free=all&adult=all&scope=all&screenCode=CSSD0200&networkCode=CSND0900&osCode=CSOD0900&teleCode=CSCD0900&apiKey=4263d7d76161f4a19a9efe9ca7903ec4&_=1532065577596`)
        axios.get(this.getPathLives())
        .then(function (res) {
            // handle successs

            res.data.body.result.forEach(el => {
                if (el.live_code == that.$route.params.id) {
                    that.data = el
                }
            });

            setTimeout(() => {
                // that.initPlayer()
                that.$refs.playerarea.classList.add('show')
                that.$refs.viewcon.classList.add('show')

            }, 10)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    },
    methods: {
        initPlayer () {
            window['videoPlayer'] = document.querySelector("#player")
            window['imageDomain'] = '//image.tving.com'
            window['zzang'] = '69QdWIaLnkZhCYae+lgQpA=='
            window['Player'].init(this.$route.params.id)
        },
        getThumbnail ($d) {
            return `//stillshot.tving.com/thumbnail/${$d}_0_640x360.jpg`
        },
    },
}
</script>

<style lang="scss">
.tving-view {
    margin: 0 -1rem;

    .player-area-tmp {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        background-color: #0f0f0f;
    }
    .player-area {
        position: fixed;
        z-index: 10;
        top: 0;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        background-color: #000;
        box-shadow: 0 0 2rem rgba(0,0,0,1);

        opacity: 0;
        transition: all .5s;
        transform: translate(0, 2rem);

        &.show {
            opacity: 1;
            transform: translate(0, 0);
        }

        .player-box {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
    }
    .inner {
        padding: 0 1rem;
        opacity: 0;
        transition: all .5s;
        transition-delay: .1s;
        transform: translate(0, 2rem);

        &.show {
            opacity: 1;
            transform: translate(0, 0);
        }

        .logo {
            display: block;
            height: 3rem;
            margin: 0 0 1rem 0;
        }

        .t {
            padding: 0 0 .5rem 0;
            color: #fff;
            font-weight: 700;
            font-size: 1.4rem;
        }

        p {
            padding: 0 0 2rem 0;
            white-space: normal;
            word-break: keep-all;
        }
    }
}



.btn-box {margin-top:15px;}
.btn-box.mycatchon {margin-top:30px;}
.btn-box .half {margin-left:-5px;}
.btn-box .half li {padding-left:5px;width:50%;box-sizing:border-box;float:left;}
.lnk-box {display:block;width:100%;border:solid 1px #b2b2b2;line-height:48px;font-size:16px;text-align:center;font-weight:700;}
.lnk-box.red {border:solid 1px #f9acac;color:#ea003d;}
.lnk-box > span {font-size:12px;color:#ea003d;font-weight:400;padding-left:10px;}

.a-btn-box {display:block;width:100%;border:solid 1px #ccc;line-height:42px;padding-top:2px;text-align:center;box-sizing:border-box;color:#666;font-size:15px;}
.a-btn-box.redbg {background:#ea003d;border-color:#ea003d;color:#fff;}
.a-btn-box.darkbg {background:#4c4c4c;border-color:#4c4c4c;color:#fff;}
.a-btn-box.graybg {background:#c6c6c6;border-color:#c6c6c6;color:#fff;}
.a-btn-box.purplebg {background:#522f91;border-color:#522f91;color:#fff;}
.a-btn-box.facebook {background:#3a5795;border-color:#3a5795;color:#fff;}
.a-btn-box.twitter {background:#55acef;border-color:#55acef;color:#fff;}

.vod-player-box .tvinglive_info {min-height:231px; color:#fff; text-align:center; vertical-align:middle; width:100%;}
.vod-player-box .tvinglive_info2 {min-height:231px; color:#fff; text-align:center; vertical-align:middle; width:100%;}
.vod-player-box .tvinglive_info h2{color:#fff; font-size:30px; padding-top:4px; z-index:12}
.vod-player-box .tvinglive_info p.next{color:#fff; opacity:0.7; font-size:15px; padding-top:58px; z-index:12}
.vod-player-box .tvinglive_info p.time{color:#fff; font-size:15px; padding-top:25px; z-index:12}

.vod-player-box .tvinglive_info:after {content:"";position:absolute;left:0;top:0;height:100%;width:100%;z-index:0;
    background: -webkit-linear-gradient(bottom,  rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 100%);
    background: linear-gradient(to top,  rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 100%);
}

.vod-player-box .video-none { position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 14px;
    text-align: center;
}

.vod-player-box {background:#000;text-align:center;position:relative;}
.vod-player-box.catchon {background:#5e008a; min-height:211px; }
.vod-player-box2.catchon2 {background:#5e008a; min-height:211px; }
.vod-player-box3.catchon3 {background:#53017b;}

/*.vod-player-box:before {content:"";position:absolute;left:0;top:0;height:100%;width:100%;z-index:9; background: rgba(0,0,0,0.5);}*/

.vod-player-box3 .tvinglive_info {min-height:231px; color:#fff; text-align:center; vertical-align:middle; width:100%;}
.vod-player-box3 .tvinglive_info2 {min-height:231px; color:#fff; text-align:center; vertical-align:middle; width:100%;}
.vod-player-box3 .tvinglive_info h2{color:#fff; font-size:30px; padding-top:4px; z-index:12}
.vod-player-box3 .tvinglive_info p.next{color:#fff; opacity:0.7; font-size:15px; padding-top:58px; z-index:12}
.vod-player-box3 .tvinglive_info p.time{color:#fff; font-size:15px; padding-top:25px; z-index:12}

.vod-player-box3 .tvinglive_info:after {content:"";position:absolute;left:0;top:0;height:100%;width:100%;z-index:0;
    background: -webkit-linear-gradient(bottom,  rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 100%);
    background: linear-gradient(to top,  rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 100%);
}

.vod-player-box3 {background:#000;text-align:center;position:relative;}
.vod-player-box3.catchon {background:#5e008a; min-height:211px; }
.vod-player-box3.catchon2 {background:#5e008a; min-height:211px; }

.vod-player-box3.catchon:before {display:none;}
.vod-player-box3 img {opacity:0.9;}
.vod-player-box3.catchon .catchon-vod-box {position:absolute;top:50%;left:0;width:100%;height:150px;margin-top:-75px;display:table;}
.vod-player-box3.catchon .catchon-vod-box > div {display:table-cell;vertical-align:middle;height:150px;}
.vod-player-box3.catchon .catchon-vod-box img {height:20px;}
.vod-player-box3.catchon .catchon-vod-box > div > a {display:inline-block;color:#fff;font-size:12px;border:solid 1px #8f4dad;padding:0 10px;line-height:24px;margin-top:15px;padding-top:1px;}
.vod-player-box3.catchon .catchon-vod-box > div > a > span {position:relative;padding-right:10px;}
.vod-player-box3.catchon .catchon-vod-box > div > a > span:after {content:"";width:5px;height:8px;background:url(//m.tving.com/public/css/img/icons.png) -10px -130px no-repeat;background-size:200px auto;position:absolute;right:0;top:50%;margin:-4px 0 0 0;}
.ico-play {display:block;width:62px;height:62px;text-indent:-999em;overflow:hidden;background:url(//m.tving.com/public/css/img/ico_play.png) left top no-repeat;background-size:100%;position:absolute;left:50%;top:50%;margin:-31px 0 0 -31px;z-index:10;}
.play-time {display:block;width:62px;padding-top:60px;position:absolute;left:50%;top:50%;margin:-39px 0 0 -34px;font-size:12px;color:rgba(255,255,255,0.9);z-index:10;}
.play-time:before {content:"";width:62px;height:62px;background:url(//m.tving.com/public/css/img/ico_play.png) center -62px no-repeat;background-size:100%;position:absolute;left:50%;top:0;margin:0 0 0 -31px;}

.vod-player-box3 > div {display:inline-block;position:relative;}
.vod-player-box3 > div video {width:100%;vertical-align:top;object-fit:cover;}
.vod-player-box3 .onair {position:absolute;left:0;top:0;text-align:Center;width:100%;line-height:55px;font-size:15px;font-weight:700;color:#fff;z-index:10;}





/*vod-player-box3*/
.vod-player-box3 .btns {position:absolute;right:10px;bottom:10px;z-index:100;}
.vod-player-box3 .btns a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px;}
.vod-player-box3 .btns a strong{font-size:12px; font-weight:bold;}
.vod-player-box3 .btns a strong.skip{font-size:12px; font-weight:bold; padding-right:5px;}
.vod-player-box3 .btns a strong.skip:after{content:"";width:6px;height:9px;background:url(//m.tving.com/public/css/img/skip_after.png) 0 0 no-repeat;background-size:6px 9px; position:absolute; top:50%; margin-top:-4px; margin-left:2px;}
.vod-player-box3 .btns a span{font-size:12px; color:#b2b2b2;}

.vod-player-box3 .btns2 {position:absolute; left:15px;bottom:20px;z-index:100;}
.vod-player-box3 .btns2 a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px;}

.vod-player-box3 .btns3 {position:absolute; right:10px;top:10px;z-index:100;}
.vod-player-box3 .btns3 a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px;}

.vod-player-box3 .time-line {position:absolute;bottom:0px; height:2px; width:100%; background:rgba(255,255,255,0.2); z-index:100;}
.vod-player-box3 .time-line .ing {position:absolute; top:0; left:0; bottom:0; background:#f30a2b;}

.vod-player-box3 .btns4 {position:absolute; left:10px;top:10px;z-index:100;}
.vod-player-box3 .btns4 a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px; padding-left:36px;}
.vod-player-box3 .btns4 a:before{content:"";width:24px;height:24px;background:url(//m.tving.com/public/css/img/sound_icon.png) 0px 0px no-repeat;background-size:24px auto;position:absolute;left:10px; top:5px; margin:0 0 0 0;}

.vod-player-box3 .btns5 {position:absolute; left:10px;top:10px;z-index:100;}
.vod-player-box3 .btns5 a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px; padding-left:30px;}
.vod-player-box3 .btns5 a:before{content:"";width:24px;height:24px;background:url(//m.tving.com/public/css/img/sound_icon.png) 0px -24px no-repeat;background-size:24px auto;position:absolute;left:10px; top:6px; margin:0 0 0 0;}


.vod-player-box .btns {position:absolute;right:10px;bottom:10px;z-index:100;}
.vod-player-box .btns a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px;}
.vod-player-box .btns a strong{font-size:12px; font-weight:bold;}
.vod-player-box .btns a strong.skip{font-size:12px; font-weight:bold; padding-right:5px;}
.vod-player-box .btns a strong.skip:after{content:"";width:6px;height:9px;background:url(//m.tving.com/public/css/img/skip_after.png) 0 0 no-repeat;background-size:6px 9px; position:absolute; top:50%; margin-top:-5.5px; margin-left:2px;}
.vod-player-box .btns a span{font-size:12px; color:#b2b2b2;}

.vod-player-box .btns2 {position:absolute; left:15px;bottom:20px;z-index:100;}
.vod-player-box .btns2 a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px;}

.vod-player-box .btns3 {position:absolute; right:10px;top:10px;z-index:100;}
.vod-player-box .btns3 a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px;}

.vod-player-box .btns4 {position:absolute; left:10px;top:10px;z-index:100;}
.vod-player-box .btns4 a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px; padding-left:36px;}
.vod-player-box .btns4 a:before{content:"";width:24px;height:24px;background:url(//m.tving.com/public/css/img/sound_icon.png) 0px 0px no-repeat;background-size:24px auto;position:absolute;left:10px; top:6px; margin:0 0 0 0;}

.vod-player-box .btns5 {position:absolute; left:10px;top:10px;z-index:100;}
.vod-player-box .btns5 a {display:inline-block;background:rgba(0,0,0,0.8);line-height:31px;color:#fff;font-size:11px;padding:0 13px;padding-top:1px; padding-left:30px;}
.vod-player-box .btns5 a:before{content:"";width:24px;height:24px;background:url(//m.tving.com/public/css/img/sound_icon.png) 0px -24px no-repeat;background-size:24px auto;position:absolute;left:10px; top:6px; margin:0 0 0 0;}

.vod-player-box .time-line {position:absolute;bottom:0px; height:2px; width:100%; background:rgba(255,255,255,0.2); z-index:100;}
.vod-player-box .time-line .ing {position:absolute; top:0; left:0; bottom:0; background:#f30a2b;}


.vod-player-box3.catchon:before {display:none;}
.vod-player-box3 img {opacity:0.9;}
.vod-player-box3.catchon .catchon-vod-box {position:absolute;top:50%;left:0;width:100%;height:150px;margin-top:-75px;display:table;}
.vod-player-box3.catchon .catchon-vod-box > div {display:table-cell;vertical-align:middle;height:150px;}
.vod-player-box3.catchon .catchon-vod-box img {height:20px;}
.vod-player-box3.catchon .catchon-vod-box > div > a {display:inline-block;color:#fff;font-size:12px;border:solid 1px #8f4dad;padding:0 10px;line-height:24px;margin-top:15px;padding-top:1px;}
.vod-player-box3.catchon .catchon-vod-box > div > a > span {position:relative;padding-right:10px;}
.vod-player-box3.catchon .catchon-vod-box > div > a > span:after {content:"";width:5px;height:8px;background:url(//m.tving.com/public/css/img/icons.png) -10px -130px no-repeat;background-size:200px auto;position:absolute;right:0;top:50%;margin:-4px 0 0 0;}
.ico-play {display:block;width:62px;height:62px;text-indent:-999em;overflow:hidden;background:url(//m.tving.com/public/css/img/ico_play.png) left top no-repeat;background-size:100%;position:absolute;left:50%;top:50%;margin:-31px 0 0 -31px;z-index:10;}
.play-time {display:block;width:62px;padding-top:60px;position:absolute;left:50%;top:50%;margin:-39px 0 0 -34px;font-size:13px;color:rgba(255,255,255,0.9);z-index:10;}
.play-time:before {content:"";width:62px;height:62px;background:url(//m.tving.com/public/css/img/ico_play.png) center -62px no-repeat;background-size:100%;position:absolute;left:50%;top:0;margin:0 0 0 -31px;}

.vod-player-box2.catchon2:before {display:none;}
.vod-player-box2 img {opacity:1;}
.vod-player-box2.catchon2 .catchon-vod-box {text-align:center; width:100%;}
.vod-player-box2.catchon2 .catchon-vod-box > div {text-align:center;min-SSSheight:211px;}
.vod-player-box2.catchon2 .catchon-vod-box img {max-width:100%; max-height:211px;}
.vod-player-box2.catchon2 .catchon-vod-box > div > a {}
.vod-player-box2.catchon2 .catchon-vod-box > div > a > span {}
.vod-player-box2.catchon2 .catchon-vod-box > div > a > span:after {content:"";}


.vod-player-box > div {display:inline-block;position:relative;}
.vod-player-box > div video {width:100%; vertical-align:top;object-fit:cover;}
.vod-player-box .onair {position:absolute;left:0;top:0;text-align:Center;width:100%;line-height:55px;font-size:15px;font-weight:700;color:#fff;z-index:10;}

.vod-player-box .btns_op {position:absolute; z-index:30 !important; width:100%; text-align:center; position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
    height:90px;
    background: -webkit-linear-gradient(bottom,  rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 100%);
    background: linear-gradient(to top,  rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 100%);}
.vod-player-box .btns_op ul{margin:0 90px;}
.vod-player-box .btns_op li{width:33.3%; float:left; background:rgba(0,0,0,0.4); margin-top:48px;}
.vod-player-box .btns_op li a{line-height:32px;color:#fff;font-size:12px; width:100%; display:inline-block;}
.vod-player-box .btns_op li.on{width:33.3%; float:left; background:rgba(0,0,0,0.8);}
.vod-player-box .btns_op li.on a{line-height:32px;color:#f30a2b;font-size:12px; width:100%; display:inline-block;}

.vod-player-box .btns_op2 {position:absolute; z-index:30 !important; width:100%; text-align:center; position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height:90px;
    background: -webkit-linear-gradient(bottom,  rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 100%);
    background: linear-gradient(to top,  rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 100%);}
.vod-player-box .btns_op2 ul{margin:0 120px;}
.vod-player-box .btns_op2 li{width:50%; float:left; background:rgba(0,0,0,0.4); margin-top:48px;}
.vod-player-box .btns_op2 li a{line-height:32px;color:#fff;font-size:12px; width:100%; display:inline-block;}
.vod-player-box .btns_op2 li.on{width:50%; float:left; background:rgba(0,0,0,0.8);}
.vod-player-box .btns_op2 li.on a{line-height:32px;color:#f30a2b;font-size:12px; width:100%; display:inline-block;}
.vod-player-box {
    .poster {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        img {
            width: 100%;
            object-fit: cover;
            opacity: 0;
            transition: all .3s;
        }
        img.loaded {
            opacity: 1;
        }
    }
}
#buffering {
    display: none;
}

</style>




<template>
    <div class="tving-main-livech">
        <p class="inner">티빙 라이브</p>

        <div v-swiper:mySwiper="swiperOption" 
          v-if="items.length > 0" ref="swiper"
        >
            <div class="tving-main-livech-tmp2">
                
            </div>
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,idx) in items" 
                :key="item.id + idx" @click="liveClick(item.live_code)"
                >
                
                <!-- <div class="info">
                    <div><img :src="`//image.tving.com/upload/cms/caic/CAIC1800/${item.live_code}.png`" class="logo"></div>
                    <span>{{item.schedule.program.name.ko}}{{(item.schedule.episode)?', ' + item.schedule.episode.frequency + '화':''}}</span>
                </div> -->
                    <div class="cover">
                        <img :data-src="getThumbnail(item.schedule.channel.code)" class="swiper-lazy">
                    </div>
                    <div class="info">
                        <span class="progress" :class="`ch_${item.schedule.channel.code}`" :style="`width:${item.liveper}%`"></span>
                        <span>{{item.schedule.channel.name.ko}}</span>
                        <span>{{item.schedule.program.name.ko}}{{(item.schedule.episode)?', ' + item.schedule.episode.frequency + '화':''}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="tving-main-livech-tmp">
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {

  },
  computed: {
    ...mapGetters(['getPathLives', 'getConvertUrl'])
  },
  data () {
    return {
      items: [],
      swiperOption: {
        init: false,
        // loop: true,
        parallax: false,
        slidesPerView: 'auto',
        centeredSlides: false,
        spaceBetween: 6,
        freeMode: true,
        preloadImages: false,
        // Enable lazy loading
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 100,
        },
        pagination: {
            // el: '.swiper-pagination',
            // dynamicBullets: true
        },
        navigation: {
            // nextEl: '.swiper-button-next',
            // prevEl: '.swiper-button-prev'
        },
        on: {
        }
      }
    }
  },
  mounted () {
    
    const that = this
    const now = Number(moment().format('YYYYMMDDHHmmss'))

    axios.get(this.getPathLives())
    .then(function (res) {
 
        const result = res.data.body.result.filter(item => item.schedule.channel.type.indexOf('CPCS0100') > -1 );

        result.forEach((obj, idx) => {
            obj.liveper = (100 / (obj.schedule.broadcast_end_time - obj.schedule.broadcast_start_time) * (obj.schedule.broadcast_end_time - now))
            if (obj.schedule.broadcast_end_time < now) {
                obj.liveper = 100
            }

            obj.schedule.broadcast_url[0].broad_url1 = that.getConvertUrl(obj.schedule.broadcast_url[0].broad_url1)
            obj.schedule.broadcast_url[0].broad_url3 = that.getConvertUrl(obj.schedule.broadcast_url[0].broad_url3)
        })

        // console.log(res.data.body.result)
        that.items = result

        setTimeout(() => {
            that.mySwiper.init()
            that.$refs.swiper.classList.add('show')
        }, 0)

    })
    .catch(function (error) {
        console.log(error)
    });
          
  },
  methods: {
    getThumbnail ($d) {
        return `//stillshot.tving.com/thumbnail/${$d}_0_640x360.jpg`
    },
    liveClick (idx) {
      this.$router.push({ path: `/live/${idx}` })
    },
  }
}
</script>

<style lang="scss" scoped>
.tving-main-livech {
    overflow: hidden;
    margin: 1.9rem -1rem 0;
    .inner {
        padding: 0 1rem;
        color: #fff;
        font-weight: 700;
        font-size: 1.15rem;
    }
}
.tving-main-livech-tmp2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 72%;
    margin: .7rem 0rem 1rem 1rem;
    transition: all .5s;

    &:before {
        content: '';
        position: relative;
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        background-color: #191919;
    }
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: calc(100% + 6px);
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        background-color: #191919;
    }

    .show & {
        opacity: 0;
    }
}
.tving-main-livech-tmp {
    position: relative;
    // overflow: hidden;
    width: 72%;
    margin: .7rem 0rem 1rem 1rem;

    &:before {
        content: '';
        position: relative;
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        background-color: #191919;
    }
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: calc(100% + 6px);
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        background-color: #191919;
    }
}
.swiper-wrapper {
    padding: .7rem 0 1rem 0;
    opacity: 0;
    transition: all .5s;
    transform: translate(3rem, 0);
    .show & {
        opacity: 1;
        transform: translate(0, 0);
    }
}
.swiper-slide {
    display: flex;
    align-items: flex-start;
    width: 72%;
    height: 100%;
    margin: 0 0rem;
    padding: 0rem;
    // background-color: #f7f7f7;
    border-radius: 1px;
    color: #333;
    font-size: .8rem;
    word-break: keep-all;

    &:first-child {
        margin-left: 1rem;
    }
    &:last-child {
        margin-right: 1rem;
    }

    .logo {
        position: relative;
        display: block;
        margin: 1rem 0 0 0;
        height: 2rem;
    }
    // span {
    //     // display: block;
    //     // margin: .25rem 0 .5rem 0;
    // }

    .cover {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;

        img {
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: .2s;

            &.swiper-lazy-loaded {
                opacity: 1;
            }
        }
    }


    .info {
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 38px;
      display: flex;
      align-items: center;
      background-color: rgba(0,0,0,.5);
      .progress {
        position: absolute;
        width: 0%;
        height: 100%;
        border-radius: 0;
      }
      span {
        position: relative;
        z-index: 1;
        font-size: 15px;
        color: #fff;

        &:nth-child(2) {
          font-weight: 700;
          padding: 0 .5rem 0 1rem;
        }
        &:nth-child(3) {
          text-overflow:ellipsis;
          white-space:nowrap;
          word-wrap:normal;
          overflow:hidden;
        }
      }

      
    }
  .swiper-slide {
    width: 72%;
    padding-right: 2.2%;
    box-sizing: border-box;
  }

  .title {
    display: block;
    font-weight: 700;
    font-size: 1rem;
    /* color: #fff; */
    letter-spacing: 1px;
  }
  span.progress {opacity:0.7;background:#ea003d;}

  .progress.ch_C00551 {background:#fa0000;} /** tvn **/

  .progress.ch_C01143 {background:#fcb61f;} /** otvn **/

  .progress.ch_C00579 {background:#df0e78;}  /** Mnet **/

  .progress.ch_C01142 {background:#d80a00;}  /** Onstyle **/

  .progress.ch_C00575 {background:#86cc00;}  /** Olive **/

  .progress.ch_C01141 {background:#221f1f;}  /** Xtm **/

  .progress.ch_C07381 {background:#fbb315;}  /** OCN **/

  .progress.ch_C04601 {background:#e75204;}  /** Ch. CGV **/

  .progress.ch_C07382 {background:#c02d2c;}  /** super Action **/

  .progress.ch_C06941 {background:#00aeef;}  /** Tooniverse **/

  .progress.ch_C00544 {background:#dc0027;} /** 중화TV **/

  .progress.ch_C00590 {background:#00944b;} /** OGN **/

  .progress.ch_5842 {background:#54009f;}  /** CatchON **/

  .progress.ch_C15042 {background:#ff0066;} /** 티빙라이브 **/

  .progress.ch_tvingsports {background:#141414;} /** 티빙스포츠 **/

  .progress.ch_tvingtv {background:#3d58d2;} /** 티빙티비 **/

  .progress.ch_C15152 {background:#ff5f00;} /** 다이아티비 **/

  .progress.ch_C00818 {background:#16ab6a;} /**프로야구*/
  .progress.ch_C00819 {background:#16ab6a;} /**프로야구*/
  .progress.ch_C00835 {background:#16ab6a;} /**프로야구*/
  .progress.ch_C06121 {background:#16ab6a;} /**프로야구*/
  .progress.ch_C06101 {background:#16ab6a;} /**프로야구*/

  .progress.ch_plus {background:#596682;} /** 추가채널공통 20170201 외부채널 추가 **/
  .progress.ch_C15251 {background:#00944b;} /** OGN+lol **/
  .progress.ch_C15252 {background:#00944b;} /** OGN+오버워치 **/
  .progress.ch_C00593 {background:#596682;} /** YTN**/
  .progress.ch_C01581 {background:#596682;} /** tv조선 **/
  .progress.ch_C01583 {background:#596682;} /** channel A **/
  .progress.ch_C00708 {background:#596682;} /** MBN **/
  .progress.ch_C01723 {background:#596682;} /** 연합뉴스 **/
  .progress.ch_C01101 {background:#596682;} /** YTN life **/
  .progress.ch_C15347 {background:#596682;} /** YTN science **/
}
</style>
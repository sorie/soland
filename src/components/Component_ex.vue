<template>
<div class="components">
  <section class="cont__wrapper">
    <h1>List of 16:9 proportion pictures with grid</h1>
    <div class="live-item" v-if="clipdata.results">
      <a class="img live-item__image" :href="clip.links.html" target="_blank" v-for="(clip, idx) in clipdata.results" :key="`${idx}`">
        <img :src="clip.urls.small" class="image-cover" :alt="clip.alt_description">
      </a>
    </div>
  </section>
  <section class="cont__wrapper">
    <h1>Swiper slide component</h1>
    <swiper ref="mySwiper" class="main-visual-slide type2" v-if="bannerdata.results" :options="swiperOption">
      <swiper-slide v-for="(slide, idx) in bannerdata.results" :key="`item-newmain-${idx}`">
        <div class="bg bg-right" :style="`background-color: #${slide.color}`"></div>
        <div class="bg bg-left" :style="`background-color: #${slide.color}`"></div>
        <img :src="getBanner(slide.urls.regular)"  class="swiper-lazy" :alt="slide.alt_description">
        <a :href="slide.links.html" target="_blank" :style="`background-image:${slide.urls.regular}`" class="logger_click"  :data-id="slide.id">       
          <div class="slide_cont vod">    
            <span class="title">{{slide.alt_description}}</span>                             
          </div>   
        </a>
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-pagination" slot="pagination"></div>
  </section>
  <section class="cont__wrapper">
    <h1>Web RTC</h1>
    <lobby-room></lobby-room>
  </section>

</div>
</template>
<script>
import Constant from '../Constant'
import { mapState } from 'vuex'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import lobbyRoom from '@/components/video-call/lobbyRoom.vue'
import vueLazyLoad from "vue-lazyload";
import 'swiper/css/swiper.css'

export default {
  name: 'component_ex',
  components: {
    Swiper,
    SwiperSlide,
    lobbyRoom
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        // centeredSlides: true,
        // effect: 'fade',
        spaceBetween: 30,
        lazy: true,
        // autoHeight: true, //enable auto height
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        // autoplay: {
        //     delay: 10000,
        //     disableOnInteraction: false
        // },
        on: {
          init: function() {
            // console.log('init');
          },
          slideChange() {
            // console.log('onSlideChangeEnd===>', this);
          },
          tap() {
            // console.log('onTap', this);
          }
        }
      },
    }
  },
  computed: {
    ...mapState(["bannerdata","clipdata"]),
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted : function() {   
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false) 
    this.$store.dispatch(Constant.FETCH_EVENTSLIDE)
    this.$store.dispatch(Constant.FETCH_CLIP)

    // Vue.use(vueLazyLoad, {
    //     lazyComponent: true,
    //     listenEvents: [ 'scroll' ]
    // })
  },
  methods: {
    getBanner($d) {
      return `${$d}`
    },
    // clipImageUrl($s) {
    //   let src="http://image.tving.com/crop.php?u=http://image.tving.com"
    //   return src + $s
    // }
  }//methods end
  
}
</script>
<style lang="scss" scoped>
.swiper-container{
  height: 500px;
  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index:-1;
    &-right {
      right: 0;
      left: 50%;
    }
    &-left {
      left: 0;
      right: 50%;
    }
  }
  .swiper-wrapper {
    height: 380px;
    .swiper-slide {
      &:empty {
        background-color: rgb(37, 31, 31);
      }
      img{
        width: 100%;
        object-fit: cover;
        z-index: 1;
      }
    }
    &.type2 {
      .slide_cont {
        position: absolute;
        left: 50%;
        bottom: 50%;
        width: auto;
        margin: 0px 0px 0px -540px;
        -webkit-transform: translateY(50%);
        -moz-transform: translateY(50%);
        transform: translateY(50%);
        transition: transform 1s ease-in;
        text-align: left;
        color: #fff;
        .title {
          display: block;
          margin-bottom: 0px;
          line-height: 54px;
          font-size: 48px;
          font-weight: 400;
          opacity: 1;
        }
        .sub {
          display: block;
          line-height: 24px;
          margin: 0px;
          padding-top: 18px;
          font-size: 20px;
          font-weight: 400;
          opacity: 0.7;
        }
        .sub2 {
          display: block;
          font-size: 17px;
          line-height: 18px;
          color: #fff;
          padding-top: 20px;
          letter-spacing: .5px;
        }
        &.vod {
          .title {
            font-size: 16px;
            line-height: 20px;
          }
          .sub {
            font-size: 36px;
            line-height: 40px;
            opacity: 1;
          }
          
        }

      }
    }
  }
  .logger_click {
    position: absolute;
    top:0;left:0;right:0;bottom:0;
    z-index: 2;
  }

}
.cont__wrapper {
  position: relative;
  width: 100%;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;

  .live-item {
    width:100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
		" a . b . "
		" . c . e "
		" f . g . "
		" . h . i ";
    margin: 0;
    transition: transform .3s;
    &__image {
      position: relative;
      background-color: #ddd;
      border-radius: .25rem;
      transition: box-shadow .4s;
      &:nth-child(1){
        grid-area: a;
      }
      &:nth-child(2){
        grid-area: b;
      }
      &:nth-child(3){
        grid-area: c;
      }
      &:nth-child(4){
        grid-area: d;
      }
      &:nth-child(5){
        grid-area: e;
      }
      &:nth-child(6){
        grid-area: f;
      }
      &:nth-child(7){
        grid-area: g;
      }
      &:nth-child(8){
        grid-area: h;
      }
      &:nth-child(9){
        grid-area: i;
      }
      img {
        &:empty{
          opacity: 0;
        }
        &.image-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          -o-object-fit: cover;
          object-fit: cover;
          border: 0;
          opacity: 1;
          transition: opacity 1s;
        }
      }
      img[lazy='loaded'] {
        opacity: 1;
      }
      &:before {
        content: "";
        padding-top: 56.25%;
        float: left;
      }
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: 1;
      }
    }
  }

}

.live-item:empty {
  width: 100%;
  height: 600px;
  
  background-image:
    linear-gradient(90deg, rgba(255,255,255,.2) 300px, transparent 0 ),
    linear-gradient(95deg, rgba(0, 0, 0, .01) 20%, rgba(243, 237, 237, 0.08) 40%, rgba(0,0, 0, 0) 90% ),
    linear-gradient(90deg, rgba(255,255,255,.2) 250px, transparent 0 ),
    linear-gradient(90deg, rgba(255,255,255,.2) 300px, transparent 0 ),
    linear-gradient(90deg, rgba(255,255,255,.2) 300px, transparent 0 ),
    linear-gradient(95deg, rgba(0, 0, 0, .01) 20%, rgba(243, 237, 237, 0.08) 40%, rgba(0,0, 0, 0) 90% ),
    linear-gradient(90deg, rgba(255,255,255,.2) 250px, transparent 0 ),
    linear-gradient(90deg, rgba(255,255,255,.2) 300px, transparent 0 );

  background-repeat: repeat-x;

  background-size:
    320px 200px,
    320px 270px,
    320px 20px,
    320px 20px,
    320px 200px,
    320px 270px,
    320px 20px,
    320px 20px;

  background-position:
    0 0,
    0 0,
    0 220px,
    0 250px,
    0 310px,
    0 310px,
    0 530px,
    0 560px;

  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    background-position:
      0 0,
      100% 0,
      0 220px,
      0 250px,
      0 310px,
      100% 310px,
      0 530px,
      0 560px;
  }
}


</style>


<template>
<div class="container">

  <section class="cont__wrapper">
    <h1>Empty image animation</h1>
    <div class="cont">
      <div class="img">
        <!-- {{item.content.banner_image_url}} -->
        <!-- <img src="http://stillshot.tving.com/thumbnail/C15841_0_320x180.jpg" alt="" class="a"> -->
        <!-- <img :src="getBanner(item.content.banner_image_url)" alt="" class="a"> -->
      </div>
      <!-- <div class="wrap_cont gul">
        <p>신서유기4</p>
        <p>설명설명설명설명설명설명설명설명설명설명설명설명설명</p>
      </div> -->
    </div>
  </section>
  <!-- <div class="swiper-container" v-swiper:mySwiper="swiperOption" v-if="bannerdata.length > 0" ref="swiper"> -->
  <section class="cont__wrapper">
    <h1>Swiper slide component</h1>
    <swiper class="main-visual-slide type2"  v-swiper:mySwiper="swiperOption">
      <swiper-slide class="" v-for="(slide, idx) in bannerdata.results" :key="`item-newmain-${idx}`">
        <div class="bg bg-right" :style="`background-color: #${slide.color}`"></div>
        <div class="bg bg-left" :style="`background-color: #${slide.color}`"></div>
        <img :src="getBanner(slide.urls.regular)" class="" :alt="slide.alt_description">
        <a :href="slide.links.self" target="_self" :style="`background-image:${slide.urls.regular}`" class="logger_click"  :data-id="slide.id">       
        <div class="slide_cont vod">    
          <span class="title">{{slide.alt_description}}</span>                             
        </div>   
        </a>
      </swiper-slide>
    </swiper>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div> -->
    
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
  </section>
  <section class="cont__wrapper">
    <h1>Web RTC</h1>
    <div class="cont" v-if="clipdata.length > 0">
      <div class="img">
        <div v-for="(clip, idx) in clipdata" :key="`${idx}`">
          {{idx}}
          <!-- <div v-for="(item, idx) in clip.api_url_item" :key="`${idx}`">
            <img :src='item.link_url' alt="">
          </div> -->
            {{clip.pcu_title}}
        </div>
        <!-- {{clip.api_url_item.clip_info.contenttitle}} -->
        <!-- <img :src="`clipImageUrl(${clip.api_url_item.clip_info.savecontentimg})`"> -->
        
        <!-- {{item.content.banner_image_url}} -->
        <!-- <img src="http://stillshot.tving.com/thumbnail/C15841_0_320x180.jpg" alt="" class="a"> -->
        <!-- <img :src="getBanner(item.content.banner_image_url)" alt="" class="a"> -->
      </div>
      <!-- <div class="wrap_cont gul">
        <p>신서유기4</p>
        <p>설명설명설명설명설명설명설명설명설명설명설명설명설명</p>
      </div> -->
    </div>
  </section>

</div>
</template>
<script>
import Constant from '../Constant'
import { mapState } from 'vuex'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        // spaceBetween: 30,
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 100,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: false,
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
  },
  mounted : function() {    
    this.$store.dispatch(Constant.FETCH_EVENTSLIDE)
    this.$store.dispatch(Constant.FETCH_CLIP)
  },
  methods: {
    getBanner($d) {
      return `${$d}`
    },
    clipImageUrl($s) {
      let src="http://image.tving.com/crop.php?u=http://image.tving.com"
      return src + $s
    }
  }//methods end
  
}
</script>
<style lang="scss">

.container {
  background-color: #000;
  width:100%;
  height:100%;
}
.swiper-container{
  // position: relative;
  // width: 100%;
  // margin: auto;
  // overflow: hidden;
  // border: 0;
  // border: 1px solid blue;
  // box-shadow: none;
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
        background-color: #ddd;
      }
      img{
        width: 100%;
        object-fit: cover;
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

}
.cont__wrapper {
  position: relative;
  width: 100%;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;

  .cont {
    .img {
      // width: 100%;
      // height: 0;
      // position: relative;
      // overflow: hidden;
      // padding: 56.25% 0;
      img {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        object-fit: cover;
      }
    }
  }
}

.img:empty {
  width: 1200px;
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


<template>
    <div class="tving-main-banner">
        <div v-swiper:mySwiper="swiperOption" v-if="data.length > 0">
            <div class="swiper-wrapper" ref="swiper">
                <template v-for="(item, idx) in data">
                    <div class="swiper-slide" :key="'top-banner-'+idx" v-if="item.banner_type == 'AMTP0900'">
                        <a @click="liveClick(item.content.banner_link_url)" class="thumb_top" target="_self" alt="김비서가 왜그럴까" data-nethru_clcode_link="A000015">
                            <img  :data-src="`//image.tving.com${item.content.banner_image_url}`" v-if="item.content.banner_image_url" class="swiper-lazy">
                            
                            <div class="main-visual-slide-info" :class="{'type-live': item.banner_type == 'AMTP0900','type-vod': item.banner_type == 'AMTP1000','type-movie': item.banner_type == 'AMTP1100'}">
                                <div class="main-visual-slide-title" v-if="item.banner_type == 'AMTP0900' || item.banner_type == 'AMTP1100'">
                                    <p v-if="!item.content.banner_title2">{{item.content.banner_title}}</p>
                                    <p v-if="item.content.banner_title2">{{item.content.banner_title2}}</p>
                                    <p v-if="item.content.banner_title2 && item.content.banner_title3">{{item.content.banner_title3}}</p>
                                </div>
                                <div class="main-visual-slide-subtitle">
                                    <p>{{item.content.banner_sub_title2}}</p>
                                    <p>{{item.content.banner_sub_title3}}</p>
                                </div>
                                <div class="main-visual-slide-description" :style="`color:#${(item.content.banner_bc_notice_color)?item.content.banner_bc_notice_color.replace('#',''):''}`">
                                    <img src="//m.tving.com/public/images/detail/tag_onair.png" alt="onair" v-if="item.banner_type == 'AMTP0900'">
                                    <p>{{item.content.banner_bc_notice}}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    
                </template>
            </div>
            <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
        <div v-else>
            <div class="swiper-tmp">
                
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getPathMainTop'])
  },
  data () {
    return {
        data: [],
        swiperOption: {
            init: false,
            // initialSlide: 0,
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            // parallax: true,
            // slidesPerView: 'auto',
            // centeredSlides: true,
            // spaceBetween: 0,

            preloadImages: false,
            // Enable lazy loading
            // lazy: true,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 100,
            },

            autoplay: {
                delay: 10000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                // dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            on: {
            }
        }
    }
  },
  mounted() {
    const that = this
    axios.get(this.getPathMainTop())
    .then(function (res) {
        // handle success
        that.data = []
        that.data = res.data.body.result
        // console.log(that.data)

        setTimeout(() => {
            that.mySwiper.init()
        }, 0)

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
  },
  methods: {
    liveClick (idx) {
      this.$router.push({ path: `/live/${_.last(idx.split('/'))}` })
    },
  }
}
</script>


<style lang="scss">
.tving-main-banner {
    margin: 0 -1rem;

    .swiper-tmp {
        position: relative;
        display: block;
        width: 100%;
        height: 0;
        padding-bottom: 70%;
        background-color: #191919;
    }
}
//colors
$black: #000;
$white_15: rgba(255,255,255,0.15);
$color_red_ribbon_approx: #ea003d;
$black_25: rgba(0,0,0,0.25);
$white: #fff;
$color_rob_roy_approx: rgb(239, 198, 127);
$color_monza_approx: rgb(218,0,28);
$white_40: rgba(255,255,255,0.4);

//urls
$url_0: url(img/bg_visual.png);

.thumb_top {
    position: relative;
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 70%;
    background-color: #191919;
    > img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: all .3s;

        &.swiper-lazy-loaded {
            opacity: 1;
        }
    }
}
.main-visual-slide-info {
	position: absolute;
	bottom: 24px;
	left: 17px;
	right: 17px;
	text-align: left;
	color: $white;
	.main-visual-slide-title {
		font-size: 30px;
		font-weight: 800;
		line-height: 34px;
		padding: 0 0 3px 0;
	}
	&.type-vod {
		.main-visual-slide-title {
			padding: 0 0 9px 0;
		}
		.main-visual-slide-subtitle {
			font-size: 20px;
			font-weight: 800;
			line-height: 25px;
			padding: 0 0 9px 0;
		}
	}
	.main-visual-slide-subtitle {
		font-size: 14px;
		font-weight: 800;
		line-height: 18px;
		padding: 0 0 15px 0;
	}
	.main-visual-slide-description {
        position: relative;
		font-size: 14px;
		font-weight: 800;
		line-height: 18px;
		color: $color_rob_roy_approx;
	}
	&.type-movie .main-visual-slide-subtitle {
		padding: 0;
	}
	&.type-live .main-visual-slide-description {
		color: $color_monza_approx;
		p {
			padding: 0 0 0 47px;
			position: relative;
		}
		img {
			position: absolute;
			left: 0;
			top: 0px;
			width: 42px;
			height: 17px;
			padding: 0 5px 0 0;
		}
	}
}
.tving-main-banner .swiper-pagination {
    width: 100%;
    left: 0;
    bottom: 0;
    position: absolute;
    height: 5px;
    overflow: hidden;
    z-index: 55;
    display: flex;

    .swiper-pagination-bullet {
        width: 100%;
        padding: 0 5px;
        //Instead of the line below you could use @include box-sizing($bs)
        box-sizing: border-box;
        display: block;
        width: 100%;
        // max-height: 1px;
        height: 5px;
        background-color: $white_15;
        margin-top: 0;
        border-radius: 0;
        text-indent: -999em;
        opacity: 1;
        //Instead of the line below you could use @include transition($transition-1, $transition-2, $transition-3, $transition-4, $transition-5, $transition-6, $transition-7, $transition-8, $transition-9, $transition-10)
        transition: all .2s;
        //Instead of the line below you could use @include transform($scale, $rotate, $transx, $transy, $skewx, $skewy, $originx, $originy)
        transform: translate(0,4px);
        
        &:first-child {
            margin-left: 0;
            padding-left: 0;
        }
        &:last-child {
            margin-right: 0;
            padding-right: 0;
        }
        &.swiper-pagination-bullet-active {
            // max-height: 5px;
            background: $color_red_ribbon_approx;
            //Instead of the line below you could use @include transform($scale, $rotate, $transx, $transy, $skewx, $skewy, $originx, $originy)
            transform: translate(0,0);
        }
    }
}
</style>

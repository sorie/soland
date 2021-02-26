<template>
  <div class="liveidch">

    <!-- <div class="cjp__scalaton cjp__scalaton-player" v-if="!data"></div>
    <div class="cjp__scalaton cjp__scalaton-list" v-if="!data"></div> -->
    <!-- <div class="cjp__ui-loading"  v-if="!data">
      <div class="item loading-2">
        <div class="spinner">
          <div class="circle circle-1">
            <div class="circle-inner"></div>
          </div>
          <div class="circle circle-2">
            <div class="circle-inner"></div>
          </div>
        </div>
        <div></div>
      </div>
    </div> -->
    <div class="cjp__ui-loading" v-if="loading">
      <div class="item loading-2">
        <div class="spinner">
          <div class="circle circle-1">
            <div class="circle-inner"></div>
          </div>
          <div class="circle circle-2">
            <div class="circle-inner"></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>

    <template  v-if="data">

      <div class="container">
        <div class="player__area" ref="playerarea">
          <div class="player__box">
            <template  v-if="data.schedule">
              <!-- <img v-lazy="getThumbnail(data.schedule.channel.code)"> -->
              <Player
                :info="data.schedule"
                :cover="getThumbnail(data.schedule.channel.code)"
              />
            </template>
          </div>
        </div>

        <div class="player__contWrap">
          <div class="cont__info">
            <span>{{data.schedule.program.name.ko}}</span>
            <span>{{data.schedule.channel.name.ko}}</span>
          </div>  
        </div>
        <WarnigPage />
      </div>

      <div class="liveidch__list container ">
        <div class="liveidch__list__title">
          <p class="livech_list_tit">티빙 라이브</p>
          <ul class="liveidch__list__solt">
            <li class="selected">
              <a href="#">인기 채널</a>
            </li>
          </ul>
          <!-- <ul class="liveidch__list__solt">
            <li class="selected"><a href="#">ENM 채널</a></li>
            <li class=""><a href="#">종편 채널</a></li>
          </ul> -->
        </div>

        <div class="liveidch__list__wrapper" ref="listarea" >
          <div class="liveidch__list__cont"  v-for="(item, idx) in items" :key="`item-newmain-${idx}`"  @click="liveClick(item.live_code)">
            <div class="cover">
              <img v-lazy="getThumbnail(item.schedule.channel.code)">
            </div>
            <div class="info">
              <span>{{item.schedule.program.name.ko}}</span>
              <span>{{item.schedule.channel.name.ko}}</span>
            </div>
          </div>
        </div>
      </div>

    </template>

  </div>
  
  
</template>

<script>
import Vue from 'vue'
import axios from 'axios' 
import { mapGetters } from 'vuex'
import Player from '~/components/Player.vue'
import Loading from '~/components/Loading'
import WarnigPage from '~/components/main/WarnigPage.vue'
import vueLazyLoad from 'vue-lazyload'

export default {
  components: {
    Loading,
    WarnigPage,
    Player
  },
  data () {
    return {
      data: '',
      items: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters(['getPathLives'])
  },
  mounted() {
    const that = this
    this.loading = true
    
    axios.get(this.getPathLives()).then(function(res) {
      that.loading = false
      that.items = res.data.body.result

      res.data.body.result.forEach(el => {
          if (el.live_code == that.$route.params.id) {
              that.data = el
          }
      });

      setTimeout(() => {
          that.$refs.playerarea.classList.add('show')
          that.$refs.listarea.classList.add('show')
      }, 10)

    },(error)=>{
      that.loading = false
    })

    Vue.use(vueLazyLoad, {
        lazyComponent: true,
        listenEvents: [ 'scroll' ]
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
    liveClick (idx) {
      this.$router.push({ path: `/livenew/${idx}` })
    },
    handler (component) {
      listenEvents: [ 'scroll' ]
    }
  }
}

</script>
<style lang="scss">
$screenW : 375px;
@function vw($px, $view:$screenW) {
  @return #{($px / $view ) * 100}vw;
}
@function rem($fontSize) {
  @return #{$fontSize / 16}rem;
}

.player__area {
  opacity: 0.6;
  transition: opacity 1s;
  &.show {
    opacity: 1;
  }
}

.player__box {
  position: relative;
  margin-left: -1rem;
  margin-right: -1rem;

  @media screen and (min-width: 1280px) {
    margin-left: 0rem;
    margin-right: 0rem;
  }
  // height: 0;
  // padding-bottom: 56.25%;
  background-color: #000;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  img[lazy='loaded'] {
    opacity: 1;
  }
}

.player__contWrap{
  .cont__info {
    margin-top: 1.5em;
    span {
      display: block;
      color: #fff;
      &:nth-child(1){
        font-size: rem(20);
        line-height: 1.2;
        font-weight: 700;
      }
      &:nth-child(2){
        font-size: rem(15);
        opacity: 0.5;
        line-height: 1.2;
        margin-top: rem(6);
      }
    }
  }

}

.liveidch__list {
  margin-top: 2em;
    color: #fff;
    &__title {
      font-size: rem(18);
      display: flex;
    }
    &__solt {
      display: inline-flex;
      font-size: rem(14);
      line-height: 1.9;
      margin-left: auto;
      li {
        color: rgb(70,70,70);
        &.selected {
          color: #fff;
        }
        &:not(:first-child):before {
          content: "|";
          padding: 0 8px;
          color: rgb(70,70,70)
        }
        a {
          color: inherit;
          font-size: inherit;
        }
      }
    }
    &__tit,&__solt {
      flex: 0 0 auto;
    }

    &__wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-top: .5em;
      opacity: 0;
      transition: opacity 1s;
      &.show {
        opacity: 1;
      }
    }
    &__cont {
      display: flex;
      flex: 0 1 100%;
      @media screen and (min-width: 768px) {
        flex: 0 1 50%;
      }
      align-items: center;
      // margin-top: 1.7em;
      padding: .8em 0;
      border-bottom: 1px solid rgba(27,27,27,1);
      .cover {
        position: relative;
        width: 33.33%;
        // max-width: 410px;
        // height: 0;
        // padding-bottom: 56.25%;
        background-color: #000;
        overflow: hidden;
        &:before {
          content: '';
          padding-top: 56.25%;
          float: left;
        }
        &:after {
          content: '';
          display: block;
          clear: both;
        }
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 0;
          vertical-align: top;
          opacity: 0;
        }
        img[lazy='loaded'] {
          opacity: 1;
        }
      }
      .info {
        span {
          display: block;
          margin-left: 1em;
          &:nth-child(1){
            font-size: rem(14);
          }
          &:nth-child(2){
            font-size: rem(12);
            color: rgba(255,255,255,0.5)
          }
        }
      }
    }
 }
</style>
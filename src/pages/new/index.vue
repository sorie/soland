<template>
  <div v-if="mounted">

    <WarnigPage />
    <div class="livech__list">
      <div class="livech__list__title">
        <p class="livech_list_tit">티빙 라이브</p>
        <ul class="livech__list__solt">
          <li class="selected">
            <a href="#">인기 채널</a>
          </li>
        </ul>
        <!-- <ul class="livech__list__solt">
          <li class="selected">
            <a href="#">ENM 채널</a>
          </li>
          <li class>
            <a href="#">종편 채널</a>
          </li>
        </ul> -->
      </div>
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

      <div class="list__wrapper" ref="container">
        <div
          class="list__cont"
          v-for="(item, idx) in data"
          :key="`item-newmain-${idx}`"
          @click="liveClick(item.live_code)"
        >
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
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { mapGetters } from 'vuex'
import vueLazyLoad from "vue-lazyload";
import Loading from '~/components/Loading'
import WarnigPage from '~/components/main/WarnigPage.vue'

export default {
  components: {
    WarnigPage,
    Loading,
  },
  data() {
    return {
      mounted: false,
      data: [],
      loading: true,
      type: 0 // 0: enm, 1: 종편
    };
  },
  computed: {
    ...mapGetters(['getPathLives'])
  },
  mounted() {
    const that = this
    this.mounted = true
    this.loading = true
    axios.get(this.getPathLives()).then(function(res) {
      that.loading = false
      that.data = res.data.body.result;

      setTimeout(() => {
        that.$refs.container.classList.add("show");
      }, 0 );
    }, (error) => {
      that.loading = false
    });
  },
  methods: {
    getThumbnail($d) {
      return `//stillshot.tving.com/thumbnail/${$d}_0_640x360.jpg`;
    },
    liveClick(idx) {
      this.$router.push({ path: `/livenew/${idx}` });
    },
    handler(component) {
      listenEvents: ["scroll"];
    }
  }
};
</script>

<style lang="scss" scoped>
$screenW: 375px;
@function vw($px, $view: $screenW) {
  @return #{($px / $view) * 100}vw;
}
@function rem($fontSize) {
  @return #{$fontSize / 16}rem;
}
.livech__list {
  position: relative;
  margin-top: 30px;
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
      color: rgb(70, 70, 70);
      &.selected {
        color: #fff;
      }
      &:not(:first-child):before {
        content: "|";
        padding: 0 8px;
        color: rgb(70, 70, 70);
      }
      a {
        color: inherit;
        font-size: inherit;
      }
    }
  }
  &__tit,
  &__solt {
    flex: 0 0 auto;
  }

  .list__wrapper {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    opacity: 0.6;
    transition: opacity 1s;
    &.show {
      opacity: 1;
    }
  }


  .list__cont {
    flex: 0 1 47%;
    margin-top: 1.7em;
    @media screen and (min-width: 768px) {
      flex: 0 1 32%;
    }
    .cover {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
      margin-bottom: .5em;
      background-color: #000;
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
        transition: opacity .3s;
      }
      img[lazy='loaded'] {
        opacity: 1;
      }
    }

    .info {
      span {
        display: block;
        &:nth-child(1) {
          font-size: rem(14);
        }
        &:nth-child(2) {
          font-size: rem(12);
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }

  }
}

</style>

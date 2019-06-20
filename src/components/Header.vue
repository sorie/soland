<template>
  <div class="mainMovie" ref="mainMovie" :style="[mainStyle]">
    <div class="header">
        <span class="logo">soland</span>
    </div>
    <div class="mainTable">
      <table>
        <thead>
          <tr>
            <td>Project Name</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in listItems" :key="`item-${idx}`">
            <td>{{item.name}}</td>
            <td>{{item.name}}</td>
            <td>{{item.name}}</td>
            <td>{{item.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <my-canvas style="width:100%;height:100%">
    </my-canvas>
  </div>
</template>
<script>
import MyCanvas from '@/components/MyCanvas.vue'

export default {
  name: "Header",
  components: {
    MyCanvas
  },
  data() {
    return {
      listItems : {
        titlename : [
          "프로젝트명","투입기간","수행업무","참여도","Documenttype","CrossBrwosing","적용범위","비고"
        //  ,"titlename2" : ["모바일","접근성","반응형","Script"]
        ]
        ,name : 'sori'
      },
      mainStyle : {
        backgroundImage: 'url(http://films.bybrettjohnson.com/img/tn-aquarium.gif)'
      }
    }
  },
  mounted() {
    this.heightResize()
  },
  methods: {
    heightResize() {
      let wh = window.innerHeight
      let mainh = this.$refs.mainMovie
      mainh.style.height  = wh + 'px'
    }
  },
}
</script>
<style lang="scss">
a, li {
  color: white;
  list-style: none;
  text-decoration: none;
}
.header {
  position: relative;
  max-width: 1200px;
  margin: auto;
  line-height: 70px;
  z-index: 2;
  img {
    vertical-align: middle;
  }
  .logo {
    opacity: 0.7;
    font-size: 30px;
    font-weight: bolder;
  }
}
.mainMovie {
  min-height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

/* 프로젝트 리스트 */
<template>
  <div 
    ref="projects" 
    class="container projects" 
    :style="[mainStyle]"
  >
    <div class="mainWrap">
      <h1>My project list</h1>
      <div class="mainTable">
        <div class="tableWrap">
          <table>
            <thead>
              <tr>
                <td v-for="(item, idx) in project.titlename" :key="`item-newmain-${idx}`">{{project.titlename[idx]}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in projectListVal.items" :key="`item-newmain-${idx}`">
                <td>{{item.name}}</td>
                <td v-html=item.date>{{item.date}}</td>
                <td>{{item.workspace}}</td>
                <td>{{item.language}}</td>
                <td v-html=item.role></td>
                <td class="center">{{item.type}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import prjecList from '../static/prjecList.json'

export default {
  data(){
    return{
      project:prjecList,
      mainStyle : {
        backgroundImage: 'url(http://films.bybrettjohnson.com/img/tn-aquarium.gif)'
      }
    }
  }, 
  computed:{
    projectListVal : function(){
      this.project.items.forEach(data => {
        if(data.role){
          data.date = data.date.replace(/\\n/g, '<br/>');
          data.role = data.role.replace(/\\n/g, '<br/>');
        }
      });
      return this.project;
    }
  },
  mounted() {
    // this.heightResize()
  },
  methods: {
    heightResize() {
      let wh = window.innerHeight
      let mainh = this.$refs.projects
      mainh.style.height  = wh + 'px'
    }
  },
}
</script>
// scoped 속성을 가지고있을 때, CSS는 현재 컴포넌트의 엘리먼트에만 적용
<style lang="scss" scoped>
body {
  overflow-x: hidden;
}
.projects {
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  >.mainWrap {
    max-width: 1000px;
    margin: 0 auto;
    padding: 1em;
  }
}
.mainTable {
  overflow-x: hidden;
  overflow-y: hidden;
  .tableWrap{
    width: calc(100% + 20px);
    height: 60vh;
    overflow-x: scroll;
    overflow-y: scroll;
    webkit-overflow-scrolling: touch;
  }
  table {
    min-width: 50rem;
    background:rgba(255,255,255,0.1);
    border-collapse: collapse;
    thead {
      position: sticky;
      top: 0px;
      background-color: #003d33;
      color: #ffffff;
      font-size: 0.9rem;
      text-align: center;
      line-height: 3em;
      td:nth-child(1) {
        width: 10%;
      }
      td:nth-child(2) {
        width: 10%;
      }
      td:nth-child(3) {
        width: 10%;
      }
      td:nth-child(4) {
        width: 10%;
      }
      td:nth-child(5) {
        width: 50%;
      }
      td:nth-child(6) {
        width: 10%;
      }
    }
    tbody {
      tr {
        line-height: 2em;
        border-bottom: 1px solid white;
        text-align: left;
        font-size: 0.8rem;
      }
    }
  }
}
.center {
  text-align: center;
}
</style>

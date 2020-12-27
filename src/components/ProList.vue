<template>
  <div class="mainTable">
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
            <td>{{item.type}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
<script>
import prjecList from '../static/prjecList.json'

export default {
  data(){
    return{
      project:prjecList
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
  }
}
</script>
<style lang="scss" scoped>
.mainTable {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  table {
    background:rgba(255,255,255,0.1);
    margin-top: 7rem;
    border-collapse: collapse;
    thead {
      border-top: 1px solid white;
      border-bottom: 2px solid white;
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
</style>

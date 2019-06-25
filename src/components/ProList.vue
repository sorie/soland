<template>
  <div class="mainTable">
      <table>
        <col width="15%"/>
        <col width="10%"/>
        <col width="15%"/>
        <col width="10%"/>
        <col width="10%"/>
        <col width="30%"/>
        <col width="10%"/>
        <thead>
          <tr>
            <td>{{project.titlename[0]}}</td>
            <td>{{project.titlename[1]}}</td>
            <td>{{project.titlename[2]}}</td>
            <td>{{project.titlename[3]}}</td>
            <td>{{project.titlename[4]}}</td>
            <td>{{project.titlename[5]}}</td>
            <td>{{project.titlename[6]}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in project.items" :key="`item-newmain-${idx}`">
            <td>{{item.name}}</td>
            <td>{{item.date}}</td>
            <td>{{item.work}}</td>
            <td>{{item.percentage}}</td>
            <td>{{item.documenttype}}</td>
            <td>{{item.crossbrowsing}}</td>
            <td>{{item.content}}</td>
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
  }
}
</script>
<style lang="scss" scoped>
.mainTable {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  table {
    margin-top: 7rem;
    border-collapse: collapse;
    thead {
      border-top: 1px solid white;
      border-bottom: 2px solid white;
      text-align: center;
      line-height: 3em;
      td {
        // border: 1px solid red;
      }
    }
    tbody {
      tr {
        line-height: 2em;
        border-bottom: 1px solid white;
        text-align: center;
      }
    }
  }
}
</style>

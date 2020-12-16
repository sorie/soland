<template>
  <div class="mainTable">
      <table>
        <thead>
          <tr>
            <td v-for="(item, idx) in project.titlename" :key="`item-newmain-${idx}`">{{project.titlename[idx]}}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in project.items" :key="`item-newmain-${idx}`">
            <td>{{item.name}}</td>
            <td>{{item.date}}</td>
            <td>{{item.workspace}}</td>
            <td>{{item.language}}</td>
            <td>{{item.role}}</td>
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

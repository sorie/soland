<template>
  <div class="main">
    <div class="main__header" id="main__header">
      <router-link to="/Main" class="logo">soland</router-link>
      <ul class="menu">
        <router-link to="/Main">list</router-link>
        <router-link to="/about">components</router-link>
      </ul>
      <span class="main__header-hide" v-on:click="headHide"></span>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'Main',
  data() {
    return {
      flog: false
    }
  },
  methods: {
    headHide() {
      if(this.flog == false){
        let target = document.getElementById("main__header")
        // console.log(target.classList);
        target.classList.remove('show')
        target.classList.add('hide')
        return this.flog = true;
      } else if (this.flog == true){
        let target = document.getElementById("main__header")
        target.classList.remove('hide')
        target.classList.add('show')
        return this.flog = false;
      } else {
        console.log("error")
      }
      
    }
  }
}
</script>
<style lang="scss">
.main {
  transition: 1s transform ease-in;
  &__header {
    position: fixed;
    top: 0;
    right: 2rem;
    padding: 10px;
    background-color: rgba(255,255,255,0.5);
    text-align: center;
    z-index: 2;
    animation-name: down;
    animation-duration: 1s;
    @keyframes down {
      from {
        transform: translate(0,-90%);
      }
      to {
        transform: translate(0,0);
      }
    }
    &-hide {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      width: 2em;
      height: 0.3em;
      margin-bottom: 0.2em;
      border-top: 2px solid white;
      border-bottom: 2px solid white;
      cursor: pointer;
    }
    &.show {
      transform: translate(0);
      transition: 1s transform ease-in;
    }
    &.hide {
      transform: translate(0,-90%);
      transition: 1s transform ease-in;
    }
    img {
      vertical-align: middle;
    }
    .logo {
      opacity: 0.7;
      font-size: 30px;
      font-weight: bolder;
    }
    .menu {
      max-width: 1200px;
      line-height: 70px;
      color:red;
      font-weight: 800;
      a {
        cursor: pointer;
        color: red;
        display: inline-block;
        &:not(:last-child){
          margin-right: 10px;
        }
      }
    }
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }
}
</style>

<template>
  <div 
    id="app" 
    class="main"
  >
    <header class="main__header" id="main__header">
      <router-link to="/List" class="logo">SoRi</router-link>
      <ul class="menu">
        <router-link to="/List">List</router-link>
        <router-link to="/Components">Components</router-link>
        <router-link to="/VideoChat">webRTC</router-link>
      </ul>
      <span 
        class="main__header-hide" 
        @click="headHide"
      >
        숨기기
      </span>
    </header>
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Footer
  },
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
.container {
  position: relative;
  width:100%;
  height:100%;
  padding-top: 8em;
  padding-bottom: 8em;
}
.main {
  transition: 1s transform ease-in;
  &__header {
    position: fixed;
    top: 0;
    max-width: 37.5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 1em;
    background-color: rgba(255,255,255,0.5);
    text-align: center;
    z-index: 2;
    animation-name: down;
    animation-duration: 1s;
    @keyframes down {
      from {
        transform: translate(-50%, -90%);
      }
      to {
        transform: translate(-50%, 0%);
      }
    }
    &-hide {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0%);
      width: 2em;
      height: 0.3em;
      margin-bottom: 0.2em;
      border-top: 2px solid white;
      border-bottom: 2px solid white;
      cursor: pointer;
      text-indent: -999em;
    }
    &.show {
      transform: translate(-50%, 0%);
      transition: 1s transform ease-in;
    }
    &.hide {
      transform: translate(-50%,-85%);
      transition: 500ms transform ease-in;
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
      line-height: 2.5;
      font-weight: 800;
      font-size: 1.3rem;
      a {
        display: inline-block;
        color: #db3300;
        cursor: pointer;
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

@media (max-width: 40rem) {
  .main {
    &__header {
      min-width: 80%;
    }
  }
}
</style>

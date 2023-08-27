<template>
    <nav 
      id="gnb-header" 
      :class="{'mode-hide':hideChk,'mode-prev':modePrevChk,'mode-over':modeOverChk}" 
      class="tving-nav navbar is-fixed-top" 
      role="navigation" 
      aria-label="main navigation" 
      ref="nav"
    >
        <div 
          class="container"
        >
            <div 
             class="navbar-brand"
            >
                <nuxt-link 
                  to="/" 
                  class="logo navbar-item" 
                  href="https://bulma.io"
                >
                    <i 
                      class="material-icons"
                    >
                        arrow_back
                    </i>
                </nuxt-link>

                <!-- <nuxt-link to="/live" class="navbar-item">
                    live
                </nuxt-link> -->
            </div>
            <div 
              id="navMenuDocumentation" 
              class="navbar-menu" 
              :class="{'is-active': menuIsActive}"
            >
                <!-- SUB -->
            </div>
        </div>

        <div 
          class="nav-dimm" 
          ref="navdimm"  
          :class="{'is-active': menuIsActive}" 
          @click="toggleMenuState()"
        >
        </div>

    </nav>
</template>

<script>
export default {
    data () {
        return {
            prevPage: '',
            modeOverChk: false,
            modePrevChk: false,
            menuIsActive: false,
            hideChk: true,
        }
    },
    mounted() {
        this.routeChange(this.$route)
    },
    methods: {
        routeChange (to) {
            if (to.path == '/') {
                this.hideChk = true
            } else {
                this.hideChk = false
            }
        }
    },
    watch:{
        $route (to, from){
            this.routeChange(to)
        }
    } 
}
</script>

<style lang="scss" scoped>
.navbar {
    background-color: transparent;
    opacity: 1;
    transition: .3s;
    transform: translate(0, 0);
    pointer-events: none;
    z-index: 900;

    &:before {
        content: '';
        pointer-events: none;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100px;
        z-index: -1;
        // opacity: .8;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
    }
    .navbar-item {
        pointer-events: visible;
    }
    .navbar-item, .navbar-link {
        color: #fff;
    }

    &.mode-hide {
        opacity: 0;
        transform: translate(0, -3.125rem);
    }
    .navbar-brand {
        // @media screen and (min-width: 1280px) {
            margin-left: 0;   
        // }
    }
}
</style>

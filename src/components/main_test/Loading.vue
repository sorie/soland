<template>
  <div class="cjp__ui-loading">
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
</template>

<style lang="scss" scoped>
$color-tvn: #d90000;

.cjp__ui-loading {
    position: absolute;
    z-index: 999;
    pointer-events: none;
    z-index: 100;
    width: 100%;
    height: 30vh;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        position: absolute;
        opacity: 0;
        /* transform: scale(0.8); */
        path,
        rect {
            fill: $color-tvn;
        }
    }

    .loading-2 {
        $duration: 0.7s;
        $size: 2em;
        transform: scale(0.8);
        .spinner * {
            box-sizing: border-box;
        }
        .spinner {
            display: inline-block;
            animation-name: anim-spinner;
            animation-duration: $duration;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            .circle {
                width: $size;
                height: ($size/2);
                overflow: hidden;
            }
            .circle-inner {
                transform: rotate(45deg);
                border-radius: 50%;
                border: ($size/12) solid $color-tvn;
                border-right: ($size/12) solid transparent;
                border-bottom: ($size/12) solid transparent;
                width: 100%;
                height: 200%;
                animation-name: anim-circle-1;
                animation-duration: $duration;
                animation-iteration-count: infinite;
                animation-direction: alternate;
                animation-timing-function: cubic-bezier(0.25, 0.1, 0.5, 1);
            }
            .circle-2 {
                transform: rotate(180deg);
                & .circle-inner {
                    animation-name: anim-circle-2;
                }
            }
            @keyframes anim-circle-1 {
                from {
                    transform: rotate(60deg);
                }
                to {
                    transform: rotate(205deg);
                }
            }
            @keyframes anim-circle-2 {
                from {
                    transform: rotate(30deg);
                }
                to {
                    transform: rotate(-115deg);
                }
            }
            @keyframes anim-spinner {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
        }
    }
}
@keyframes bouncing-loader2 {
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0.2;
        transform: translateY(-16px);
    }
}
</style>
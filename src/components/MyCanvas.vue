<template>
  <div class="my_canvas-wrapper">
    <canvas ref="my_canvas">
    </canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
      provider : {
        context: null
      }
    }
  },
  mounted() {
    this.drawing()
  },
  methods: {
    drawing() {
      let ctx = this.provider.context 
      ctx = this.$refs['my_canvas'].getContext('2d')
      this.$refs['my_canvas'].width = "150"
      this.$refs['my_canvas'].height = "150"
      if(!ctx) return

      ctx.save();
      ctx.clearRect(0, 0, this.$refs['my_canvas'].parentElement.clientWidth, this.$refs['my_canvas'].parentElement.clientHeight);

      ctx.strokeStyle = "#fe0062";
      ctx.fillStyle = "#fe0062";
      ctx.fillStyle = "rgba(255,255,255,.4)";

      ctx.beginPath();
      ctx.arc(75, 75, 75, 0, 2 * Math.PI, false);
      ctx.fill();

      //make play button
      ctx.fillStyle = "rgba(255,255,255,.8)";

      ctx.beginPath();
      ctx.moveTo(50, 28);
      ctx.lineTo(50, 125);
      ctx.lineTo(125, 75);
      ctx.fill();
    }
  },

}
</script>
<style lang="scss">
.my_canvas-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
}
canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  cursor: pointer;
  animation: smooth 1 timing-function delay iteration-count direction fill-mode;
}
</style>
<template>
<div class="resize-pane" :class="{'dragging':dragging}"
     :style="{ width: split + 'px' }"
     @mousemove="dragMove"
     @mouseup="dragEnd"
     @mouseleave="dragEnd"
     >
  <slot></slot>
  <div class="dragger"
       @mousedown.prevent="dragStart"
       ></div>
</div>

</template>

<script type="text/babel">
module.exports =  {
  name: 'resize-panel',
  props: {
    value: {
      type: [
        String,
        Number
      ],
      default: 0
    },
    min:{
      type: [
        String,
        Number
      ],
      default: -1
    }
  },
  data() {
    return {
      split: 50,
      dragging: false
    }
  },
  created() {
    this.split = parseFloat(this.value)
  },
  methods: {
    dragStart(e) {
      this.dragging = true
      this.startX = e.pageX
      this.startSplit = this.split
    },
    dragMove(e) {
      if (this.dragging) {
        const dx = e.pageX - this.startX
        let w = this.startSplit + Math.ceil(dx);
        if(this.min != -1 && w < parseFloat(this.min)){
          w = parseFloat(this.min); 
        } 
        this.split = w;
      }
    },
    dragEnd() {
      this.$emit('input', this.split)
      this.dragging = false
    }
  },
  watch: {
    value(val) {
      this.split = parseFloat(val)
    }
  }
}

</script>

<style>
.resize-pane {
  height: 100%;
  width: 100%;
  position: relative;
  border-right:1px solid #e2e2e2;;
  &.dragging {
    cursor: 'col-resize';

    .dragger{
      right: -20px;
      width: 40px;
      
    }
  }
  .dragger {
    position: absolute;
    z-index: 99;
    top: 0;
    bottom: 0;
    right: -2px;
    width: 4px;
    cursor: ew-resize;
  }
}
</style>

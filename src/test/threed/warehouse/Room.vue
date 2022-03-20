<template>
  <div ref="contain">
      <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { WebGLRenderer, Scene, PerspectiveCamera, Mesh } from 'three';
import { initThreed, initBox } from './Index';

export default{
    data(): {scene:Scene,camera:PerspectiveCamera,renderer:WebGLRenderer,cube:Mesh,frametime:number} {
        return {
            scene,
            camera,
            renderer,
            cube,
            frametime: 0,
        }
    },
    mounted():void {
        const {renderer,scene,camera}=initThreed(this.$refs.contain, this.$refs.canvas)
        this.renderer=renderer
        this.scene=scene
        this.camera=camera
        //initThreed(document.getElementById('contain'), document.getElementById('canvas'), this.renderer, this.scene, this.camera)
        this.cube= initBox();
        this.scene.add(this.cube);
        this.frametime = this.animate(this.frametime);
    },
    unmounted():void {
        cancelAnimationFrame(this.frametime);
    },
    methods: {
        animate():void {
            this.frametime = requestAnimationFrame(this.animate());
            this.renderer.render(this.scene,this.camera)
            this.cube.rotation.x+=0.01;
            this.cube.rotation.y+=0.01;
        }
    }
}
</script>

<style lang="scss" scoped>
#id{
    width: 100%;
    height: 100%;
    #canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
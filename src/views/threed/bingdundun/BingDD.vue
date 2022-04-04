<template>
  <div ref="contain" id="contain">
      <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import type { WebGLRenderer, Scene, PerspectiveCamera } from 'three';
import type { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { defineComponent} from 'vue'
import { initModelTest} from './Index';
//import { initAllDirectionLight } from '../light/direlight/Index'
import {initAllSpotLight} from '../public/light/spotlight/Index'
import {initThreed} from '../public/public'
import type Stats from 'stats.js'
//import type { GUI } from 'dat.gui'
import { addResizeEvent,removeResizeEvent } from '@/plugins/WinResizeEvent'

let scene:Scene,camera:PerspectiveCamera,renderer:WebGLRenderer,frametime:number,control:OrbitControls,stats:Stats;

export default defineComponent({
    mounted(){
        const {
            initScene,initRenderer,initCamera,initOrbitControls,initPhongPlane,initAmbientLight,initDatGui,initStats
            }=initThreed(this.$refs.canvas as HTMLCanvasElement,this.$refs.contain as HTMLDivElement)
        scene=initScene()
        renderer=initRenderer()
        camera=initCamera(0.1,40)
        camera.position.set(0,1.5,2)
        camera.lookAt(0,1,0)
        //cube=initBox()
        //scene.add(cube)
        scene.add(initAmbientLight())
        control=initOrbitControls(camera,this.$refs.contain as HTMLDivElement)
        control.maxDistance=30
        control.minDistance=0.4
        //聚光灯
        // const light:DirectionalLight=initDirectionalLight()
        // light.position.set(1,2,2)
        //scene.add(light)
        //scene.add(initAllDirectionLight())
        scene.add(initAllSpotLight())
        //scene.add(initSpotLightHelper(light))
        //scene.add(initGridHelper(10,10))
        //scene.add(initShadowPlan(10))
        scene.add(initPhongPlane(10))
        // initModel('/bdd/scene.gltf').then(res=>{
        //     scene.add(res)
        // }).catch(err=>{
        //     alert(err)
        // })
        const dat=initDatGui(this.$refs.contain as HTMLDivElement)
        dat.addColor(scene,"background")
        stats=initStats(this.$refs.contain as HTMLDivElement)
        initModelTest("/bdd/scene.gltf").then(res=>{
            scene.add(...res)
        }).catch(err=>{
            alert(err)
        })
        this.animate()
        addResizeEvent(this.winResize)
    },
    unmounted(){
        cancelAnimationFrame(frametime)
        removeResizeEvent(this.winResize)
    },
    methods:{
        animate(){
            frametime=requestAnimationFrame(this.animate)
            renderer.render(scene,camera)
            // cube.rotation.x+=0.01
            // cube.rotation.y+=0.01
            stats.update()
            control.update()
        },
        winResize(){
            //console.log("触发Resize")
            camera.aspect=window.innerWidth/window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth,window.innerHeight)
        }
    }
})

// export default{
//     mounted():void {
//         const {renderer,scene,camera}=initThreed(this.$refs.contain, this.$refs.canvas)
//         this.renderer=renderer
//         tscene=scene
//         this.camera=camera
//         //initThreed(document.getElementById('contain'), document.getElementById('canvas'), this.renderer, this.scene, this.camera)
//         tcube= initBox();
//         tscene.add(tcube);
//         this.animate();
//     },
//     unmounted():void {
//         //cancelAnimationFrame(this.frametime);
//     },
//     methods: {
//         animate():void {
//             //ToRender(tscene,this.renderer,this.camera)
//             this.frametime = requestAnimationFrame(this.animate);
//             this.renderer.render(tscene,this.camera)
//             tcube.rotation.x+=0.01;
//             tcube.rotation.y+=0.01;
//         }
//     }
// }
</script>

<style lang="scss" scoped>
#contain{
    width: 100%;
    height: 100%;
    position: absolute;
    #canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
import {Scene,WebGLRenderer,PerspectiveCamera,AmbientLight,GridHelper,ShadowMaterial, PlaneBufferGeometry, Mesh,
  MeshPhongMaterial,Color,
  BasicShadowMap} from 'three'
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui'
import Stats from 'stats.js'

interface useThree{
  initScene:()=>Scene;
  initRenderer:()=>WebGLRenderer;
  initCamera:(near:number,far:number)=>PerspectiveCamera;
  initAmbientLight:()=>AmbientLight;
  initOrbitControls:(camera:PerspectiveCamera,dom:HTMLDivElement)=>OrbitControls
  initGridHelper:(size:number,divisions : number)=>GridHelper
  initShadowPlan:(size:number)=>Mesh
  initPhongPlane:(size:number)=>Mesh
  initDatGui:(dom:HTMLDivElement)=>GUI
  initStats:(dom:HTMLDivElement)=>Stats
}

export function initThreed(canvas:HTMLCanvasElement,dom:HTMLDivElement):useThree{

  const initScene=function(){
    const scene=new Scene()
    scene.background=new Color(0x90ee90)
    return scene
  }

  const initRenderer=function(){
    const renderer=new WebGLRenderer({canvas:canvas})
    renderer.setSize(canvas.clientWidth,canvas.clientHeight)
    renderer.shadowMap.enabled=true
    renderer.shadowMap.type=BasicShadowMap
    return renderer;
  }

  const initCamera=function(near:number,far:number){
    const camera=new PerspectiveCamera(75,canvas.clientWidth/canvas.clientHeight,near,far)
    return camera
  }
  const initAmbientLight=function():AmbientLight{
    const alight=new AmbientLight(0x404040)
    return alight
  }

  const initOrbitControls=function(camera:PerspectiveCamera,dom:HTMLDivElement):OrbitControls{
    const control=new OrbitControls(camera,dom)
    control.enableDamping=true
    control.dampingFactor=0.05
    return control
  }

  const initGridHelper=function(size:number,divisions : number):GridHelper{
    return new GridHelper(size,divisions)
  }

  const initShadowPlan=function(size:number):Mesh{
    const geo=new PlaneBufferGeometry(size,size)
    const mat=new ShadowMaterial({color:0x000000,opacity:0.4})
    const plan=new Mesh(geo,mat)
    plan.rotateX(-Math.PI/2)
    plan.receiveShadow=true
    return plan
  }

  const initPhongPlane=function(size:number):Mesh{
    const geo=new PlaneBufferGeometry(size,size)
    const mat=new MeshPhongMaterial({color:0xff0000})
    const plan=new Mesh(geo,mat)
    plan.rotateX(-Math.PI/2)
    plan.receiveShadow=true
    return plan
  }

  const initDatGui=function():GUI{
    const dat=new GUI()
    dat.addFolder("测试GUI")
    dat.domElement.style.position = 'absolute'
    dat.domElement.style.right = '0px'
    dat.domElement.style.top = '0px'
    dom.appendChild(dat.domElement)
    return dat
  }

  const initStats=function():Stats{
    const stats=new Stats()
    stats.dom.style.position="absolute"
    stats.dom.style.left="0px"
    stats.dom.style.top="0px"
    dom.appendChild(stats.dom)
    return stats
  }
  return {
    initScene,initRenderer,initCamera,initAmbientLight,initOrbitControls,initGridHelper,initShadowPlan,initPhongPlane,initDatGui,initStats
  }
}
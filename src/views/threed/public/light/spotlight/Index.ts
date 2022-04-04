import {Group, SpotLight,SpotLightHelper} from 'three'
import { initCameraHelper } from '../public'

const initSpotLight=function():SpotLight{
  const spotLight=new SpotLight(0xffffff,1,8,Math.PI/4,0.4,1)
  //spotLight.angle=Math.PI/4

  spotLight.shadow.mapSize.width = 512;
  spotLight.shadow.mapSize.height = 512;

  spotLight.shadow.camera.near = 0.1;
  spotLight.shadow.camera.far = 8;
  spotLight.shadow.camera.fov = 45;
  spotLight.castShadow=true

  return spotLight
}

const initSpotLightHelper=function(light:SpotLight):SpotLightHelper{
  return new SpotLightHelper(light)
}

const initAllSpotLight=function():Group{
  const obj=new Group()
  const light=initSpotLight()
  light.position.set(1,2,2)
  obj.add(light)
  obj.add(initSpotLightHelper(light))
  obj.add(initCameraHelper(light))
  return obj
}
export {initAllSpotLight,initSpotLight,initSpotLightHelper}
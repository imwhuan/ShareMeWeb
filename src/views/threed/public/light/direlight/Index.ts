import {DirectionalLight,DirectionalLightHelper, Group} from 'three'
import { initCameraHelper } from '../public'


const initDirectionalLight=function():DirectionalLight{
  const light=new DirectionalLight()
  light.castShadow=true
  light.shadow.mapSize.width = 512; // default
  light.shadow.mapSize.height = 512; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 8; // default
  light.shadow.camera.left=-4
  light.shadow.camera.right=4
  light.shadow.camera.top=4
  light.shadow.camera.bottom=-4
  //light.shadow.camera.updateProjectionMatrix()
  return light
}
const initDirectionalLightHelper=function(light:DirectionalLight):DirectionalLightHelper{
  return new DirectionalLightHelper(light)
}
const initAllDirectionLight=function():Group{
  const obj=new Group()
  const light=initDirectionalLight()
  light.position.set(1,2,2)
  obj.add(light)
  obj.add(initDirectionalLightHelper(light))
  obj.add(initCameraHelper(light))
  return obj
}
export {initAllDirectionLight,initDirectionalLight,initDirectionalLightHelper}
import {CameraHelper} from 'three'
import type { Light } from 'three'

const initCameraHelper=function(light:Light):CameraHelper{
  return new CameraHelper(light.shadow.camera)
}

export {initCameraHelper}
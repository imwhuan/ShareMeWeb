import { WebGLRenderer,Scene,PerspectiveCamera, BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

/**
 * 初始化threejs场景
 * @param dom div容器
 * @param canvas canvas画布
 * @param renderer 渲染器
 * @param scene 场景
 * @param camera 相机
 */
/**
 * 
 * @param dom div容器
 * @param canvas canvas画布
 * @returns 渲染器/场景/相机
 */
const initThreed = function(dom:HTMLDivElement,canvas:HTMLCanvasElement):{renderer:WebGLRenderer,scene:Scene,camera:PerspectiveCamera}{
    const scene=new Scene()
    const camera=new PerspectiveCamera(75,dom.clientWidth/dom.clientHeight,0.1,1000)
    const renderer=new WebGLRenderer({canvas:canvas})
    renderer.setSize(dom.clientWidth,dom.clientHeight)
    return {"renderer":renderer,"scene":scene,"camera":camera}
}
/**
 * 创建一个盒子
 * @returns 盒子
 */
const initBox = function():Mesh {
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    cube.position.z=-5;
    return cube;
}
export {initThreed,initBox}
import { Box3, BoxGeometry, Mesh, Vector3,MeshLambertMaterial, Object3D,Quaternion, Box3Helper, Group } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

/**
 * 创建一个盒子
 * @returns 盒子
 */
const initBox = function():Mesh {
    const geometry = new BoxGeometry();
    const material = new MeshLambertMaterial( { color: 0x00ff00 } );
    const cube = new Mesh( geometry, material );
    cube.position.z=-1;
    cube.position.y=1;
    cube.castShadow=true
    return cube;
}

const initModel=function(path:string):Promise<Object3D>{
    const loader= new GLTFLoader()
    const res=new Promise<Object3D>((resolve,reject)=>{
        loader.load(path,(gltf)=>{
            const box=new Box3();
            const vec3=new Vector3();
            box.setFromObject(gltf.scene);
            //修改模型，使得其中心在0，0且底部在水平线上
            box.getCenter(vec3);
            vec3.multiplyScalar(-1);
            vec3.setY(vec3.y+(box.max.y-box.min.y)/2);
            //将位置偏移应用到模型子元素上，防止缩放模型时偏移量错误
            //gltf.scene.position.addScaledVector(vec3,-1);
            //gltf.scene.castShadow=true
            //gltf.scene.receiveShadow=true
            // for(let i=0;i<gltf.scene.children.length;i++){
            //     gltf.scene.children[i].position.add(vec3);
            //     gltf.scene.children[i].castShadow=true
            //     gltf.scene.children[i].receiveShadow=true
            //     //gltf.scene.children[i].position.addScaledVector(vec3,-1);
            // }
            // return resolve(gltf.scene)
            const quater= new Quaternion()
            gltf.scene.children[0].children[0].children[0].getWorldQuaternion(quater)
            gltf.scene.children[0].children[0].children[0].setRotationFromQuaternion(quater)
            const helpergroup=new Group()
            for(let i=0;i<gltf.scene.children[0].children[0].children[0].children.length;i++){
                gltf.scene.children[0].children[0].children[0].children[i].position.add(vec3);
                const tbox=new Box3()
                tbox.setFromObject(gltf.scene.children[0].children[0].children[0].children[i])
                const helper=new Box3Helper(tbox)
                helper.name="第"+i+"个盒子"
                helpergroup.add(helper)
                //gltf.scene.children[0].children[0].children[0].children[i].castShadow=true
                //gltf.scene.children[0].children[0].children[0].children[i].receiveShadow=true
                //gltf.scene.children[i].position.addScaledVector(vec3,-1);
            }
            gltf.scene.children[0].children[0].children[0].traverseVisible(obj=>{
                obj.castShadow=true
            })
            gltf.scene.children[0].children[0].children[0].add(helpergroup)
            console.log("模型",gltf.scene.children[0].children[0].children[0])
            return resolve(gltf.scene.children[0].children[0].children[0])
        }, ({ loaded, total }) => {
            console.log(`进度：${Math.floor(loaded / total * 100)}`)
        },err=>{
            return reject(err.message)
        })
    })
    return res
}

const initModelTest=function(path:string):Promise<Array<Object3D>>{
    const loader= new GLTFLoader()
    const res=new Promise<Array<Object3D>>((resolve,reject)=>{
        loader.load(path,(gltf)=>{
            const box=new Box3();
            const vec3=new Vector3();
            box.setFromObject(gltf.scene);
            //修改模型，使得其中心在0，0且底部在水平线上
            box.getCenter(vec3);
            vec3.multiplyScalar(-1);
            vec3.setY(vec3.y+(box.max.y-box.min.y)/2);
            //将位置偏移应用到模型子元素上，防止缩放模型时偏移量错误
            //gltf.scene.position.addScaledVector(vec3,-1);
            //gltf.scene.castShadow=true
            //gltf.scene.receiveShadow=true
            // for(let i=0;i<gltf.scene.children.length;i++){
            //     gltf.scene.children[i].position.add(vec3);
            //     gltf.scene.children[i].castShadow=true
            //     gltf.scene.children[i].receiveShadow=true
            //     //gltf.scene.children[i].position.addScaledVector(vec3,-1);
            // }
            // return resolve(gltf.scene)
            const quater= new Quaternion()
            gltf.scene.children[0].children[0].children[0].getWorldQuaternion(quater)
            gltf.scene.children[0].children[0].children[0].setRotationFromQuaternion(quater)
            const xuerr=[2,3,5,6,7,8,9,10]
            const xuerrgroup=new Group()
            const bingddgroup=new Group()
            for(let i=0;i<gltf.scene.children[0].children[0].children[0].children.length;i++){
                gltf.scene.children[0].children[0].children[0].children[i].position.add(vec3);
                const tbox=gltf.scene.children[0].children[0].children[0].children[i].clone()
                if(xuerr.includes(i)){
                    xuerrgroup.add(tbox)
                }
                else{
                    bingddgroup.add(tbox)
                }
                // tbox.position.set(x,2,-4)
                // tbox.name="第"+i+"个盒子"
                // helpergroup.add(tbox)
                // const line=new LineCurve3(gltf.scene.children[0].children[0].children[0].children[i].position,tbox.position)
                // const linegeo=new BufferGeometry().setFromPoints(line.getPoints())
                // helpergroup.add(new Line(linegeo,linemat))
                //gltf.scene.children[0].children[0].children[0].children[i].castShadow=true
                //gltf.scene.children[0].children[0].children[0].children[i].receiveShadow=true
                //gltf.scene.children[i].position.addScaledVector(vec3,-1);
            }
            bingddgroup.position.setX(-2)
            xuerrgroup.position.setX(2)
            gltf.scene.children[0].children[0].children[0].traverseVisible(obj=>{
                obj.castShadow=true
            })
            console.log("模型",gltf.scene.children[0].children[0].children[0])
            return resolve([gltf.scene.children[0].children[0].children[0],bingddgroup,xuerrgroup])
        }, ({ loaded, total }) => {
            console.log(`进度：${Math.floor(loaded / total * 100)}`)
        },err=>{
            return reject(err.message)
        })
    })
    return res
}

export {initBox,initModel,initModelTest}
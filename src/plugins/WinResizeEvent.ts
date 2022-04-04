const events:Array<()=>void>=[]

const addResizeEvent=function(ev:()=>void):void{
  events.push(ev)
  console.log("添加事件")
}
const removeResizeEvent=function(ev:()=>void):void{
  const index= events.indexOf(ev)
  if(index>-1){
    events.splice(index,1)
    console.log("移除事件")
  }
}
window.addEventListener("resize",()=>{
  events.forEach(ev => {
    ev()
  });
})

export {addResizeEvent,removeResizeEvent}
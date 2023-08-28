export const CANVAS_ID = "canvas"
export const TEXTHEIGHT = 12

const getCanvas = () => document.getElementById(CANVAS_ID)

export const getDimensions = () => ({width: Number(getCanvas().getAttribute('width')), height: Number(getCanvas().getAttribute('height'))})

export const getTextWidth = (text) => getCanvas().getContext('2d').measureText(text).width

const getColor = (value) => value!==undefined ? (value ? 'green' : 'red') : 'black'  

const tf = (v,x,zoom) => ((v*zoom)+x)

const tfLine = (line,zoom,{x,y}) => ({x1:tf(line.x1,x,zoom),x2:tf(line.x2,x,zoom),
  y1:tf(line.y1,y,zoom),y2:tf(line.y2,y,zoom)})

const tfCords = (cords,zoom,{x,y}) => ({x:tf(cords.x,x,zoom),y:tf(cords.y,y,zoom)})

const drawLine = (ctx,{x1,x2,y1,y2},value) => {
  ctx.beginPath()
  ctx.strokeStyle = getColor(value)
  ctx.moveTo(x1,y1+3)
  ctx.lineTo(x2,y2+3)
  ctx.stroke()
}  

const drawFormula = (ctx,text,cords) => {
  ctx.fillStyle = getColor(undefined)
  ctx.fillText(text,cords.x,cords.y)
}

const drawNode = (ctx,coordinates,zoom,node) => {
  drawLine(ctx,tfLine(node.line,zoom,coordinates),node.value)
  if(node.branch)
    drawFormula(ctx,node.text,tfCords(node.cords,zoom,coordinates))
}

export const resetTextHeight = () => getCanvas().getContext('2d').font = TEXTHEIGHT.toString().concat('px Arial')

export const drawTree = (tree,zoom,coordinates) => {
  if(tree && tree.nodes) {
    const ctx = getCanvas().getContext('2d')
    const {width,height} = getDimensions()
    ctx.clearRect(0,0,width,height)
    let stack=[0]
    ctx.font = Math.floor(TEXTHEIGHT * zoom).toString().concat('px Arial')
    while(stack.length>0) {
      const next = stack.pop()
      drawNode(ctx,coordinates,zoom,tree.nodes[next])
      stack = stack.concat(tree.nodes[next].edges)
    }
    ctx.font = TEXTHEIGHT.toString().concat('px Arial')
  }
}
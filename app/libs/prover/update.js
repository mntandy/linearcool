import {insertAt,replaceArrInArr,zip} from '../helpers'
import {cloneNode} from './node'
import { getTextWidth, TEXTHEIGHT } from '../canvas'
import findOverlap from './findoverlap'

const getStraightLine = (x,y,width,extra) => 
  ({x1:x,y1:y,x2:x+width+extra,y2:y})

const getRootCords = (textWidth) => ({x:0-textWidth/2, y:0-10 })

const setRootProperties = (node,width,cords) => ({...node,width,cords,line:getStraightLine(cords.x,cords.y, width, 0),distance:width})

const updateWidth = (node,width,dimensions) => 
  setRootProperties(node,width,getRootCords(width,dimensions))

const updateRoot = (node) => updateWidth(node,getTextWidth(node.text))

const nodeDistance = (node) => node.distance || node.width

const increaseDistance = (node,i) => 
  cloneNode(node,{distance:nodeDistance(node)+i})

const updateCommonAncestor = (nodes,currentNodeId,i) =>
  [...insertAt(nodes,increaseDistance(nodes[currentNodeId],i),currentNodeId)]

const firstEdge = (nodes,parent) => nodes[nodes[parent].edges[0]]

const updateCordsWithLine = (x,y,lineX,width,extra=0) => {
  return ({cords:{x,y},line:getStraightLine(lineX,y,width,extra)})
}
const updateBinaryOption = (nodes,currentNodeId,[n0,n1],x,y) => {
  const n0props = updateCordsWithLine(x,y,x,nodeDistance(nodes[currentNodeId])/2+nodes[n0].width)
  const n1props = updateCordsWithLine(x+nodes[n0].width+nodeDistance(nodes[currentNodeId]),y,
  x+nodes[n0].width+nodeDistance(nodes[currentNodeId])/2,nodeDistance(nodes[currentNodeId])/2+nodes[n1].width)
  return [{...nodes[n0],...n0props},{...nodes[n1],...n1props}]
}

const updateUnaryOption = (nodes,currentNodeId,n0,x,y) => {
  const cords = {x:x+nodes[n0].width,y}
  const line = getStraightLine(x+nodes[n0].width,y,nodes[n0].width,0)
  return [{...nodes[n0],cords,line}]
}
  
const updateOption = (nodes,currentNodeId,edgesId,x,y) => 
  edgesId.length===1 ?
    updateUnaryOption(nodes,currentNodeId,edgesId[0],x,y)
    : updateBinaryOption(nodes,currentNodeId,edgesId,x,y)

const getXFromCords = ({width,cords}) => cords.x+(width/2)

const getYFromCords = ({cords}) => cords.y-TEXTHEIGHT-2

const getNodeCenter = (node,firstchild) => firstchild.width+(nodeDistance(node)/2)

const updateSingleOption = (nodes,currentNodeId) => {
  const ret = updateOption(nodes,currentNodeId,nodes[currentNodeId].edges,
    getXFromCords(nodes[currentNodeId])-getNodeCenter(nodes[currentNodeId],nodes[nodes[currentNodeId].edges[0]]),
    getYFromCords(nodes[currentNodeId]))
  return replaceArrInArr(nodes,ret,nodes[currentNodeId].edges.at(0))
}

const updateOptionLine = (option,originalX,y,currentX,distance,firstchildwidth) => 
  ({...option,line:{x1:originalX,y1:y,x2:currentX+firstchildwidth+(distance/2),y2:y-distance}})

const getTotalLengthOfOneOption = (nodes,nodeId,distance) => 
  nodes[nodeId].edges.reduce((total,node) => total+nodes[node].width,0)+(distance || 0)

const getNextX = (nodes,distance) => (acc,cur,curI) => {
  return acc.concat(
  (acc[curI]+distance+getTotalLengthOfOneOption(nodes,cur,distance)))
}

const flattenOptions = (nodes,nodeId) => nodes[nodeId].edges.flatMap(x => [x,...nodes[x].edges])

const getTotalLengthOfMultipleOptions = (nodes,nodeId,distance) => 
  flattenOptions(nodes,nodeId)
    .reduce((total,node) => nodes[node].branch ? total+nodes[node].width : total+(distance*1.5),0)

const getFirstX = (nodes,nodeId,distance) => {
  return getXFromCords(nodes[nodeId])-(getTotalLengthOfMultipleOptions(nodes,nodeId,distance)/2)
}

const getAllX = (nodes,nodeId) => {
  return nodes[nodeId].edges.slice(0,-1).reduce(getNextX(nodes,nodeDistance(nodes[nodeId])),
    [getFirstX(nodes,nodeId,nodeDistance(nodes[nodeId]))])
}

const processPairOfXAndOption = (nodes,nodeId,x,y) => {
  return ([nextX,option]) => {
    return [updateOptionLine(nodes[option],x,y,nextX,nodes[nodeId].width,firstEdge(nodes,option).width)]
      .concat(updateOption(nodes,option,nodes[option].edges,nextX,y-nodes[nodeId].width))
  }
}

const updateMultipleOptions = (nodes,currentNodeId) => {
  const ret = zip(getAllX(nodes,currentNodeId),nodes[currentNodeId].edges)
    .flatMap(processPairOfXAndOption(nodes,currentNodeId,
      getXFromCords(nodes[currentNodeId]),getYFromCords(nodes[currentNodeId])))
  return replaceArrInArr(nodes,ret,nodes[currentNodeId].edges.at(0))
}

const hasChildren = (nodes,nodeId) => nodes[nodeId].edges.length>0
const hasBranchChildren = (nodes,nodeId) => hasChildren(nodes,nodeId) && firstEdge(nodes,nodeId).branch
const hasOptionChildren = (nodes,nodeId) => hasChildren(nodes,nodeId) && !firstEdge(nodes,nodeId).branch

const updateCoordinates = (nodes,nodeId) => 
 ((hasBranchChildren(nodes,nodeId) && updateSingleOption(nodes,nodeId)) ||
 (hasOptionChildren(nodes,nodeId) && updateMultipleOptions(nodes,nodeId)) ||
 nodes)

const updateCordsStack =  (nodes,nodeId,stack) => 
  ((hasBranchChildren(nodes,nodeId) && stack.concat(nodes[nodeId].edges)) ||
  (hasOptionChildren(nodes,nodeId) && stack.concat(nodes[nodeId].edges.flatMap(x=> nodes[x].edges))) ||
  stack)

const adjustCordsUpwards = (nodes,nodeId) => {
  let stack = [nodeId]
  let updatedNodes = [...nodes]
  while(stack.length>0) {
    const next = stack.pop()
    updatedNodes = updateCoordinates(updatedNodes,next)
    stack = updateCordsStack(nodes,next,stack)
  }
  return updatedNodes
}

const fixOverlaps = (nodes,nodeId) => {
  let stack = [nodeId]
  let updatedNodes = [...nodes]
  while(stack.length>0) {
    const next = stack.pop()
    const result = findOverlap(updatedNodes,next)
    if (result>-1) {
      stack = stack.concat(result)
      updatedNodes = adjustCordsUpwards(updateCommonAncestor(updatedNodes,result,10),result)
    }
    else 
      stack = updateCordsStack(nodes,next,stack)
  }
  return updatedNodes
}

export { updateRoot, fixOverlaps, adjustCordsUpwards, updateMultipleOptions, updateSingleOption}
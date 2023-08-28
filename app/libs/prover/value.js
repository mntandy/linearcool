import {cloneNode} from './node'
import {adjustCordsUpwards} from './update'
import {insertAt} from '../helpers'

const isNegatedAtomic = (formula) => (formula.length===2 && (formula[0]==='N'))
const isAtomic = (formula) => formula.length===1

const negationFirst = (sequent) => 
  (isNegatedAtomic(sequent.at(0)) &&
  isAtomic(sequent.at(1)) &&
  sequent.at(0).at(1)===sequent.at(1).at(0))

const negationSecond = (sequent) =>
  (isNegatedAtomic(sequent.at(1)) &&
  isAtomic(sequent.at(0)) &&
  sequent.at(1).at(1)===sequent.at(0).at(0))

const checkIfSequentIsAxiom = (sequent) => (sequent.length===2 && 
  (negationFirst(sequent) || negationSecond(sequent)))

const getValueFromBranchChildren = (nodes,children) =>
    ({value:children.every(element => nodes[element].value) ?
      true : children.some(element => nodes[element].value===false) ?
      false : undefined})

const everyEdgeFalse = (nodes,id) => nodes[id].edges.every(element => nodes[element].value===false)

const getTrueEdge = (nodes,id) => nodes[id].edges.find(element => nodes[element].value)

const getValueFromOptionChildren = (nodes,next) => {
  const trueChild = getTrueEdge(nodes,next)
  return trueChild!==undefined ?
    {value:true,edges:[...nodes[trueChild].edges]}
    : {value:everyEdgeFalse(nodes,next) ? false : undefined}
}

const getValueFromChildren = (nodes,next) => 
  cloneNode(nodes[next],(nodes[nodes[next].edges[0]].branch ?
    getValueFromBranchChildren(nodes,nodes[next].edges) 
    : getValueFromOptionChildren(nodes,next,nodes[next].edges)))


const someNodeInFirstIsNotInSecond = (first,second) =>
  first.some(x => !second.includes(x))

const setValueBasedOnChildren = (nodes,nodeId) => {
  let updatedNodes = nodes.map(node => cloneNode(node))
  let parent = nodeId
  while (parent>-1) {
    updatedNodes[parent]=getValueFromChildren(updatedNodes,parent)
    if(someNodeInFirstIsNotInSecond(nodes[parent].edges,updatedNodes[parent].edges)) {
      for(const i of updatedNodes[parent].edges)
      updatedNodes[i].parent=parent
      updatedNodes = adjustCordsUpwards(updatedNodes,parent)
    }
    if(updatedNodes[parent].value===undefined)
      return updatedNodes
    parent = updatedNodes[parent].parent
  }
  return updatedNodes
}

const setNodeValue = (nodes,id,value) => 
  insertAt(nodes.map(node => cloneNode(node)),cloneNode(nodes[id],{value}),id) 

const setValuesBasedOnCurrentNode = (nodes,currentNodeId,parentNodeId) => {
  const isAxiom = checkIfSequentIsAxiom(nodes[currentNodeId].sequent)
  const hasParent = (parentNodeId >= 0)
  if(isAxiom && hasParent)
    return setValueBasedOnChildren(setNodeValue(nodes,currentNodeId,true),parentNodeId)
  else if(isAxiom && !hasParent)
    return setNodeValue(nodes,currentNodeId,true)
  else if(!isAxiom && hasParent)
    return setValueBasedOnChildren(nodes[parentNodeId].edges.reduce((updatedNodes,next) => 
      setNodeValue(updatedNodes,next,false),nodes),parentNodeId)
  else
    return setNodeValue(nodes,currentNodeId,false)
}

const setValues = (nodes,currentNodeId) => setValuesBasedOnCurrentNode(nodes,currentNodeId,nodes[currentNodeId].parent)


export default setValues

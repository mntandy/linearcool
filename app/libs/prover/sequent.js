import {Node,cloneNode} from './node'
import {reduceNextFormula,conjunctionReduction} from './formula'
import { insertAt, skipRange } from '@/app/libs/helpers'
import setValues from './value'
import {updateRoot,fixOverlaps, updateMultipleOptions, updateSingleOption} from './update'
import { getTextWidth } from '../canvas'

const extractConjunctionOptions = (sequent) => sequent.reduce((total,s,i) => {
    return (s[0]==='C') ? total.concat(conjunctionReduction(sequent,s,i)) : total
  },[])

const sequentToString = (sequent) => 
  sequent.reduce((total,x) => total.concat([',']).concat(x),[])
    .slice(1).reduce((total,x) => total.concat(x),'')

const nodeWidth = (node) =>
  node.width===undefined ?
  getTextWidth(node.text)
  : node.width

const addNodeWidth = (node) =>
  ({...node,width:nodeWidth(node)})

const produceBranchNode = (parent, sequent) => 
  addNodeWidth(new Node({parent,branch:true,sequent,text:sequentToString(sequent)}))

const newRoot = (formulaAsText) => updateRoot(produceBranchNode(-1,[formulaAsText.split('')]))

const produceOptionNode = (parent,distance,edges) => 
  new Node({parent,branch:false,distance,edges})

const processOption = (currentNodeId,option) => 
  option.map(sequent => produceBranchNode(currentNodeId,sequent))
  
const getNewNodesForMultipleOptions = (nodes,currentNodeId,options) => 
  options.flatMap((option,curInd)=>
    [produceOptionNode(currentNodeId,nodes[currentNodeId].width,[nodes.length+curInd*3+1,nodes.length+curInd*3+2]),
    ...processOption(nodes.length+curInd*3,option)])

const addEdgesFromArray = (node,arr) =>
  cloneNode(node,{edges:node.edges.concat(arr)})

const processMultipleOptions = (nodes,currentNodeId,options) => {
  const newNodes = getNewNodesForMultipleOptions(nodes,currentNodeId,options)
  const newEdges = skipRange(nodes.length,nodes.length+options.length,3)
  const updatedCurrentNode = addEdgesFromArray(nodes[currentNodeId],newEdges)
  const updatedNodes = [...insertAt(nodes,updatedCurrentNode,currentNodeId),...newNodes]
  return updateMultipleOptions(updatedNodes,currentNodeId)
}

const processSingleOption = (nodes,currentNodeId,option) => {
  const newNodes = processOption(currentNodeId,option)
  const newEdges = [nodes.length,nodes.length+1]
  const updatedCurrentNode = addEdgesFromArray(nodes[currentNodeId],newEdges)
  const updatedNodes = insertAt(nodes,updatedCurrentNode,currentNodeId)
  return updateSingleOption([...updatedNodes,
    ...newNodes],currentNodeId)
}

const processOptions = (nodes,currentNodeId,options) => 
    ((options.length===0 && setValues(nodes,currentNodeId)) ||
    (options.length===1 && processSingleOption(nodes,currentNodeId,options[0])) ||
    (processMultipleOptions(nodes,currentNodeId,options)))

const addSingleBranchNode = (nodes,currentNodeId,nextSequent) => {
  const currentNode = addEdgesFromArray(nodes[currentNodeId],[nodes.length])
  return updateSingleOption(
    [...insertAt(nodes,currentNode,currentNodeId),produceBranchNode(currentNodeId,nextSequent)],
    currentNodeId)
}

const processNextNode = (tree,currentNodeId) => {
  const nextSequent = reduceNextFormula(tree.nodes[currentNodeId].sequent)
  const updatedNodes = nextSequent ? 
    addSingleBranchNode(tree.nodes,currentNodeId,nextSequent)
    : processOptions(tree.nodes,currentNodeId,extractConjunctionOptions(tree.nodes[currentNodeId].sequent))
    return fixOverlaps(updatedNodes,currentNodeId)
}
export {processNextNode,newRoot}

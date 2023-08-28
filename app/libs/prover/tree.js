import {processNextNode,newRoot} from './sequent'
import {isPolishWff} from './formula'

function Tree({nodes,stack}) {
  this.nodes = nodes || []
  this.stack = stack || []
}

const setErrorNoFormula = () => {
  return {error:true,message:"There is no formula. Be brave and type something in the above field."}    
}

const setErrorNotWff = () => {
  return {error:true,message:"The formula is not well-formed. Click the above link for more info."}
}

const setProofFinished = (tree) => {
  return ({...tree,finished:true,message:"The proof is done. The formula is " + (tree.nodes[0].value ? "valid" : "invalid")})
}

const initialiseTree = ({formula}) => {
  if(!formula || formula==="") 
    return setErrorNoFormula()
  if (!isPolishWff(formula.split('')))
    return setErrorNotWff()
    
  return new Tree({nodes:[newRoot(formula)],stack:[0]})
}

const updateStack = (stack,oldLength,updatedNodes,stackIndex) =>
  [...stack.slice(0,stackIndex),...updatedNodes.slice(oldLength).flatMap(
  (n,i) => (n.branch && [i+oldLength]) || [])]
    
const getNextTree = (tree,stackIndex) => {
  const updatedNodes = processNextNode(tree,tree.stack.at(stackIndex))
  const updatedStack = updateStack(tree.stack,tree.nodes.length,updatedNodes,stackIndex)
  const updatedTree = {...tree,nodes:updatedNodes,stack:updatedStack}
  return updatedStack.length ?
    updatedTree
    : setProofFinished(updatedTree)
}

const getIndexOfFirstNodeInStackWithoutValue = ({nodes,stack}) => {
  for(var i=stack.length-1;i>=0;i--)
    if(nodes[stack.at(i)].value===undefined)
      return i
  return undefined
}

const nextStep = (tree) => {
  if(!tree)
      return {error:true,message:"No proof initialised."}
  const nextStackIndex = getIndexOfFirstNodeInStackWithoutValue(tree)
  return nextStackIndex===undefined ? 
    setProofFinished(tree)
    : getNextTree(tree,nextStackIndex)
}  

const treeReducer = (state, action) => {
  switch (action.type) {
    case "initialise": return initialiseTree(action.payload)
    case "forward": return nextStep(state)
    case "reset": return null
    default: return state
  }
}
export default treeReducer
const getParentsOfEachNode = (nodes,pair) => pair.map(id => nodes[id].parent)
 
const findFirstCommonBranchAncestor = (nodes,pair) => {
  let parents = getParentsOfEachNode(nodes,pair)
  while(parents[0]!==parents[1] && parent[0]!==0)
      parents = getParentsOfEachNode(nodes,parents)
  return parents[0]
}

const findOverlap = (nodes,nodeId) => {
  let stack=[0]
  while(stack.length>0) {
    const next = stack.pop()

    if(nodes[nodeId].parent===nodes[next].parent 
      ||nodeId===next 
      || !nodes[next].branch 
      || nodes[next].line.y1>nodes[nodeId].line.y1)
      stack = stack.concat(nodes[next].edges)
    else if(nodes[next].line.y1===nodes[nodeId].line.y1 &&
        ((nodes[next].line.x1<=nodes[nodeId].line.x1 && nodes[nodeId].line.x1<=nodes[next].line.x2) ||
        (nodes[next].line.x1<=nodes[nodeId].line.x2 && nodes[nodeId].line.x2<=nodes[next].line.x2))) 
        {
      return findFirstCommonBranchAncestor(nodes,[next,nodeId])
    }
  }
  return -1
}

export default findOverlap
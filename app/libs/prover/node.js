
function Node({parent,branch,sequent,text,width,distance,line,cords,edges,value}) {
  this.parent = parent
  this.branch = branch
  this.sequent = sequent || []
  this.edges = edges || []
  this.text = text
  this.width = width
  this.cords = cords
  this.distance = distance
  this.line = line
  this.value = value
}

const cloneNode = (node,change) => ({
  ...node,
  sequent:node.sequent.map(f => [...f]),
  edges:[...node.edges],
  cords:{...node.cords},
  line:{...node.line},
  ...change})
  

export {Node,cloneNode}
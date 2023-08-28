const deMorganTransform  = new Map([['C','D'],['D','C']])

const isLowerCase = (character) =>  (character.charCodeAt() >= 97 && character.charCodeAt() <= 122)

const isBinaryConnective = (character) => (character==='C' || character==='D')
const isUnaryConnective = (character) => (character==='N')
const isNegated = (formula) => (formula[0]==='N')
const isDisjuncted = (formula) => (formula[0]==='D')
  
const adjustCounter = (character,counter) => 
  isBinaryConnective(character) ? counter+1 
  : isLowerCase(character) ? counter-1 
  : isUnaryConnective(character) ? counter 
  : undefined
  
const isPolishWff = (formula) => {
  let counter = 1
  let index = -1
  while ((++index)<formula.length)
    counter = adjustCounter(formula[index],counter)
  
  return (counter === 0) ? true : false
}

const polinf = new Map([['D',"\u214B"],['C',"\u0026"]])
const infpol = new Map([["\u214B",'D'],["\u0026",'C']])

const polishToInfix = (input) => 
  input.reverse().reduce((result,next,i) => {
    if (isLowerCase(next))
      return result.concat(next)
    else if(isUnaryConnective(next))
      return result.slice(0,-1).concat(next + result.at(-1))
    else if(isBinaryConnective(next)) {
      const form = result.at(-1)+polinf.get(next)+result.at(-2)
      return (input.length-1)>i? result.slice(0,-2).concat("(" + form + ")") : [form]
    }
    return result
  },[]).at(0)

const infixToPolish = (input) =>
  input.reverse().reduce(([formulas,operators],next,i) => {
    if (next===')' || isLowerCase(next))
      return [formulas.concat(next),operators]
    else if (["\u214B","\u0026"].includes(next))
      return [formulas,operators.concat(next)]
    else if (next==='N')
      return [formulas.slice(0,-1).concat(next + formulas.at(-1)),operators]
    else if (next==='(')
    return [formulas.slice(0,-3).concat(infpol.get(operators.at(-1)) + formulas.at(-1) + formulas.at(-2)),operators.slice(0,-1)]
    else
      return [formulas,operators]
  },[[],[]]).at(0).at(0)

const split = (formula) => {
  let counter=1
  let index=0
  while ((++index)<formula.length && counter>0)
    counter = adjustCounter(formula[index],counter)
  return [formula.slice(1,index),formula.slice(index)]
}

const addNegation = (formula) => (['N'].concat(formula))
const removeNegation = (formula) => isUnaryConnective(formula[0]) ? formula.slice(1) : formula
const deleteDoubleNegation = (formula) => formula.slice(2)

const  deMorganise = (formula) => {
  const [f1,f2] = removeNegation(formula).split()
  return [deMorganTransform.get(formula[1])]
    .concat(addNegation(f1))
    .concat(addNegation(f2))
}

const replaceFormulaAtIndex = (sequent,formula,index) => sequent.slice(0,index)
    .concat([formula])
    .concat(sequent.slice(index+1))
  
const deMorganReduction = (sequent,index) => 
  replaceFormulaAtIndex(sequent,deMorganise(sequent.at(index)),index)
  
const doubleNegationReduction = (sequent,index) => 
  replaceFormulaAtIndex(sequent,deleteDoubleNegation(sequent.at(index)),index)
  
const reduceNextNegation = (sequent,index) =>
  isBinaryConnective(sequent.at(index),1) ? deMorganReduction(sequent,index)
  : doubleNegationReduction(sequent,index)

const reduceNextDisjunction = (sequent,index) => sequent.slice(0,index)
  .concat(split(sequent.at(index)))
  .concat(sequent.slice(index+1))

const reduceNextFormula = (sequent) => {
  for(var i=0;i<sequent.length;i++) {
    if(isDisjuncted(sequent[i]))
      return reduceNextDisjunction(sequent,i)
    if(isNegated(sequent[i]) && !isLowerCase(sequent.at(i)[1]))
      return reduceNextNegation(sequent,i)
  }
  return undefined
}

const getSubsets = (input) => input.reduce(
  (subsets, v) => subsets.concat(
    subsets.map(set => [v,...set])),[[]])

const getOption = (sequent,split) => {
  const sorted = split.sort()
  let pos = 0, first = [], second = []
  for (let step = 0; step < sequent.length; step++) {
    if(sorted[pos]===step) {
      first.push(sequent[step])
      pos++
    }
    else
      second.push(sequent[step])
  }
  return [first,second]
}
const conjunctionReduction = (sequent,formula,index) => {
  const [formula1,formula2] = split(formula)
  const toBeSplit = sequent.slice(0,index).concat(sequent.slice(index+1))
  return getSubsets([...Array(toBeSplit.length).keys()]).reduce((options,next) => {
    const [first,second] = getOption(toBeSplit,next)
    return options.concat([[first.concat([formula1]),second.concat([formula2])]])
  },[])
}

export { reduceNextFormula, conjunctionReduction, isPolishWff,polishToInfix, infixToPolish}
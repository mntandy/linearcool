import { useReducer, useState } from "react"
import treeReducer from "../libs/prover/tree"

const useTreeConstructor = (getFormula) => {
    const [rootFormula, setRootFormula] = useState(null)
    const [tree, dispatch] = useReducer(treeReducer,null)

    const resetProof = () => {
        dispatch({type:"reset"})
        setRootFormula(null)
    }

    const initialise = () => {
        const nextFormula = getFormula()
        setRootFormula(nextFormula)
        dispatch({type: "initialise", payload:{formula:nextFormula}})
    }
    
    const nextStep = () => dispatch({type: "forward"})

    const initialiseOrNextStep = () => tree ? nextStep() : initialise()
      
    return { tree, rootFormula, initialiseOrNextStep, nextStep, resetProof }
}

export default useTreeConstructor

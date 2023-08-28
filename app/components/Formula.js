import { useState, useRef } from "react"

const Formula = ({rootFormula,formula,reset}) => {
  const [hasChanged,setChanged] = useState(false)
  
  const handleFormulaChange = (event) => {
    if(rootFormula && rootFormula!==formula.get())
        setChanged(true)
    else
        setChanged(false)
  }

  const resetFormula = () => {
    formula.set(rootFormula)
    setChanged(false)
  }

  const resetProof = () => {
    reset()
    setChanged(false)
  }

  return (
    <>
    <label htmlFor="Formula">
    <span className="tooltip">Enter a formula<span className="tooltiptext">Click the above link for more info.</span>:</span>
    </label>
    <input aria-label="Formula" id="Formula" className="input" ref={formula.ref} type="formula" onChange={handleFormulaChange}/>
      {hasChanged && 
      <>
        <p className="text-error">Formula has changed</p>
        <div>
        <button className="littlebutton" onClick={resetProof}>Reset proof</button>
        <button className="littlebutton" onClick={resetFormula}>Reset formula</button>
        </div>
    </>}
    </>
  )
}

export default Formula
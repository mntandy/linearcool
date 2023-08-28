import { useRef } from "react"

const useFormula = () => {
    const ref = useRef(null)

    const get = () => ref.current.value
    const set = (s) => ref.current.value=s
    const reset = () => ref.current.value=""

    return { ref, get, set, reset }
}

export default useFormula
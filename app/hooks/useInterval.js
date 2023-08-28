import { useState } from "react"

const useInterval = () => {
    const [intervalId, setIntervalId] = useState(0)
    const set = (func) => setIntervalId(setInterval(func, 2000))
    const clear = () => clearInterval(intervalId)
    return {set,clear}
}

export default useInterval
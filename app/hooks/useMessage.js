import {useState} from 'react'

const useMessage = (initial) => {
  const [message,setMessage] = useState(initial)
  const setWithTimer = (msg) => {
    setMessage(msg)
    setTimeout(()=>setMessage(null), 3000)
  }
  return {setWithTimer,message,setMessage}
}

export default useMessage
import { useReducer,useEffect } from 'react'

const useStateMachine = (initial,states,nextState,stateAction,impermissibleChanges) => {
    const stateReducer = (state,next) => next ?? (nextState.get(state) ?? state)
    
    const [current,setNextState] = useReducer(stateReducer,initial)
  
    const change = (next) => {
        if(!(next in states))
            throw new Error("Something is utterly wrong.")
        if(impermissibleChanges.has(next) && impermissibleChanges.get(next).has(current))
            throw new Error("Error: " + impermissibleChanges.get(next).get(current))
        setNextState(next)
    }

    useEffect(() => {
        if(current!==initial) stateAction.get(current)()
        setNextState()
    },[current])

    return {change}
}

const useProverState = (actions) => {   
      const states = {
        INITIAL: "INITIAL",
        PLAY: "PLAY",
        PAUSE: "PAUSE",
        FORWARD: "FORWARD",
        RESET: "RESET",
        ERROR: "ERROR",
        FINISHED: "FINISHED",
        ZOOM_IN: "ZOOM_IN",
        ZOOM_OUT: "ZOOM_OUT"
    }

    const zoomImpermissibles = new Map([
        [states.INITIAL,"There is nothing to zoom in or out on yet. Start a proof first."],
        [states.PLAY,"You cannot zoom and play"]])
  
    const impermissibleChanges = new Map([
        [states.ZOOM_IN,zoomImpermissibles],
        [states.ZOOM_OUT,zoomImpermissibles]])

    const nextState = new Map([
        [states.INITIAL,null],
        [states.PLAY,null],
        [states.PAUSE,null],
        [states.ZOOM_IN,states.PAUSE],
        [states.ZOOM_OUT,states.PAUSE],
        [states.FORWARD,states.PAUSE],
        [states.RESET,states.INITIAL],
        [states.ERROR,states.RESET],
        [states.FINISHED,states.PAUSE]])
  
    const stateAction = new Map([
        [states.PLAY,actions.play],
        [states.FORWARD,actions.forward],
        [states.PAUSE,actions.pause],
        [states.RESET,actions.reset],
        [states.FINISHED,actions.finished],
        [states.ERROR,actions.error],
        [states.ZOOM_IN,actions.zoomIn],
        [states.ZOOM_OUT,actions.zoomOut]])

  const state = useStateMachine(states.INITIAL,states,nextState,stateAction,impermissibleChanges)

  return {
    reset: () => state.change(states.RESET),
    play: () => state.change(states.PLAY),
    forward: () => state.change(states.FORWARD),
    pause: () => state.change(states.PAUSE),
    zoomIn: () => state.change(states.ZOOM_IN),
    zoomOut: () => state.change(states.ZOOM_OUT),
    setError: () => state.change(states.ERROR),
    setFinished: () => state.change(states.FINISHED)
    }
}

export default useProverState
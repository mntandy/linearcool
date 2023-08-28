'use client'
import { useEffect } from 'react'
import Formula from './Formula'
import Player from './Player'
import Canvas from './Canvas'
import Message from './Message'
import useCanvas from '@/app/hooks/useCanvas'
import useProverState from '@/app/hooks/useProverState'
import useMessage from '../hooks/useMessage'
import { drawTree } from '../libs/canvas'
import useTreeConstructor from '../hooks/useTreeConstructor'
import useFormula from '../hooks/useFormula'
import useInterval from '../hooks/useInterval'

const Prover = () => {
    const formula = useFormula()
    const { rootFormula, tree, nextStep, initialiseOrNextStep, resetProof } = useTreeConstructor(formula.get)
    const canvas = useCanvas()
    const { message, setMessage } = useMessage()
    const playInterval = useInterval()

    const proverDone = () => {
        setMessage(tree.message ?? "")
        playInterval.clear()
    }
    
    const actions = {
        play: () => {
            initialiseOrNextStep()
            playInterval.set(nextStep)
        },
        forward: initialiseOrNextStep,
        reset: () => {
            resetProof()
            canvas.reset()
        },
        pause: playInterval.clear,
        zoomIn: canvas.zoomIn,
        zoomOut: canvas.zoomOut,
        finished: proverDone, 
        error: proverDone,
    }

    const { zoomIn, zoomOut, play, forward, reset, pause, setError, setFinished } = useProverState(actions)

    useEffect(() => {
        if(tree) {
            drawTree(tree,canvas.zoom,canvas.coordinates)
            tree.error && setError()
            tree.finished && setFinished()
        }
    },[tree])

    useEffect(() => {
        drawTree(tree,canvas.zoom,canvas.coordinates)
    },[canvas.coordinates,canvas.zoom])

    return (
    <div className="centered columns" onClick={() => setMessage(null)}>
        <Formula {...{formula,rootFormula,reset}}/>
        <Message {...{message,setMessage}}/>
        <Player {...{play,forward,reset,pause}}/>
        <Canvas {...{canvas,zoomIn,zoomOut}}/>
    </div>)
}

export default Prover
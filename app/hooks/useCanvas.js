import { useRef, useState, useEffect } from "react"
import { getDimensions } from "../libs/canvas"

const useZoom = () => {
    const [zoom, setZoom] = useState(1)
    const zoomIn = () => setZoom(zoom+0.1)
    const zoomOut = () => setZoom(Math.max(zoom-0.1,0.1))
    const zoomReset = () => setZoom(1)
  
    return {
      zoom,
      zoomIn,
      zoomOut,
      zoomReset,
    }
}

const getDefaultCoordinates = () => ({x:Math.min(window.innerWidth-20,400)/2,y:200})

const useCanvas = () => {
    const ref = useRef(null)
    const [prevOffset,setPrevOffset] = useState({x:0,y:0})
    const [isDown,setDown] = useState(false)
    const [coordinates,setCoordinates] = useState(null)
    const {zoom,zoomIn,zoomOut,zoomReset} = useZoom()
    
    const reset = () => {
        const {width,height} = getDimensions()
        ref.current.getContext('2d').clearRect(0,0,width,height)
        zoomReset()
        setCoordinates(getDefaultCoordinates())
        setPrevOffset({x:0,y:0})
    }

    const updateCoords = (offset) => {
        setCoordinates({x:coordinates.x+(offset.x-prevOffset.x),y:coordinates.y+(offset.y-prevOffset.y)})
        setPrevOffset(offset)
    }

    const getMouseOffset = (event) => 
    ({
        x:event.pageX - ref.current.offsetLeft,
        y:event.pageY - ref.current.offsetTop
    })

    const getTouchOffset = (event) =>
    ({
        x:event.touches[0].clientX - ref.current.offsetLeft,
        y:event.touches[0].clientY - ref.current.offsetTop
    })

    const handleTouchMove = (event) => {
        if(isDown) 
            updateCoords(getTouchOffset(event))
    }
  
    const handleMouseMove = (event) => {
        if(isDown)
            updateCoords(getMouseOffset(event))
    }


    const handleMouseDown = (event) => {
        setDown(true)
        setPrevOffset(getMouseOffset(event))
    }
  
    const handleTouchStart = (event) => {
        setDown(true)
        setPrevOffset(getTouchOffset(event))
    }

    const handleMoveEnd = (event) => {
        setDown(false)
        setPrevOffset({x:0,y:0})
    }

    useEffect(()=> {
        setCoordinates(getDefaultCoordinates())
    },[])

    return { ref,zoom,coordinates, zoomIn, zoomOut, reset, handleMoveEnd, handleTouchStart, handleTouchMove, handleMouseDown, handleMouseMove }
}

export default useCanvas
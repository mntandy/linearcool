import Svg from './Svg'
import { useEffect } from 'react'
import { CANVAS_ID, resetTextHeight } from '../libs/canvas'

const Canvas = ({canvas,zoomIn,zoomOut}) => {
  const { ref, handleMoveEnd, handleTouchStart, handleTouchMove, handleMouseDown, handleMouseMove } = canvas
  
  useEffect(() => {
    resetTextHeight()
  },[])
  
  return (
    <div className="centered columns">
        <div>
            <button className="mediabutton" onClick={zoomIn}><Svg type="zoomIn"/></button>
            <button className="mediabutton" onClick={zoomOut}><Svg type="zoomOut"/></button>
        </div>
        <canvas
        onMouseDown={handleMouseDown} onMouseUp={handleMoveEnd} onMouseMove={handleMouseMove} 
        onTouchStart={handleTouchStart} onTouchEnd={handleMoveEnd} onTouchMove={handleTouchMove}  
        id={CANVAS_ID} ref={ref} className="canvas" width={Math.min(window.innerWidth-20,400)} height="200">
        Your browser does not support the HTML canvas tag.
        </canvas>
        <p><i>Try moving the proof around or zoom in/out.</i></p>
    </div>
  )
}

export default Canvas

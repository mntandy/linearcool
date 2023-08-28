import Svg from './Svg'

const Player = ({reset,play,pause,forward}) => {
  
  return (
  <div className="centered">
    <button className="mediabutton" onClick={reset}><Svg type="rotateLeft"/></button>
    <button className="mediabutton" onClick={play}><Svg type="play"/></button>
    <button className="mediabutton" onClick={pause}><Svg type="pause"/></button>
    <button className="mediabutton" onClick={forward}><Svg type="forwardStep"/></button>
  </div>)
}

export default Player
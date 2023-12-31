const Play = () => {
    return (<div>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 384 512">
    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
    </div>
    )
  }
  
  const ForwardStep = () => {
    return (<div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 320 512"><path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z"/></svg>
    </div>)
  }
  
  const BackwardStep = () => {
    return (<div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 320 512"><path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z"/></svg>
    </div>)
  }
  
  const Pause = () => {
    return (<div>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>
  </div>)
  }
  
  const RotateLeft = () => {
    return (<div>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/></svg>
  </div>)
  }
  
  const ZoomIn = () => {
    return (<div>
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 -50 350 350">
          <path d="M246.271,111.132h-25.597c-1.206,0-2.194-0.986-2.194-2.193V83.342c0-1.207-0.985-2.194-2.192-2.194h-27.792
                      c-1.206,0-2.193,0.987-2.193,2.194v25.597c0,1.207-0.987,2.193-2.194,2.193h-25.597c-1.207,0-2.193,0.988-2.193,2.194v27.791
                      c0,1.206,0.986,2.194,2.193,2.194h25.597c1.207,0,2.194,0.986,2.194,2.193v25.597c0,1.206,0.987,2.194,2.193,2.194h27.792
                      c1.207,0,2.192-0.988,2.192-2.194v-25.597c0-1.207,0.988-2.193,2.194-2.193h25.597c1.207,0,2.192-0.988,2.192-2.194v-27.791
                      C248.464,112.12,247.478,111.132,246.271,111.132z"/>
                  <path d="M256.906,12.304C193.437-17.803,117.581,9.241,87.473,72.708c-30.107,63.467-3.064,139.324,60.403,169.433
                      c63.467,30.106,139.325,3.063,169.431-60.403C347.417,118.27,320.374,42.411,256.906,12.304z M282.473,165.211
                      c-20.979,44.229-73.843,63.073-118.069,42.094c-44.229-20.979-63.073-73.844-42.093-118.071
                      c20.98-44.229,73.844-63.074,118.069-42.094C284.608,68.121,303.454,120.983,282.473,165.211z"/>
    </svg>
    </div>)
  }
  
  const ZoomOut = () => {
    return (<div>
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"  viewBox="0 -50 350 350">
                  <path d="M256.906,12.304C193.437-17.803,117.581,9.241,87.473,72.708c-30.107,63.467-3.064,139.324,60.403,169.433
                      c63.467,30.106,139.325,3.063,169.431-60.403C347.417,118.27,320.374,42.411,256.906,12.304z M282.473,165.211
                      c-20.979,44.229-73.843,63.073-118.069,42.094c-44.229-20.979-63.073-73.844-42.093-118.071
                      c20.98-44.229,73.844-63.074,118.069-42.094C284.608,68.121,303.454,120.983,282.473,165.211z"/>
                  <path d="M246.271,111.132h-87.76c-1.206,0-2.194,0.988-2.194,2.194v27.791c0,1.206,0.988,2.194,2.194,2.194h87.76
                      c1.207,0,2.193-0.988,2.193-2.194v-27.791C248.465,112.12,247.478,111.132,246.271,111.132z"/>
  </svg>
    </div>)
  }
  const Svg = ({type}) => {
    switch (type) {
      case 'play': return <Play/>
      case 'forwardStep': return <ForwardStep/>
      case 'backwardStep': return <BackwardStep/>
      case 'pause': return <Pause/>
      case 'rotateLeft': return <RotateLeft/>
      case 'zoomIn': return <ZoomIn/>
      case 'zoomOut': return <ZoomOut/>
      default: return null
    }
  }
  
  export default Svg
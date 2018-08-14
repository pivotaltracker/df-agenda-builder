import React, { Component } from 'react'
import NavBar from './components/NavBar'
import HorizontalStepper from './components/HorizontalStepper'
// import DefinedProbCard from './components/DefinedProbCard'
// import GreenfieldIdeaCard from './components/GreenfieldIdeaCard'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <HorizontalStepper/> 
      </div>
    )
  }
}
export default App
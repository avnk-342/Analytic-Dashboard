import './Hero.css'
import React from 'react'
import Barchart from "../barchart/Barchart"
import PieChart from '../piechart/PieChart'

const Hero = () => {
  return (
    <div className='hero-main-div'>
      <div className="piechart-main-div">
        <p>sector with most insights</p>
        <PieChart/>
      </div>
      
      {/* <Barchart/> */}
    </div>
  )
}

export default Hero
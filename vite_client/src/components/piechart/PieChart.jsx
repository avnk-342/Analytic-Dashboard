import React from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import { useState, useEffect, useRef } from "react"
import './PieChart.css'

const PieChart = () => {
    const [data, setData] = useState([])
    const svgRef = useRef();
    
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async ()=>{
        await axios.get('http://localhost:3000/')
        .then(res => {
            setData(res.data)
            console.log(res.data)
        })
    }

    useEffect(()=>{
        if (data.length>0){
            drawChart(data)
        }
    }, [data])

    const drawChart = (data) => {
        //setting chart container
        const width = 500;
        const height = 500;
        const radius = width/2
        const svg = d3.select(svgRef.current)
        .attr('width',width)
        .attr('height',height)
        

        svg.selectAll('*').remove()

        const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
        
        //setting chart
        const formatData = d3.pie().value(d => d.count)(data)
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius)
        const color = d3.scaleOrdinal().range(d3.schemeSet2)

        //setting svg data
        g.selectAll('path')
        .data(formatData)
        .join('path')
        .attr('d', arcGenerator)
        .attr('fill', d => color(d.data.count))
        .style('opacity', 0.7);
        
        // Create legend items
        const legendContainer = svg.append('g').attr('transform', `translate(${width + 20}, ${50})`); // position 

    
        data.forEach((d, i) => {
            legendContainer.append('rect')
                .attr('x', 0)
                .attr('y', i * 20)
                .attr('width', 18)
                .attr('height', 18)
                .attr('fill', color(d.count));

            legendContainer.append('text')
                .attr('x', 25)
                .attr('y', i * 20 + 15)
                .text(d.sector);
                
        })
}
  return (
    
    <svg ref={svgRef} style={{overflow:'visible'}}></svg>
    
    
    
  )
}

export default PieChart
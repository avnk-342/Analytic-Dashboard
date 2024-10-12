import React from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import { useState, useEffect, useRef } from "react"

const Barchart = () => {
    const [data, setData] = useState([])
    const svgRef = useRef();
    
    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = ()=>{
        axios.get('http://localhost:3000/')
        .then(res => {
            setData(res.data)
        })
        
    }

    useEffect(()=>{
        if (data.length>0){
            drawChart(data)
        }
    }, [data])

    const drawChart = (data) => {
        //d3 part
        const margin = { top: 0, right: 100, bottom: 30, left: 100 }
        const width = 2000 - margin.left - margin.right
        const height = 500 - margin.top - margin.bottom
        
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const xScale = d3.scaleBand()
          .domain(data.map((d) => d.sector))
          .range([0, width]).padding(0.5);
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(data, (d) => d.count)])
          .range([height, 0]);

          svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(d.sector))
            .attr("y", (d) => yScale(d.count))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => height - yScale(d.count))
            .attr("transform", "translate(30, 10)")
            .attr("fill", "steelblue")

            // Create x-axis
            const xAxis = d3.axisBottom(xScale);
            svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(30,${height+10})`)
            .call(xAxis);

            // Create y-axis
            const yAxis = d3.axisLeft(yScale);
            svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", "translate(30, 10)")
            .call(yAxis);
    }
    
  return (
    <div>
        <svg ref={svgRef}></svg>
    </div>
    
    
  )
}

export default Barchart
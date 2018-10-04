/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';

class Graph extends React.Component {

    drawGraph() {
        // set the dimensions and margins of the graph
        let margin = {top: 20, right: 20, bottom: 20, left: 30},
            // width = 960 - margin.left - margin.right,
            width = d3.select(".card").node().clientWidth-40,
            // height = 500 - margin.top - margin.bottom;
            height = d3.select(".card__graph").node().clientHeight-40;

        // parse the date / time
        let parseTime = d3.timeParse("%Y-%m-%dT%H:00:00");

        // set the ranges
        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);

        // define the line
        let valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.ICA); });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        let svg = d3.select("#graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Get the data. time = "24h" o "7d"
        this.getData(this.props.zone, {time: "24h"}, (data) => {

            // format the data
            data.map((d, i) => {
                if(i==14) console.log(data.length, d);
                d.date = parseTime(d.date_t);
            });
            data = data.filter(d=>d.ICA);

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.date; }));
            // y.domain([0, d3.max(data, function(d) { return d.ICA; })]);
            y.domain([0, 100]);

            // Add the valueline path.
            svg.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueline);

            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));
        });
    }

    drawMultiGraph(){
        // let margin = {top: 20, right: 20, bottom: 20, left: 30},
        let margin = 30,
            // width = 960 - margin.left - margin.right,
            width = d3.select(".card").node().clientWidth-40,
            // height = 500 - margin.top - margin.bottom;
            height = d3.select(".card__graph").node().clientHeight-40,
            duration = 250;
        console.log(width, height);

        let lineOpacity = "0.25";
        let lineOpacityHover = "0.85";
        let otherLinesOpacityHover = "0.1";
        let lineStroke = "1.5px";
        let lineStrokeHover = "2.5px";

        let circleOpacity = '0.85';
        let circleOpacityOnLineHover = "0.25";
        let circleRadius = 3;
        let circleRadiusHover = 6;

        this.getData(this.props.zone, {time: "24h"}, (payload) => {
            console.log(payload);
            let data = [{
                name: "ICA",
                values: [
                    // {date: "", value: ""}
                ]
            },{
                name: "Trafico", values: []
            },{
                name: "Humedad", values: []
            },{
                name: "Temperatura", values: []
            }
            /*,{ name: "Precipitacion", values: [] },{ name: "Presión", values: [] },{ name: "Viento", values: [] }*/
            ];

            let parseDate = d3.timeParse("%Y-%m-%dT%H:00:00");
            payload.forEach(d => {
                data.filter(a => a.name==="ICA")[0].values.push({date: parseDate(d.date_p), value: d['ICA']});
                data.filter(a => a.name==="Trafico")[0].values.push({date: parseDate(d.date_t), value: d['Traffic density (%)']});
                data.filter(a => a.name==="Humedad")[0].values.push({date: parseDate(d.date_m), value: d['humedad (%)']});
                data.filter(a => a.name==="Temperatura")[0].values.push({date: parseDate(d.date_m), value: d['temp (°C)']});
            });

            /* Scale */
            let xScale = d3.scaleTime()
                .domain(d3.extent(data[0].values, d => d.date))
                .range([0, width-margin]);

            let yScale = d3.scaleLinear()
                .domain([0, 100
                    // d3.max(data[0].values, d => d.value)
                ])
                .range([height-margin, 0]);

            let color = d3.scaleOrdinal(d3.schemeCategory10);

            /* Add SVG */
            let svg = d3.select("#graph").append("svg")
                .attr("width", (width+margin)+"px")
                .attr("height", (height+margin)+"px")
                .append('g')
                .attr("transform", `translate(${margin}, ${margin})`);

            /* Add line into SVG */
            let line = d3.line()
                .x(d => xScale(d.date))
                .y(d => yScale(d.value));

            let lines = svg.append('g')
                .attr('class', 'lines');

            lines.selectAll('.line-group')
                .data(data).enter()
                .append('g')
                .attr('class', 'line-group')
                .on("mouseover", function(d, i) {
                    svg.append("text")
                        .attr("class", "title-text")
                        .style("fill", color(i))
                        .text(d.name)
                        .attr("text-anchor", "middle")
                        .attr("x", (width-margin)/2)
                        .attr("y", 5);
                })
                .on("mouseout", function(d) {
                    svg.select(".title-text").remove();
                })
                .append('path')
                .attr('class', 'line')
                .attr('d', d => line(d.values))
                .style('stroke', (d, i) => color(i))
                .style('opacity', lineOpacity)
                .on("mouseover", function(d) {
                    d3.selectAll('.line')
                        .style('opacity', otherLinesOpacityHover);
                    d3.selectAll('.circle')
                        .style('opacity', circleOpacityOnLineHover);
                    d3.select(this)
                        .style('opacity', lineOpacityHover)
                        .style("stroke-width", lineStrokeHover)
                        .style("cursor", "pointer");
                })
                .on("mouseout", function(d) {
                    d3.selectAll(".line")
                        .style('opacity', lineOpacity);
                    d3.selectAll('.circle')
                        .style('opacity', circleOpacity);
                    d3.select(this)
                        .style("stroke-width", lineStroke)
                        .style("cursor", "none");
                });

            /* Add circles in the line */
            lines.selectAll("circle-group")
                .data(data).enter()
                .append("g")
                .style("fill", (d, i) => color(i))
                .selectAll("circle")
                .data(d => d.values).enter()
                .append("g")
                .attr("class", "circle")
                .on("mouseover", function(d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .append("text")
                        .attr("class", "text")
                        .text(`${d.value}`)
                        .attr("x", d => xScale(d.date) + 5)
                        .attr("y", d => yScale(d.value) - 10);
                })
                .on("mouseout", function(d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .transition()
                        .duration(duration)
                        .selectAll(".text").remove();
                })
                .append("circle")
                .attr("cx", d => xScale(d.date))
                .attr("cy", d => yScale(d.value))
                .attr("r", circleRadius)
                .style('opacity', circleOpacity)
                .on("mouseover", function(d) {
                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr("r", circleRadiusHover);
                })
                .on("mouseout", function(d) {
                    d3.select(this)
                        .transition()
                        .duration(duration)
                        .attr("r", circleRadius);
                });

            /* Add Axis into SVG */
            let xAxis = d3.axisBottom(xScale).ticks(5);
            let yAxis = d3.axisLeft(yScale).ticks(5);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", `translate(0, ${height-margin})`)
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                // .call(d3.axisLeft(y))
                .call(yAxis)
                .append('text')
                .attr("y", 15)
                .attr("transform", "translate(20 0)")
                .attr("fill", "#000")
                .text("%");
        });
    }

    getData(zone, opt={}, callback) { // from 1 station (graph)
        let {id} = zone;
        let time = opt.time ? `?time=${opt.time}` : "";
        const url = `https://dfr-nas.ddns.net/rest/api/station/${encodeURIComponent(id)}${time}`;
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
            },
        })
        // .then(response => console.log(response))
            .then(response => response.json()
            ).then(response => {
                callback(response.data);
            }).catch((e) => {
                console.log(`Error in fetch ${e.message}`);
            });
    }

    componentDidUpdate() {
        d3.select("#graph>svg").remove();
        // this.drawGraph();
        this.drawMultiGraph();
    }

    componentDidMount() {
        // this.drawGraph();
        this.drawMultiGraph();
    }

    render() {
        let content = this.props.zone.id === 0 ?
            <p className="disclaimer">Please click on a zone</p> :
            <div id="graph"></div>;
        return (
            <div className="card card__graph">
                {content}
            </div>
        );
    }
    
}
export default Graph;

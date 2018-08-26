/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';

class Graph extends React.Component {

    drawGraph() {
        // set the dimensions and margins of the graph
        let margin = {top: 20, right: 20, bottom: 20, left: 30},
            // width = 960 - margin.left - margin.right,
            width = d3.select(".card").node().clientWidth-40,
            // height = 500 - margin.top - margin.bottom;
            height = d3.select(".card").node().clientHeight-40;

        // parse the date / time
        let parseTime = d3.timeParse("%Y-%m-%dT%H:00:00");

        // set the ranges
        let x = d3.scaleTime().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);

        // define the line
        let valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.close); });

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        let svg = d3.select("#graph").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // Get the data
        d3.csv("data/fakedates.csv").then(data => {
            console.log(data);
            // format the data
            data.forEach(function(d) {
                d.date = parseTime(d.date);
                d.close = +d.close;
            });

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.date; }));
            y.domain([0, d3.max(data, function(d) { return d.close; })]);

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

    componentDidUpdate() {
        this.drawGraph();
    }

    getData(zone) { // from 1 station (graph)
        let {id} = zone;
        // TODO: fwd port
        const url = `http://192.168.1.37:3000/rest/api/station/${encodeURIComponent(id)}`;
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
            },
        }).then(response => response.json()
        ).then(response => {
            // console.log("response", response);
        }).catch((e) => {
            console.log(`Error in fetch ${e.message}`);
        });
    }

    componentDidUpdate() {
        // this.getData(this.props.zone);
    }

    render() {
        let content = this.props.zone.id === 0 ?
            <p className="disclaimer">Please click on a zone</p> :
            <div>
                <p>Data from station no.{this.props.zone.id} ({this.props.zone.name}). ICA: {this.props.zone.ica}</p>
                <div id="graph"></div>
            </div>;
        return (
            <div className="card card__graph">
                {content}
            </div>
        );
    }
    
}
export default Graph;

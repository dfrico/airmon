/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';
import Header from './Header.jsx';

import * as turf from '@turf/turf'

class Web extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            theme: "light"
        };
    }

    setStore(store) {
        this.setState(store);
    }

    changeTheme() {
        let theme = this.state.theme === "light" ? "dark" : "light";

        switch(theme) {
            case "dark":
                document.body.style.backgroundColor = "#222";
                break;
            case "light":
                document.body.style.backgroundColor = "#FFF";
                break;
            default:
        }

        this.setState({theme: theme});
        console.log(L, L.layerGroup(), L.tileLayer());
    }

    voronoi(map) {
        // let url = "js/coordinates.csv";
        L.svg().addTo(map);

        // We simply pick up the SVG from the map object
        let svg = d3.select("#map").select("svg"), g = svg.append("g");

        d3.csv("js/coordinates.csv").then((collection) => {
            try{
                let features = [];
                Object.keys(collection).map(k => {
                    let obj = collection[k];
                    if(!obj.length){ // not headers array, only row obj {}
                        let feature = turf.point([obj.longitude, obj.latitude], {id: obj.id, name: obj.name})
                        feature.style = {color: "red"}
                        features.push(feature)
                    }
                });

                // D3 points (coordinates)

                let fc = turf.featureCollection(features)
                let pointLayer = L.geoJSON(fc, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {radius: 1.2, color: '#23A480'});  
                    }
                }).addTo(map);

                let voronoiPolygons = turf.voronoi(fc);
                let voronoiLayer = L.geoJSON(voronoiPolygons).addTo(map);

            } catch(e) {
                console.error(e);
            }
        });
    }

    componentDidMount() {
        let map = L.map('map').setView([40.42, -3.7], 11.5);
        let token = "pk.eyJ1IjoiZGZyIiwiYSI6ImNqa2ZhN2dscjA2dm8zdm8zMTRpYzFtb3MifQ.OonL77wXkCGpixjghGTolA";

        let basemap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
            id: 'mapbox.'+this.state.theme,
            accessToken: token
        });

        basemap.addTo(map);
        this.voronoi(map);
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="card">
                    <div id="map"></div>
                </div>
                <label className="switch">
                    <input type="checkbox" onChange={this.changeTheme.bind(this)}/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
    
}
export default Web;

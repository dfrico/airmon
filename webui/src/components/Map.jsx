/*global d3 L*/
import React from 'react';
import {point, featureCollection, voronoi} from '@turf/turf';

class Map extends React.Component {

    voronoi(map) {
        // let url = "js/coordinates.csv";
        L.svg().addTo(map);

        // We simply pick up the SVG from the map object
        let svg = d3.select("#map").select("svg");
        svg.append("g");

        d3.csv("data/coordinates.csv").then((collection) => {
            try{
                let features = [];
                Object.keys(collection).map(k => {
                    let obj = collection[k];
                    if(!obj.length){ // not headers array, only row obj {}
                        let feature = point([obj.longitude, obj.latitude], {id: obj.id, name: obj.name});
                        feature.style = {color: "red"};
                        features.push(feature);
                    }
                });

                // D3 points (coordinates)

                let fc = featureCollection(features);
                L.geoJSON(fc, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng, {radius: 1.2, color: '#23A480'});
                    }
                }).addTo(map);

                let myStyle = {
                    "color": this.props.theme === "dark" ? "#222" : "#999",
                    "fill": "red",
                    "weight": 1.4,
                    "opacity": 0.4
                };

                this.voronoiPolygons = voronoi(fc);
                this.voronoiPolygons.features.map((f, i) => {
                    f.properties = features[i].properties;
                });
                this.voronoiLayer = L.geoJSON(this.voronoiPolygons, {
                    style: myStyle,
                    onEachFeature: (feature, layer) => {
                        layer.on({
                            click: () => {
                                console.log(layer.feature.properties);
                                this.props.setStore({station: layer.feature.properties});
                            }
                        });
                    }
                }).addTo(map);
                // console.log(features[2], fc.features[2], this.voronoiPolygons.features[2]);

            } catch(e) {
                console.error(e);
            }
        });
    }

    componentDidMount() {
        this.map = L.map('map').setView([40.42, -3.7], 11.5);
        this.token = "pk.eyJ1IjoiZGZyIiwiYSI6ImNqa2ZhN2dscjA2dm8zdm8zMTRpYzFtb3MifQ.OonL77wXkCGpixjghGTolA";

        this.baselayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
            id: 'mapbox.'+this.props.theme,
            accessToken: this.token
        }).addTo(this.map);

        this.voronoi(this.map);
    }

    componentDidUpdate() {
        let myStyle = {
            "color": this.props.theme === "dark" ? "#FFF" : "#222",
            "fill": "red",
            "weight": 1.4,
            "opacity": 0.4
        };
        this.voronoiLayer.clearLayers();
        this.voronoiLayer = L.geoJSON(this.voronoiPolygons, {
            style: myStyle,
            onEachFeature: (feature, layer) => {
                layer.on({
                    click: () => {
                        console.log(layer.feature.properties);
                        this.props.setStore({station: layer.feature.properties});
                    }
                });
            }
        }).addTo(this.map);

        this.baselayer.remove();
        this.baselayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
            id: 'mapbox.'+this.props.theme,
            accessToken: this.token
        }).addTo(this.map);
    }

    render() {
        return (
            <div className="card">
                <div id="map"></div>
            </div>
        );
    }
    
}
export default Map;

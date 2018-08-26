/*global d3 L*/
import React from 'react';
import {point, featureCollection, voronoi} from '@turf/turf';

class Map extends React.Component {

    voronoi(map) {
        L.svg().addTo(map);
        let svg = d3.select("#map").select("svg");
        svg.append("g");

        d3.csv("data/coordinates.csv").then((collection) => {
            // {id,name,latitude,longitude}
            try{
                let features = [];
                // let colors = ["#FFFECE", "#FEECA4", "#FDD87D", "#FCB156", "#FB8D46", "#F94F35", "#E01F27", "#BB082D", "#7E0428"];
                let colors = ["#A3062A", "#D5322F", "#F26D4A", "#FBAD68", "#FDDF90", "#FFFEC2", "#D9EE90", "#A7D770", "#69BC67", "#249753", "#0B6739"].reverse();

                this.getStatus(status => {
                    Object.keys(collection).map(k => {
                        let obj = collection[k];
                        if(!obj.length){ // not headers array, only row obj {}
                            let ica = status[obj.id].ica;
                            console.log(obj.id, obj.name, ica, Math.round(ica/10));

                            let feature = point([obj.longitude, obj.latitude], {
                                id: obj.id,
                                name: obj.name,
                                ica: ica,
                                color: colors[Math.round(ica/10)]
                            });
                            // feature.style = {color: "red"};
                            features.push(feature);
                        }
                    });
    
                    // D3 points (coordinates)
    
                    let fc = featureCollection(features);
                    L.geoJSON(fc, {
                        pointToLayer: function (feature, latlng) {
                            return L.circleMarker(latlng, {
                                // radius: 1.2,
                                radius: 2,
                                color: "#23A480"
                            });
                        }
                    }).addTo(map);
    
                    this.baseColor = features[0].properties.color;
                    this.voronoiPolygons = voronoi(fc);
                    this.voronoiPolygons.features.map((f, i) => {
                        f.properties = features[i].properties;
                    });
                    this.addVoronoiLayer();
                    // console.log(features[2], fc.features[2], this.voronoiPolygons.features[2]);
                });
            } catch(e) {
                console.error(e);
            }
        });
    }

    addVoronoiLayer() {
        let myStyle = {
            color: this.props.theme === "dark" ? "#FFF" : "#DDD",
            // color: "#BBB",
            fillColor: this.baseColor ? this.baseColor : "#F00",
            // fillOpacity: 0.4,
            weight: 1.4,
            opacity: 1
        };
        this.voronoiLayer = L.geoJSON(this.voronoiPolygons, {
            style: myStyle,
            onEachFeature: (feature, layer) => {
                layer.defaultOptions.style.fillColor = feature.properties.color ? feature.properties.color : "#F00";
                layer.on({
                    click: () => {
                        // console.log(layer.feature.properties);
                        this.props.setStore({station: layer.feature.properties});
                    }
                });
            }
        }).addTo(this.map);
    }

    setBaseLayer() {
        this.baselayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
            minZoom: 12,
            id: 'mapbox.'+this.props.theme,
            accessToken: this.token
        }).addTo(this.map);
    }

    getStatus(callback) {
        const url = "http://192.168.1.37:3000/rest/api/status";
        fetch(url, {
            method: "GET",
            headers: {
                Accept: 'application/json',
            },
        }).then(response => response.json()
        ).then(response => {
            // console.log("response", response);
            callback(response);
        }).catch((e) => {
            console.log(`Error in fetch ${e.message}`);
        });
    }

    componentDidMount() {
        // setting leaflet map
        this.map = L.map('map').setView([40.42, -3.7], 11.5);
        this.token = "pk.eyJ1IjoiZGZyIiwiYSI6ImNqa2ZhN2dscjA2dm8zdm8zMTRpYzFtb3MifQ.OonL77wXkCGpixjghGTolA";

        this.setBaseLayer();
        // this.voronoi calculates voronoi polygons AND updates voronoi layer
        this.voronoi(this.map);
    }

    componentDidUpdate() { // only on theme change
        // reset base layer
        this.baselayer.remove();
        this.setBaseLayer();

        // reset voronoi layer
        this.voronoiLayer.clearLayers();
        this.addVoronoiLayer();
    }

    render() {
        return (
            <div className="card card__map">
                <div id="map"></div>
            </div>
        );
    }
}
export default Map;

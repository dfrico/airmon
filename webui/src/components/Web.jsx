import React from 'react';
import Header from './Header.jsx';

class Web extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            names: []
        };
    }

    setStore(store){
        this.setState(store);
    }

    componentDidMount(){
        let map = L.map('map').setView([40.42, -3.7], 11.5);
        let token = "pk.eyJ1IjoiZGZyIiwiYSI6ImNqa2ZhN2dscjA2dm8zdm8zMTRpYzFtb3MifQ.OonL77wXkCGpixjghGTolA";

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
            id: 'mapbox.light',
            accessToken: token
        }).addTo(map);

        // let url = "js/coordinates.csv";
        L.svg().addTo(map);

        // We simply pick up the SVG from the map object
        let svg = d3.select("#map").select("svg"),
        g = svg.append("g");

        d3.csv("js/coordinates.csv").then((collection) => {
            try{
                console.log(collection[2]);

                Object.keys(collection).map(k => {
                    let obj = collection[k];
                    if(!obj.length){ // not headers array, only row obj {}
                        obj.LatLng = new L.LatLng(obj.latitude, obj.longitude);
                    }
                });

                console.log(collection[2])

                let feature = g.selectAll("circle")
                    .data(collection)
                    .enter().append("circle")
                    // .style("stroke", "black")
                    .style("opacity", .6)
                    .style("fill", "red")
                    .attr("r", 3);

                map.on("viewreset", update);
                update();

                function update() {
                    feature.attr("transform",
                    (d) => {
                        return "translate("+
                            map.latLngToLayerPoint(d.LatLng).x +","+
                            map.latLngToLayerPoint(d.LatLng).y +")";
                        }
                    )
                }

            } catch(e) {
                console.error(e);
            }
        });
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="card">
                    <div id="map"></div>
                </div>
            </div>
    );
    }
    
}
export default Web;

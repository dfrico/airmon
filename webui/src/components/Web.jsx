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
        let map = L.map('mapid').setView([40.42, -3.7], 12.5);
        let token = "pk.eyJ1IjoiZGZyIiwiYSI6ImNqa2ZhN2dscjA2dm8zdm8zMTRpYzFtb3MifQ.OonL77wXkCGpixjghGTolA";

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
            id: 'mapbox.light',
            accessToken: token
        }).addTo(map);

        // let url = "js/coordinates.csv";
    }

    render() {
        return (
            <div>
                <Header></Header>
                <div className="card">
                    <div id="mapid"></div>
                </div>
            </div>
    );
    }
    
}
export default Web;

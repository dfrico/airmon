/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';
import Header from './Header.jsx';
import Map from './Map.jsx';
import Graph from './Graph.jsx';

class Web extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            names: [],
            theme: "light",
            station: {id: 0, name: ""}
        };
    }

    setStore(store) {
        this.setState(store);
    }

    changeTheme() {
        // TODO: improve palette, remove themes ?
        let theme = this.state.theme === "light" ? "dark" : "light";
        let card = document.querySelectorAll('.card')[1];

        switch(theme) {
        case "dark":
            document.body.style.backgroundColor = "#222";
            if(card) {
                card.style.backgroundColor = "#222";
                card.style.color = "#fafafa";
            }
            break;
        case "light":
            document.body.style.backgroundColor = "#FFF";
            if(card) {
                card.style.backgroundColor = "#fafafa";
                card.style.color = "#222";
            }
            break;
        default:
        }

        this.setState({theme: theme});
    }

    getData(zone) { // from 1 station (graph)
        let {id} = zone;
        const url1 = `http://localhost:3000/rest/api/station/${encodeURIComponent(id)}`;
        const url2 = "http://localhost:3000/rest/api/status";
        fetch(url2, {
            method: "GET",
            headers: {
                Accept: 'application/json',
            },
        }).then(response => response.json()
        ).then(response => {
            console.log("response", response);
        }).catch((e) => {
            console.log(`Error in fetch ${e.message}`);
        });
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Map theme={this.state.theme} getData={this.getData.bind(this)} setStore={this.setStore.bind(this)}></Map>
                <Graph zone={this.state.station}></Graph>
                <label className="switch">
                    <input type="checkbox" onChange={this.changeTheme.bind(this)}/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
}
export default Web;

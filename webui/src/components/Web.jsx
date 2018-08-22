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

        switch(theme) {
        case "dark":
            document.body.style.backgroundColor = "#222";
            document.querySelectorAll('.card')[1].style.backgroundColor = "#222";
            document.querySelectorAll('.card')[1].style.color = "#fafafa";
            break;
        case "light":
            document.body.style.backgroundColor = "#FFF";
            document.querySelectorAll('.card')[1].style.backgroundColor = "#fafafa";
            document.querySelectorAll('.card')[1].style.color = "#222";
            break;
        default:
        }

        this.setState({theme: theme});
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div>
                <Header></Header>
                <p>{this.state.station.id===0 ? "Please click a zone" : `Data from station no.${this.state.station.id} (${this.state.station.name})`}</p>
                <Map theme={this.state.theme} setStore={this.setStore.bind(this)}></Map>
                {this.state.station.id === 0 ? "" : <Graph></Graph>}
                <label className="switch">
                    <input type="checkbox" onChange={this.changeTheme.bind(this)}/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
    
}
export default Web;

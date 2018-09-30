/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';
import Header from './Header.jsx';
import Map from './Map.jsx';
import Graph from './Graph.jsx';
import Panel from './Panel.jsx';

class Web extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            theme: "light",
            station: {id: 0, name: ""},
            showGraph: false
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

    render() {
        return (
            <div>
                <Header></Header>
                <div className="card__container">
                    <Map theme={this.state.theme} setStore={this.setStore.bind(this)}></Map>
                    <Panel zone={this.state.station} setStore={this.setStore.bind(this)} showingGraph={this.state.showGraph}></Panel>
                    {this.state.showGraph ? <Graph zone={this.state.station}></Graph> : ""}
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

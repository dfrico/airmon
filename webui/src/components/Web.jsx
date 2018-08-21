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
            theme: "light"
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
                document.querySelectorAll('.card')[1].style.backgroundColor = "#222"
                document.querySelectorAll('.card')[1].style.color = "#fafafa"
                break;
            case "light":
                document.body.style.backgroundColor = "#FFF";
                document.querySelectorAll('.card')[1].style.backgroundColor = "#fafafa"
                document.querySelectorAll('.card')[1].style.color = "#222"
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
                <Map theme={this.state.theme}></Map>
                <Graph></Graph>
                <label className="switch">
                    <input type="checkbox" onChange={this.changeTheme.bind(this)}/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
    
}
export default Web;

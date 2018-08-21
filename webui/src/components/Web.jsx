/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';
import Header from './Header.jsx';
import Map from './Map.jsx';

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
                break;
            case "light":
                document.body.style.backgroundColor = "#FFF";
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
                <label className="switch">
                    <input type="checkbox" onChange={this.changeTheme.bind(this)}/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
    
}
export default Web;

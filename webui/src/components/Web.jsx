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
    }

    render() {


        return (
            <div>
                <Header></Header>
            </div>
    );
    }
    
}
export default Web;

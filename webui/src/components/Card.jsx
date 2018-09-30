/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';

class Card extends React.Component {

    render() {
        let infoIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
            <path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10c5.523,0,10-4.477,10-10C22,6.477,17.523,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"/>
        </svg>;
        /*
        Props:
            color
            title ?
            number
        */
        return (
            <div className="subcard" style={{backgroundColor:this.props.color}}>
                {/* {infoIcon} */}
                <p className="subcard__name">{this.props.title}</p>
                <p className="subcard__number">{this.props.number}</p>
            </div>
        );
    }
}
export default Card;
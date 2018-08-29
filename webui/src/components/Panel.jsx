/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';

class Panel extends React.Component {

    render() {
        let content = this.props.zone.id === 0 ?
            <p className="disclaimer">Por favor selecciona una zona para ver más información</p> :
            <div className="text" style={{backgroundColor:this.props.zone.color}}>
                <p>Datos de la estación num.{this.props.zone.id} ({this.props.zone.name})</p>
                <p>Calidad del aire: {this.props.zone.ica}/100</p>
                <p>Principal contaminante: {this.props.zone.part}</p>
                <br></br>
                <p onClick={() => this.props.setStore({showGraph: true})}>Ver más información</p>
            </div>
        return (
            <div className="card card__panel">
                {content}
            </div>
        );
    }
}
export default Panel;

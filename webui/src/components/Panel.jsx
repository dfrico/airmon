/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';
import Card from './Card.jsx';

class Panel extends React.Component {
    getLink(particula) {
        if(particula.indexOf('Part')>=0)
            return "https://es.wikipedia.org/wiki/Part%C3%ADculas_en_suspensi%C3%B3n";
        else switch (particula) {
        case "SO2":
        case "CO":
        case "O3":
        case "Tolueno":
        case "Benceno":
        case "Etilbenceno":
        case "Hidrocarburos":
        case "Hexano":
            return `https://es.wikipedia.org/wiki/${particula}`;
        case "Metano CH4":
            return "https://es.wikipedia.org/wiki/Metano";
        case "NO":
        case "NO2":
        case "NOx":
            return "https://www.atsdr.cdc.gov/es/toxfaqs/es_tfacts175.html#bookmark1";
        default:
            return `https://es.wikipedia.org/wiki/${particula}`;
        }
    }

    render() {
        let colors = [ // vegajs redyellowgreen
            '#0B6739',
            '#249753',
            '#69BC67',
            '#A7D770',
            '#D9EE90',
            '#FFFEC2',
            '#FDDF90',
            '#FBAD68',
            '#F26D4A',
            '#D5322F',
            '#A3062A'];
        let colors2 = [
            '#323993',
            '#4776B2',
            '#76AECF',
            '#ACD9E8',
            '#E0F3F8',
            '#FFFEC2',
            '#FDDF90',
            '#FBAD68',
            '#F26D4A',
            '#D5322F',
            '#A3062A'];
        let content = this.props.zone.id === 0 ?
            <div id="disclaimer">
                <p>Por favor, selecciona una zona para ver más datos.</p>
            </div> :
            <div className="text">
                <p className="panel__location">Estación: {this.props.zone.name}</p>
                <Card
                    color={colors[Math.round(this.props.zone.traffic/10)]}
                    title={"Intensidad del tráfico (%)"}
                    text={"Porcentaje de intensidad de tráfico en dicha zona con respecto a su intensidad de saturación"}
                    number={this.props.zone.traffic}
                ></Card>
                <Card
                    color={this.props.zone.color}
                    title={"Indice de Calidad del Aire"}
                    text={"El Indice de Calidad del Aire o ICA mide la cantidad de partículas contaminantes. Se mide de 0 a 100 (y más), siendo 0 el mejor valor"}
                    number={this.props.zone.ica}
                ></Card>
                <div id="part_small"><a href={this.getLink(this.props.zone.part)}>↗ Principal contaminante: {this.props.zone.part}</a></div>
                {this.props.zone.humedad ? <Card
                    color={colors[Math.round(this.props.zone.humedad/10)]}
                    title={"Humedad (%)"}
                    number={this.props.zone.humedad}
                ></Card> : ""}
                {this.props.zone.temp ? <Card
                    color={colors[Math.round(this.props.zone.temp/6)]}
                    title={"Temperatura (ºC)"}
                    number={this.props.zone.temp}
                ></Card> : ""}
                <br></br>
                <div className="info">
                    <div onClick={() => this.props.setStore({showGraph: true})}>
                        <p>Ver más información</p>
                    </div>
                </div>
            </div>;
        return (
            <div className="card card__panel" style={this.props.showingGraph ? {gridRow: "1 / 2"} : {gridRow: "1 / 4"}}>
                <div className="panel__scroll" style={this.props.showingGraph ? {overflowY: "scroll"} : {overflowY: "hidden"}}>
                    {content}
                </div>
            </div>
        );
    }
}
export default Panel;

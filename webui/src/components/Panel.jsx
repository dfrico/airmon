/* eslint-disable no-undef,no-inner-declarations */
import React from 'react';

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
                return "https://www.atsdr.cdc.gov/es/toxfaqs/es_tfacts175.html#bookmark1"
            default:
                return `https://es.wikipedia.org/wiki/${particula}`;
        }
    }

    render() {
        let colors = [
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
        let infoIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" enableBackground="new 0 0 24 24">
                <path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10c5.523,0,10-4.477,10-10C22,6.477,17.523,2,12,2z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"/>
            </svg>;
        let content = this.props.zone.id === 0 ?
            <div id="disclaimer"><p>Por favor selecciona una zona para ver más información</p></div> :
            <div className="text">
                <p className="panel__location">Estación: {this.props.zone.name}</p>
                <div className="subcard" style={{backgroundColor:colors[Math.round(this.props.zone.traffic/10)]}}>
                    Intensidad del tráfico (%)
                    <p className="subcard__number">{this.props.zone.traffic}</p>
                </div>
                <div className="subcard" style={{backgroundColor:this.props.zone.color}}>
                    {/* {infoIcon} */}
                    Indice de Calidad del Aire
                    <p className="subcard__number">{this.props.zone.ica}</p>
                </div>
                <div id="part_small"><a href={this.getLink(this.props.zone.part)}>↗ Principal contaminante: {this.props.zone.part}</a></div>
                <br></br>
                <div className="info">
                    <div onClick={() => this.props.setStore({showGraph: true})}>
                        <p>Ver más información</p>
                    </div>
                </div>
            </div>
        return (
            <div className="card card__panel">
                {content}
            </div>
        );
    }
}
export default Panel;

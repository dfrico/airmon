import React from 'react';
import ReactDOM from 'react-dom';
import Web from './components/Web.jsx';

function panel(){
    ReactDOM.render(
        <Web/>,
        document.getElementById('container')
    );
}

document.addEventListener('DOMContentLoaded', panel());

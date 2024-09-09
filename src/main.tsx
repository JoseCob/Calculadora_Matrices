/*Este archivo se encargara de establecer la ruta raíz para nuestro proyecto*/
import React  from 'react';
import ReactDOM  from 'react-dom/client'; //Elemento Raíz del proyecto
import './Matrix_Calculator'; //Biblioteca que contiene los componentes funcionales del proyecto
import "./Calculator.css"; //importamos el archivo "css" de la pagina o para los componentes

//El punto de entrada de la aplicación
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement, //Obtiene nuestro elemento Raíz
);

root.render(
  <React.StrictMode>
    <h1>Calculadora de matrices</h1>
    <hr></hr>
    <h2>Estructura de la matriz</h2>
    <p className='informative*-text'>Marca la casilla si deseas calcular matrices tridimensionales</p>
    <input type="checkBox" id="tridimensional"></input>
    <label>Tridimensional</label>
  </React.StrictMode>
);

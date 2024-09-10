/*Este archivo se encargara de establecer la ruta raíz para nuestro proyecto*/
import React  from 'react';
import ReactDOM  from 'react-dom/client'; //Elemento Raíz del proyecto
import MatrixComponent from './Matrix_Calculator'; //Biblioteca que contiene los componentes funcionales del proyecto
import "./Calculator.css"; //importamos el archivo "css" de la página o para los componentes

//El punto de entrada de la aplicación
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement, //Obtiene nuestro Elemento Raíz
);

//Renderización de los componentes
root.render(
  <React.StrictMode>
    <h1 className="Title-page">&#11166; Calculadora de matrices simples 3x3</h1>
    <hr />

    <MatrixComponent /> {/* Llama al componente que contiene las matrices */}
  </React.StrictMode>
);
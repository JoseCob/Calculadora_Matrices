import React, { useState, useEffect } from 'react'; //Se utilizan los hooks useEffect y useState

//Creamos el componente funcional "MatrixCalculator" donde contendra la lógica para alternar y crear las matrices en la página, por rangos, columnas y caras => P x M x N.
const MatrixCalculator: React.FC = () => {
  const [isTridimensional, setIsTridimensional] = useState(false); //Estado(useState) para el checkbox de la casilla Tridimensional 

  //Rangos para la matriz A
  const [rowsA, setRowsA] = useState(2); //Inicializa con 2 filas para Matriz A
  const [colsA, setColsA] = useState(2); //Inicializa con 2 columnas para Matriz A
  const [facesA, setFacesA] = useState(1); //Inicializa con 1 cara, oculta si no es tridimensional

  //Rangos para la matriz B
  const [rowsB, setRowsB] = useState(2); //Inicializa con 2 filas para Matriz B
  const [colsB, setColsB] = useState(2); //Inicializa con 2 columnas para Matriz B
  const [facesB, setFacesB] = useState(1); //Inicializa con 1 cara, oculta si no es tridimensional

  //useEffect maneja la lógica para cambiar o alterar el estado tridimensional de la matriz
  useEffect(() => {
    if (!isTridimensional) {
      //Si no esta marcado el tridimensional, reseteamos las caras a 1 por defecto en matriz A y B
      setFacesA(1); //Cara de la matriz A
      setFacesB(1); //Cara de la matriz B
    }
  }, [isTridimensional]); //El efecto se ejecutara cada vez que el estado de (isTridimensional) cambie o se alterne

  return (
    <div>
      <h2>Estructura de la matriz</h2>
      <p className='informative-text'>
        Marca la casilla si deseas calcular matrices tridimensionales
      </p>

      {/* checkbox del tridimensional */}
      <div className='matrix-range'>
        <input type="checkbox" className='input-checkBox'
          checked={isTridimensional} /* Verifica que sea tridimensional en relación al componente funcional que declaramos al principio del código */
          onChange={() => setIsTridimensional(!isTridimensional)} //Manejo del checkbox, ejecuta el proceso de la alternación al marcar el checkBox
        />
        <label className='label-checkBox'>Tridimensional</label>
      </div>

      {/* Se crea el apartado para los rangos, columnas y caras de las matrices => A y B */}
      <div className='range-container'>
        <div className='range-left'>
          <p>Matriz A</p>
          <label className='label-matrix'>Filas: </label>
          <input className='input-matrix' type="text" 
            value={rowsA} //Inicializa con 2 filas para Matriz A
            //la función "onChange" nos sirve para actualizar datos ingresados en el campo de tipo input y conertirlo como dato numérico a una cadena de texto(string)
            onChange={(e) => {
              const value = e.target.value; //Constante de la función, para la validación de datos numéricos
              //Verifica si el valor ingresado es un número válido y no texto
              if (/^\d*$/.test(value)) {
                //Si el valor es un número (o está vacío), lo convertimos a número y actualizamos el estado
                setRowsA(Number(value));
              }
            }}
          />

          <label className='label-matrix'>Columnas: </label>
          <input
            className='input-matrix' type="text"
            value={colsA} //Inicializa con 2 columnas para Matriz A
            onChange={(e) => {
              const value = e.target.value; //Constante de la función, para la validación de datos numéricos
              //Verifica si el valor ingresado es un número válido y no texto
              if (/^\d*$/.test(value)) {
                //Si el valor es un número (o está vacío), lo convertimos a número y actualizamos el estado
                setColsA(Number(value));
              }
            }}
          />

          {/* Caras, solo se muestra si es tridimensional */}
          {isTridimensional && (
            <> {/*Evitamos el uso de un div de manera inecesaria, para evitar perdidas de rendimiento sobre el proyecto, esto se le conoce como React.Fragment, 
              nos permiten agrupar varios elementos sin agregar un nodo extra al DOM*/}
              <label className='label-matrix'>Caras: </label>
              <input
                className='input-matrix' type="text"
                value={facesA} //Inicializa con 1 cara, oculta si no es tridimensional en la matriz A
                onChange={(e) => {
                  const value = e.target.value; //Constante de la función, para la validación de datos numéricos
                  //Verifica si el valor ingresado es un número válido y no texto
                  if (/^\d*$/.test(value)) {
                    //Si el valor es un número (o está vacío), lo convertimos a número y actualizamos el estado
                    setFacesA(Number(value));
                  }
                }}
              />
            </>
          )}
        </div>

        <div className='range-right'>
          <p>Matriz B</p>
          <label className='label-matrix'>Filas: </label>
          <input className='input-matrix' type="text"
            value={rowsB}
            onChange={(e) => {
              const value = e.target.value; //Constante de la función, para la validación de datos numéricos
              //Verifica si el valor ingresado es un número válido y no texto
              if (/^\d*$/.test(value)) {
                //Si el valor es un número (o está vacío), lo convertimos a número y actualizamos el estado
                setRowsB(Number(value));
              }
            }}
          />

          <label className='label-matrix'>Columnas: </label>
          <input
            className='input-matrix' type="text"
            value={colsB}
            onChange={(e) => {
              const value = e.target.value; //Constante de la función, para la validación de datos numéricos
              //Verifica si el valor ingresado es un número válido y no texto
              if (/^\d*$/.test(value)) {
                //Si el valor es un número (o está vacío), lo convertimos a número y actualizamos el estado
                setColsB(Number(value));
              }
            }}
          />

          {isTridimensional && (
            <>
              <label className='label-matrix'>Caras: </label>
              <input className='input-matrix' type="text"
                value={facesB}
                onChange={(e) => {
                  const value = e.target.value; //Constante de la función, para la validación de datos numéricos
                  //Verifica si el valor ingresado es un número válido y no texto
                  if (/^\d*$/.test(value)) {
                    //Si el valor es un número (o está vacío), lo convertimos a número y actualizamos el estado
                    setFacesB(Number(value));
                  }
                }}
              />
            </>
          )}
        </div>
      </div>

      <h3>Tipo de operación:</h3>
      <div>
        <select name='operacion' className='operator-select'>
          <option value="null" selected>
            -- Seleccionar Operación --
          </option>
          <option value="A+B">Suma A + B</option>
          <option value="A-B">Resta A - B</option>
          <option value="AxB">Multiplicación A x B</option>
        </select>
      </div>

      <button className='btn-createMX'>Crear Matriz</button>
    </div>
  );
};

export default MatrixCalculator;
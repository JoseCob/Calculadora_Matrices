import React, { useState, useEffect } from 'react'; //Se utilizan los hooks useState y useEffect, el manejo de children en componente
import Operations from './Result_Matrix'; // Importamos el componente donde estan las operaciones de las matrices de Result_Matrix.tsx

//Creamos los props en la interface, con datos de tipo opcionales
interface MatrixProps{
  maxRows?: number; //Define el número máximo de filas
  maxColumns?: number; //Define el número máximo de columnas
  errorMessage?: string; //Mensaje que deseamos mostrar como error al usuario
}

//Creamos el componente funcional "matrixStructure" donde estara la lógica para crear las matrices por filas y columnas
const matrixStructure: React.FC <MatrixProps> = ({
  //Definimos el limite permitido  por defecto en "3x3"
  maxRows = 3,
  maxColumns = 3,
  errorMessage = "Solo se permite matrices de 3x3"
}) => {

  //Rangos para la Matriz A
  const [rowsA, setRowsA] = useState(2); //Iniciamos con 2 filas para la Matriz A
  const [columnsA, setColumnsA] = useState(2); //Iniciamos con 2 columnas para la Matriz A

  //Rangos para la Matriz B
  const [rowsB, setRowsB] = useState(2); //Iniciamos con 2 filas para la Matriz B
  const [columnsB, setColumnsB] = useState(2); //Iniciamos con 2 columnas para la Matriz B

  //Estados para almacenar las matrices generadas con el botón de "Crear Matriz"
  const [matrixA, setMatrixA] = useState<number[][]>([]);
  const [matrixB, setMatrixB] = useState<number[][]>([]);

  //Estados para controlar el clic del botón "Crear Matriz y un mensaje de error, en caso de haberlo"
  const [createMatrix, setCreateMatrix] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [operation, setOperation] = useState<string>('Sin valor');//Este se encargara de validar las operaciones de las matrices en el "select"

  //useEffect para generar la Matriz "A" cuando se crea la matriz
  useEffect(() => {
    if(createMatrix) {
      //se genera la Matriz A basandose en las filas y columnas proporcionadas
      const newMatrixA = Array.from({ length: rowsA }, () => Array(columnsA).fill(0));
      setMatrixA(newMatrixA);

      //se genera la Matriz B basandose en las filas y columnas proporcionadas
      const newMatrixB = Array.from({ length: rowsB }, () => Array(columnsB).fill(0));
      setMatrixB(newMatrixB);

      //Resetea el estado de creación después de crear las matrices
      setCreateMatrix(true);
    }
  }, [createMatrix, rowsA, columnsA, rowsB, columnsB]);
  
  // -- Manejo de Evento con TypeScript --
  /*función con evento para manejar la creación de matrices cuando se presiona el botón y con validación del límite permitido del 
  tamaño para la matriz*/
  const handleCreateMatrix = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('¡Creaste la matriz!', event); //Muestra un mensaje en la consola, cuando hacemos clic en el botón
    if (rowsA > maxRows || columnsA > maxColumns || rowsB > maxRows || columnsB > maxColumns) {
      setError(errorMessage);
      console.error(errorMessage); //Mostramos un error en consola del navegador
      return;
    }
    setError(null); //Limpia el error
    setCreateMatrix(true); //Esto hara uso del useEffect y generara las matrices al clickear el botón "Crear Matriz"
  };

  //Este evento eliminar o borra la matriz creada en la página y lo regresa a su valor inicial
  const handleReturnMatrix = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Eliminaste la matriz', event);
    // Resetea todos los estados a su valor inicial
    setMatrixA([]);
    setMatrixB([]);
    setCreateMatrix(false);
    setRowsA(2); //Se restablece a 2 nuevamente la fila A
    setColumnsA(2); //Se restablece a 2 nuevamente la columna A
    setRowsB(2); //Se restablece a 2 nuevamente la fila A
    setColumnsB(2); //Se restablece a 2 nuevamente la columna B
    setOperation('Sin valor');
  };

  //Genera la validación si la matriz es cuadrada para operaciones de multiplicación
  const isSquareMatrix = rowsA === columnsA && rowsB === columnsB;
  //Genera la validación si la matriz es cuadrada para operaciones de inversa A
  const isreverseA = rowsA === columnsA && rowsB === columnsB;
  //Genera la validación si la matriz es cuadrada para operaciones de inversa B
  const isreverseB = rowsA === columnsA && rowsB === columnsB;

  //Visualización del html de la página
  return (
    <div>
      <h1>Estructura de la matriz</h1>
        <p><strong>Nota*: </strong> Solo se puede sacar la inversa de una matriz y su multiplicación cuando sea cuadrada,
        <p>de lo contrario se 
        desabilitara las opciones para realizar esas operaciones</p>
      </p>

      {/* Sección de la Matriz A */}
      {/* Solo se mostrara esta sección si las filas y las columnas no han creado las matrices*/}
      {!createMatrix && (
        <>
          {/* Mostrar mensaje de error en pantalla si el límite de filas y columnas es excedido */}
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}{/* Muestra el mensaje de error en pantalla */}

          {/* Bloque que crea el input para añadir los valores necesarios para las filas */}
          <div className='range-container'>
            <p>Matriz A</p>
            <label className='label-matrix'>Filas: </label>
            <input
              className='input-matrix' type = 'text' value={rowsA}
              onChange={(e) => {
                //Establecemos que no se pueda introducir caracteres en el input
                const value = e.target.value;
                if (/^\d*$/.test(value)){
                  setRowsA(Number(value));
                }
              }} 
            />

            {/* Bloque que crea el input para añadir los valores necesarios para las columnas */}
            <label className='label-matrix'>Columnas: </label>
            <input
              className='input-matrix' type='text' value = {columnsA}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)){
                  setColumnsA(Number(value));
                }
              }} 
            />
          </div>
            
          {/* Sección de la Matriz B */}
          <div className='range-container'>
            <p>Matriz B</p>
            <label className='label-matrix'>Filas: </label>
            <input className='input-matrix' type='text' value={rowsB}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)){
                  setRowsB(Number(value));
                }
              }} 
            />

            <label className='label-matrix'>Columnas: </label>
            <input className='input-matrix' type='text' value={columnsB}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)){
                  setColumnsB(Number(value));
                }
              }} 
            />
          </div>
            
          {/*Botón que crea las matrices, haremos que se muestre si no se ha creado las matrices A y B*/}
          <button className='btn-createMX' onClick={handleCreateMatrix}>Crear Matriz</button>
        </>
      )}

      {/* 
        En esta sección se mostrara la estructura establecidas para A y B mediante el botón
        Por lo tanto solo se mostrara esta sección si la estructura de A y B se han creado 
      */}

      {createMatrix && (
      <>
        <h3 className='titleMx'>Matriz A</h3>
        <table className='table-matrix'>
          <tbody>
            {matrixA.map((row, rowIndex) =>(
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input className='input-table' type='number' value={cell} 
                      onChange={(e) => {
                        const value = Number (e.target.value);
                        if(!isNaN(value)) { //El "!isNaN" solo Permite números en las celdas, por lo que ignora las cadenas de texto
                          setMatrixA((prevMatrix) => {
                            const updateMatrix = [...prevMatrix];
                            updateMatrix[rowIndex][colIndex] = value;
                            return updateMatrix;
                          });
                        }
                      }} 
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className='titleMx'>Matriz B</h3>
        <table className='table-matrix'>
          <tbody>
            {matrixB.map((row, rowIndex) =>(
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input className='input-table' type='number' value={cell} 
                      onChange={(e) => {
                        //Funcion que nos permite el uso de los string a dato númerico 
                        const value = Number (e.target.value);
                        if(!isNaN(value)) {
                          setMatrixB((prevMatrix) => {
                            const updateMatrix = [...prevMatrix];
                            updateMatrix[rowIndex][colIndex] = value;
                            return updateMatrix;
                          });
                        }
                      }} 
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className='container-btn'>
          <button className = 'btn-return-matrix' onClick={handleReturnMatrix}>Borrar Matriz</button>
        </div>
        
        <h2 className='title-select'>Tipo de operación: </h2>
        <div>
          <select className='operator-select' aria-label='operation-select'
            value={operation || 'null'} //Utiliza el valor del estado para seleccionar la opción
            onChange={(e) => setOperation(e.target.value)}
            disabled={!isSquareMatrix && operation === "multiplicacion" || !isreverseA && operation === "inversa A" || !isreverseB && operation === "inversa B"}
          >
            <option value='Sin valor'> -- Seleccionar Operación -- </option>
            <option value='suma'> Suma A + B </option>
            <option value='resta'> Resta A - B </option>
            <option value='multiplicacion' disabled={!isSquareMatrix}> Multiplicación A x B </option>
            <option value='inversa A' disabled={!isreverseA}>Inversa A</option>
            <option value='inversa B' disabled={!isreverseB}>Inversa B</option>
          </select>
        </div>

        {/* Aquí renderizamos el componente de las operaciones de las matrices */}
        <Operations matrixA={matrixA} matrixB={matrixB} operation={operation}>
          {/* llamamos el contenido de las operaciones como children */}
          <p className='text-operator'>Operación realizada: <strong>{operation}</strong></p>{/* Obtenemos el tipo de operador que se esta realizando en pantalla*/}
        </Operations>
      </>
      )}
    </div>
  );
};

export default matrixStructure;
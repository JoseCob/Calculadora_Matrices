import React, { useState } from 'react'; //Se utiliza el hook useEffect y useState

function Matrix() {
  // Estado para manejar si la matriz es tridimensional o no
  const [isTridimensional, setIsTridimensional] = useState(false);

  // Estado para las filas, columnas y caras de las matrices
  const [matrixA, setMatrixA] = useState({ rows: 0, cols: 0, faces: 0 });
  const [matrixB, setMatrixB] = useState({ rows: 0, cols: 0, faces: 0 });

  // Actualización de las filas y columnas
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, matrix: 'A' | 'B', field: 'rows' | 'cols' | 'faces') => {
    const value = Number(e.target.value);
    if (matrix === 'A') {
      setMatrixA(prev => ({ ...prev, [field]: value }));
    } else {
      setMatrixB(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div>
      <h2>Estructura de la matriz</h2>
      <p className='informative-text'>Marca la casilla si deseas calcular matrices tridimensionales</p>
      
      <div className='matrix-range'>
        <input
          type="checkbox"
          id="tridimensional"
          className='input-checkBox'
          checked={isTridimensional}
          onChange={() => setIsTridimensional(!isTridimensional)}
        />
        <label className='label-checkBox'>Tridimensional</label>
      </div>

      <div className='range-container'>
        {/* Matriz A */}
        <div className='range-left'>
          <p>Matriz A</p>
          <label className='label-matrix'>Filas: </label>
          <input
            className='input-matrix'
            type="number"
            value={matrixA.rows}
            onChange={(e) => handleInputChange(e, 'A', 'rows')}
          />

          <label className='label-matrix'>Columnas: </label>
          <input
            className='input-matrix'
            type="number"
            value={matrixA.cols}
            onChange={(e) => handleInputChange(e, 'A', 'cols')}
          />

          {/* Solo mostrar Caras si es tridimensional */}
          {isTridimensional && (
            <>
              <label className='label-matrix'>Caras: </label>
              <input
                className='input-matrix'
                type="number"
                value={matrixA.faces}
                onChange={(e) => handleInputChange(e, 'A', 'faces')}
              />
            </>
          )}
        </div>

        {/* Matriz B */}
        <div className='range-right'>
          <p>Matriz B</p>
          <label className='label-matrix'>Filas: </label>
          <input
            className='input-matrix'
            type="number"
            value={matrixB.rows}
            onChange={(e) => handleInputChange(e, 'B', 'rows')}
          />

          <label className='label-matrix'>Columnas: </label>
          <input
            className='input-matrix'
            type="number"
            value={matrixB.cols}
            onChange={(e) => handleInputChange(e, 'B', 'cols')}
          />

          {/* Solo mostrar Caras si es tridimensional */}
          {isTridimensional && (
            <>
              <label className='label-matrix'>Caras: </label>
              <input
                className='input-matrix'
                type="number"
                value={matrixB.faces}
                onChange={(e) => handleInputChange(e, 'B', 'faces')}
              />
            </>
          )}
        </div>
      </div>

      <h3>Tipo de operación:</h3>
      <div>
        <select name='operacion' className='operator-select'>
          <option value="null">-- Seleccionar Operación --</option>
          <option value="A+B">Suma A + B</option>
          <option value="A-B">Resta A - B</option>
          <option value="AxB">Multiplicación A x B</option>
        </select>
      </div>

      <button className='btn-createMX'>Crear Matriz</button>
    </div>
  );
}

export default Matrix;

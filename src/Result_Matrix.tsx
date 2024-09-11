import React from 'react';
import { z } from 'zod'; // Importamos la biblioteca de validación de props con zod

// Definimos el esquema de validación con Zod
const mxOperationsPropsSchema = z.object({
  matrixA: z.array(z.array(z.number())), // Validamos que matrixA sea un array de arrays de números
  matrixB: z.array(z.array(z.number())), // Validamos que matrixB sea un array de arrays de números
  operation: z.string().nullable(), // Validamos que operation sea una cadena de texto o null
  children: z.any().optional() // Validamos que children sea opcional, puede ser cualquier cosa (ReactNode)
});

//Definimos los props usando Zod
type MXOperationsProps = z.infer<typeof mxOperationsPropsSchema>;

//Función para calcular el determinante de una matriz cuadrada
const determinant = (matrix: number[][]): number | null => {
  if (matrix.length !== matrix[0].length) return null;

  if (matrix.length === 1) return matrix[0][0];

  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  if (matrix.length === 3) {
    const [a, b, c] = matrix[0];
    const [d, e, f] = matrix[1];
    const [g, h, i] = matrix[2];
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  return null;
};

//Función para calcular la inversa de una matriz cuadrada
const invertMatrix = (matrix: number[][]): number[][] | null => {
  if (matrix.length !== matrix[0].length) return null;

  const det = determinant(matrix);
  if (det === 0 || det === null) return null;

  if (matrix.length === 1) return [[1 / matrix[0][0]]];

  if (matrix.length === 2) {
    const [[a, b], [c, d]] = matrix;
    return [
      [d / det, -b / det],
      [-c / det, a / det]
    ];
  }

  if (matrix.length === 3) {
    const [a, b, c] = matrix[0];
    const [d, e, f] = matrix[1];
    const [g, h, i] = matrix[2];
    return [
      [(e * i - f * h) / det, -(b * i - c * h) / det, (b * f - c * e) / det],
      [-(d * i - f * g) / det, (a * i - c * g) / det, -(a * f - c * d) / det],
      [(d * h - e * g) / det, -(a * h - b * g) / det, (a * e - b * d) / det]
    ];
  }

  return null;
};

//Validamos los props usando Zod y la propiedad safeParse
const validateProps = (props: any) => {
  const result = mxOperationsPropsSchema.safeParse(props); // El safeParse valida datos de forma segura
  if (!result.success) {
    console.error("Error de validación en los props:", result.error);
    return;
  }
  return result.data;
};

//Componente funcional con validación de props
const Operations: React.FC<MXOperationsProps> = (props) => {
  const validProps = validateProps(props);

  if (!validProps) {
    return <div>Error en la validación de props.</div>;
  }

  const { matrixA, matrixB, operation, children } = validProps;

  const calculateResult = (): { result: number[][] | null; det: number | null; invA: {matrix: number[][] | null, det: number | null}; invB: {matrix: number[][] | null, det: number | null} } => {
    if (!operation || !matrixA.length || !matrixB.length) return { result: null, det: null, invA: { matrix: null, det: null }, invB: { matrix: null, det: null } };

    let result: number[][] = [];
    let det: number | null = null;
    let invA: { matrix: number[][] | null, det: number | null } = { matrix: null, det: null };
    let invB: { matrix: number[][] | null, det: number | null } = { matrix: null, det: null };

    // Operaciones de matrices: Suma, Resta, Multiplicación
    if (operation === 'suma') {
      result = matrixA.map((row, i) =>
        row.map((cell, j) => (matrixB[i] && matrixB[i][j] !== undefined ? cell + matrixB[i][j] : cell))
      );
    } else if (operation === 'resta') {
      result = matrixA.map((row, i) =>
        row.map((cell, j) => (matrixB[i] && matrixB[i][j] !== undefined ? cell - matrixB[i][j] : cell))
      );
    } else if (operation === 'multiplicacion') {
      if (matrixA[0].length === matrixB.length && matrixB[0].length) {
        for (let i = 0; i < matrixA.length; i++) {
          result[i] = [];
          for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
              sum += (matrixA[i][k] || 0) * (matrixB[k][j] || 0);
            }
            result[i][j] = sum;
          }
        }
      } else {
        console.error("Las matrices deben ser compatibles para la multiplicación.");
        return { result: null, det: null, invA: { matrix: null, det: null }, invB: { matrix: null, det: null } };
      }
    } else if (operation === 'inversa A') {
      invA.matrix = invertMatrix(matrixA);
      invA.det = determinant(matrixA);
    } else if (operation === 'inversa B') {
      invB.matrix = invertMatrix(matrixB);
      invB.det = determinant(matrixB);
    } else if (operation === 'determinante') {
      det = determinant(matrixA)
    }

    return { result, det, invA, invB };
  };

  const { result, det, invA, invB } = calculateResult();

  return (
    <div>
      <h3>Resultado de la operación:</h3>
      {/* Se renderiza el resultado de la operación de la matriz */}
      {result && result.length ? (
        // Aqui se esta creando los resultados de las matrices de manera simetrica en forma de tabla
        <table className='matrix-table'>
          <tbody>
            {result.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : det !== null ? (
        <p>Determinante: {det}</p>
      ) : invA.matrix && invA.matrix.length ? (
        <>
          <p className='text-operator'>Inversa de la matriz A:</p>
          <table className='matrix-table'>
            <tbody>
            {invA.matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>{cell.toFixed(2)} { /* Limita los decimales a 2 */ } </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className='text-operator'>Determinante de la Matriz A: {invA.det}</p>
        </>
      ) : invB.matrix && invB.matrix.length ? (
        <>
          <p className='text-operator'>Inversa de la Matriz B:</p>
          <table className='matrix-table'>
            <tbody>
              {invB.matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>{cell.toFixed(2)} { /* Limita los decimales a 2 */ }</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className='text-operator'>Determinante de la Matriz B: {invB.det}</p>
        </>
      ) : invA.matrix === null ? (
        <p className='text-operator'>La Matriz no es invertible (Determinante 0).</p>
      ) : invB.matrix === null ? (
        <p className='text-operator'>La Matriz no es invertible (Determinante 0).</p>
      ) : (
        <p className='text-operator'>No hay resultados disponibles</p>
      )}

      {/* Mostramos o llamamos al children del componente */}
      {children}
    </div>
  );
};

export default Operations;

import React from 'react';
import { z } from 'zod'; //Importamos la biblioteca de validación de props con zod

//Definimos el esquema de validación con Zod
const mxOperationsPropsSchema = z.object({
  matrixA: z.array(z.array(z.number())), //Validamos que matrixA sea un array de arrays de números
  matrixB: z.array(z.array(z.number())), //Validamos que matrixB sea un array de arrays de números
  operation: z.string().nullable(), //Validamos que operation sea una cadena de texto o null
  children: z.any().optional() //Validamos que children sea opcional, puede ser cualquier cosa (ReactNode)
});

//Aqui estamos definiendo el tipo de los props usando Zod
type MXOperationsProps = z.infer<typeof mxOperationsPropsSchema>;

//Validamos los props usando Zod y la propiedad safeParse
const validateProps = (props: any) => {
  const result = mxOperationsPropsSchema.safeParse(props);//El safeParse valida datos de forma segura que se utiliza en zod
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

  const calculateResult = (): number[][] | null => {
    if (!operation) return null;

    let result: number[][] = [];

    //Operaciones de las matrices; Suma, Resta y Multiplicación
    if (operation === 'suma') {
      result = matrixA.map((row, i) =>
        row.map((cell, j) => cell + matrixB[i][j])
      );
    } else if (operation === 'resta') {
      result = matrixA.map((row, i) =>
        row.map((cell, j) => cell - matrixB[i][j])
      );
    } else if (operation === 'multiplicacion') {
      if (matrixA.length === matrixA[0].length && matrixB.length === matrixB[0].length) {
        //(Lógica simplificada para matrices cuadradas)
        for (let i = 0; i < matrixA.length; i++) {
          result[i] = [];
          for (let j = 0; j < matrixB[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
              sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i][j] = sum;
          }
        }
      }
    }

    return result;
  };

  const result = calculateResult();
  return (
    <div>
      <h3>Resultado de la operación:</h3>
      {/* Se renderiza el resultado de la operación de la matriz */}
      {result ? (
        <table>
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
      ) : (
        <p>No hay resultados disponibles</p>
      )}

      {/* Mostramos o llamamos al children del componente */}
      {children}
    </div>
  );
};

export default Operations;
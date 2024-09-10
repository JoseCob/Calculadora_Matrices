import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; //Importamos la aserción personalizada
import MatrixStructure from '../src/Matrix_Calculator'; //Importamos el componente matrixStructure para aplicarle el testing básico

//Iniciamos con las pruebas basica para el componente "MatrixStructure"
describe('MatrixStructure', () => {
    test('renderiza el estado inicial del componente', () => {
        render(<MatrixStructure />);
        const elementSctructure = screen.getByText('Estructura de la matriz');//Carga las filas y columnas que conforman las matrices
        expect(elementSctructure).toBeInTheDocument(); //Verifica que el elemento este presente
        const matrixA = screen.getByText('Matriz A'); //carga las propiedades para la matriz A
        expect(matrixA).toBeInTheDocument(); //Verifica que el elemento este presente
        const matrixB = screen.getByText('Matriz B'); //carga las propiedades para la matriz B
        expect(matrixB).toBeInTheDocument(); //Verifica que el elemento este presente
    });

    test('Crea la matriz de A y B cuando se hace clic en el botón', async () => {
        render(<MatrixStructure />);
        const createMatrix = screen.getByRole('button', {
            name: /Crear Matriz/i,
        }); //Localiza el botón por su rol y texto(Nombre del botón)
        await userEvent.click(createMatrix); //Simula un clic en el botón

        const refreshMatrixElementA = screen.getByText('Matriz A'); //Verifica que se haya creado la matriz de A
        expect(refreshMatrixElementA).toBeInTheDocument();
        const refreshMatrixElementB = screen.getByText('Matriz B');// verifica que se haya creado la matriz de B
        expect(refreshMatrixElementB).toBeInTheDocument();
    });

    test('Realiza el calcula de la operación de la matriz, cuando se selecciona alguna opción correcta', async () => {
        render(<MatrixStructure />);
        //Simula la creación de la matriz
        const createMatrixButton = screen.getByRole('button', { name: 'Crear Matriz' });
        await userEvent.click(createMatrixButton);

        //Con esto logramos que el select sea visible para el testing
        const selectOperation = screen.getByRole('combobox', { name: 'operation-select' });
        expect(selectOperation).toBeInTheDocument(); // Verifica que el select esté presente
        
        //verifica la selección de una opción del combobox 
        await userEvent.selectOptions(selectOperation, 'suma');
        expect(selectOperation).toHaveValue('suma');
        await userEvent.selectOptions(selectOperation, 'resta');
        expect(selectOperation).toHaveValue('resta');
        await userEvent.selectOptions(selectOperation, 'multiplicacion');
        expect(selectOperation).toHaveValue('multiplicacion');
    });

    //Evalaumos el botón de eliminación de la matrices
    test('Elimina las matrices y restaura el estado inicial', async () => {
        render(<MatrixStructure />);
        const createMatrix = screen.getByRole('button', { name: /Crear Matriz/i });
        await userEvent.click(createMatrix);
    
        const deleteMatrix = screen.getByRole('button', { name: /Borrar Matriz/i });
        await userEvent.click(deleteMatrix);
    
        expect(screen.queryByText('Matriz A')).toBeInTheDocument();
        expect(screen.queryByText('Matriz B')).toBeInTheDocument();
    });
    

    test('coincide con la instantánea', () => {
        const { asFragment } = render(<MatrixStructure />);
        expect(asFragment()).toMatchSnapshot(); //Compara el resultado renderizado con una instantánea guardada
    });

    //"npx vitest" para ejecutar el testing básico
});
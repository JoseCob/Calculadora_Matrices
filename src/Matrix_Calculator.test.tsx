import React from 'react';
import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; //Importamos la aserción personalizada
import matrixStructure from '../src/Matrix_Calculator'; //Importamos el componente para aplicarle el test


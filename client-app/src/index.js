import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import RecipeList from './RecipeList';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <RecipeList />
    </React.StrictMode>,
  </BrowserRouter>,
  document.getElementById('root')
);
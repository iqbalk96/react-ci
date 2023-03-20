import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './website.css';
import Websites from './components/websites';
import Create from './components/create';
import Update from './components/update';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path='/' element={<Websites />} />
      <Route path='/create' element={<Create />} />
      <Route path='/update' element={<Update />} />
      <Route path='/update/:id' element={<Update />} />
    </Routes>
  </Router>,
  document.getElementById('root'));

serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
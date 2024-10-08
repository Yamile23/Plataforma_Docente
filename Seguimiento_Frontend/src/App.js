import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterConfig from './Config/RouterConfig';
import { Container } from 'react-bootstrap';
import Header from './Page/Header';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Container>
        <RouterConfig />
        </Container>
        <footer className='footer'  bg="dark" variant="dark">Diseño y Desarrollo Web: Yamile Cuellar S.</footer>
      </div>
    </Router>
  );
}

export default App;

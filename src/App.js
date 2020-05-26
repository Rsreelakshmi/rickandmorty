import React from 'react';
import Header from './components/header/Header';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div className="main-container">
      <Header></Header>
      <Dashboard></Dashboard>
    </div>
    
  );
}

export default App;

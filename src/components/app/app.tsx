import React from 'react';
import logo from './logo.svg';
import './app.scss';
import House from './house';

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <House />
    </div>
  );
}

export default App;

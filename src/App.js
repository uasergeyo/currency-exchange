import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import BODY_W from './components/wrappers/body_w'
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Header />
      <BODY_W />
      <Footer />
    </div>
  );
}

export default App;

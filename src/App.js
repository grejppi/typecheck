import React from 'react';
import ReactDOM from 'react-dom';

import './App.pcss';

import Header from './Components/Header';

const App = () => {
  return (
    <Header
      title={"CompanyName.website"}
      subtitle={"If you're reading this, the web server was installed correctly.\u2122"}
    />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

// React
import React, { useState } from "react"
// React Router
import { BrowserRouter } from "react-router-dom"
import Routes from './routes/Routes';
// css
import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes loggedIn={loggedIn} />
      </BrowserRouter>
    </div>
  );
}

export default App;

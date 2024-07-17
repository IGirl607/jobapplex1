import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


export const Context = createContext({ authenticated: false });

const AppWrap = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (<Context.Provider value={{ authenticated, setAuthenticated, user, setUser }}>
    <App />
  </Context.Provider>);
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AppWrap/>
  </React.StrictMode>
);

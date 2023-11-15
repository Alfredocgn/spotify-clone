import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StateProvider } from './utils/StateProvider.jsx'
import  reducer, { initalState } from './utils/reducer.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider initialState={initalState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
)

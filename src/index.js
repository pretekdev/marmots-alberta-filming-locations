import React from 'react';
import ReactDOM from 'react-dom/client';

import Map from './Map';
import Locations from './Locations';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Map />} />
        <Route path='/locations/:locationId' element={<Locations />} />
     </Routes>
    </Router>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowSummary from './components/ShowSummary';
// import MovieBookingForm from './MovieBookingForm';

const App = () => {

  
  
  return (
    <Router>
      <Routes>
              <Route exact path="/" element={<ShowList 
             />}></Route>
      <Route exact path="/show/:showId/summary" element={<ShowSummary/>} ></Route>
        
      
      </Routes>
    </Router>
  );
};

export default App;
